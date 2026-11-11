---
sidebar_position: 2
sidebar_label: New Relic Java
slug: /profiling/newrelic
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Profiling with the New Relic Java agent

The New Relic Java agent can stream Java Flight Recorder (JFR) data alongside APM data. If your JVMs already send APM data to CubeAPM with the New Relic Java agent, turn on the agent's JFR service and point its two JFR destinations at CubeAPM. You then get:

- **CPU flame graphs** for each JVM on the CubeAPM **Profiles** page, with the source **New Relic**;
- a **JVM Health** tab on each of these profiles, with CPU load, heap, garbage collection, thread allocation, metaspace and thread context switch charts.

There is nothing to enable in CubeAPM.

## What you get

| Item | Support |
|---|---|
| Agent | New Relic Java agent with the JFR service. Tested with 8.25.0, 9.2.0, 9.4.0 and 9.5.0 |
| JVM | Tested with JDK 8, 11, 17 and 21 (Eclipse Temurin) |
| Profile type | CPU. Values are sample counts, not CPU time |
| JVM Health tab | CPU load, heap memory, garbage collection, thread allocation, metaspace, thread context switches |
| Upload period | Every 10 seconds per JVM (the agent default) |
| Not available | Allocation, lock and wall-clock profiles, the link from a trace to its profile, and the endpoint breakdown. The New Relic agent does not send the data these need |

## Before you start

Your JVMs already send APM data to CubeAPM with the New Relic Java agent, through a load balancer that takes HTTPS on port 443 and forwards to CubeAPM port 3130. If not, follow [Instrumentation > New Relic > Java](/instrumentation/newrelic/java) first.

## Step 1. Turn on JFR and point it at CubeAPM

The agent's JFR service is off by default (`jfr.enabled: false` in the `newrelic.yml` it ships with). The agent also sends JFR data to New Relic's own endpoints unless you change them. Add these three settings to the agent, using your load balancer's domain name:

<Tabs groupId="nr-config">
<TabItem value="env" label="Environment Variables">

```shell
NEW_RELIC_APP_NAME=<app_name>
NEW_RELIC_LICENSE_KEY=ABC4567890ABC4567890ABC4567890ABC4567890
NEW_RELIC_HOST=<cubeapm-newrelic.yourdomain.com>
# highlight-start
NEW_RELIC_JFR_ENABLED=true
NEW_RELIC_EVENT_INGEST_URI=https://<cubeapm-newrelic.yourdomain.com>/api/logs/v1/push/newrelic/events
NEW_RELIC_METRIC_INGEST_URI=https://<cubeapm-newrelic.yourdomain.com>/api/metrics/v1/push/newrelic/metric/v1
# highlight-end
```

</TabItem>
<TabItem value="file" label="newrelic.yml">

```yaml
common: &default_settings
  app_name: <app_name>
  license_key: 'ABC4567890ABC4567890ABC4567890ABC4567890'
  host: <cubeapm-newrelic.yourdomain.com>
  # highlight-start
  event_ingest_uri: https://<cubeapm-newrelic.yourdomain.com>/api/logs/v1/push/newrelic/events
  metric_ingest_uri: https://<cubeapm-newrelic.yourdomain.com>/api/metrics/v1/push/newrelic/metric/v1
  jfr:
    enabled: true
  # highlight-end
```

</TabItem>
<TabItem value="sysprop" label="JVM System Properties">

```shell
java -javaagent:</path/newrelic-agent.jar> \
    -Dnewrelic.config.jfr.enabled=true \
    -Dnewrelic.config.event_ingest_uri=https://<cubeapm-newrelic.yourdomain.com>/api/logs/v1/push/newrelic/events \
    -Dnewrelic.config.metric_ingest_uri=https://<cubeapm-newrelic.yourdomain.com>/api/metrics/v1/push/newrelic/metric/v1 \
    -jar <myapp>.jar
```

</TabItem>
</Tabs>

The two URIs can also point straight at CubeAPM over plain HTTP, for example `http://<ip_address_of_cubeapm_server>:3130/api/logs/v1/push/newrelic/events`. The agent's collector host (`NEW_RELIC_HOST`) still needs HTTPS.

:::info
Use a license key that contains letters. The agent fails to start with a license key made only of digits.
:::

## Step 2. Restart the JVM

Restart the JVM so the agent picks up the settings. The first profile arrives about two minutes after the JVM starts: the agent connects first, then starts JFR and uploads every 10 seconds.

In the agent log (`newrelic_agent.log`, by default in `logs/` next to `newrelic.jar`) you should see:

```
Using configured metric ingest URI: https://<cubeapm-newrelic.yourdomain.com>/api/metrics/v1/push/newrelic/metric/v1
Using configured event ingest URI: https://<cubeapm-newrelic.yourdomain.com>/api/logs/v1/push/newrelic/events
Attaching New Relic JFR Monitor
JFR Monitor obtained entity guid from agent: 00000000-0000-0000-0000-000000000000
JFR Uploader is ready to send events.
```

The all-zero entity guid is normal. It is what CubeAPM returns when the agent connects to it (unless CubeAPM forwards New Relic agent connections to New Relic, see [Turning it off](#turning-it-off)).

## Step 3. Check that it works

1. Open **Profiles** in CubeAPM.
2. Set the environment picker at the top to `UNSET`. New Relic profiles carry no env, so a selected env hides them.
3. Pick your service under **service**. Rows from New Relic show the source **New Relic**.
4. Open a row. Besides the flame graph, the **JVM Health** tab shows the JVM's charts for the time range you picked on the Profiles page. For a JVM that started a few minutes ago, pick the last 5 minutes on the Profiles page, then open the row again.

## Settings

### Agent

| Setting (YAML / environment variable) | What it does | Default |
|---|---|---|
| `jfr.enabled` / `NEW_RELIC_JFR_ENABLED` | Turns the JFR service on | `false` |
| `event_ingest_uri` / `NEW_RELIC_EVENT_INGEST_URI` | Where flame data goes | New Relic |
| `metric_ingest_uri` / `NEW_RELIC_METRIC_INGEST_URI` | Where JVM metrics for the JVM Health tab go | New Relic |
| `app_name` / `NEW_RELIC_APP_NAME` | Becomes the service name. With `<app_name>;<env>`, only `<app_name>` is used for profiles | none |
| `jfr.harvest_interval` / `NEW_RELIC_JFR_HARVEST_INTERVAL` | Seconds between uploads. 10, 60 and 120 work. Longer intervals can leave gaps in the JVM Health charts, and the thread allocation chart empty | `10` |
| `jfr.use_display_name` / `NEW_RELIC_JFR_USE_DISPLAY_NAME` | Use `process_host.display_name` as the host name on profiles (agent 9.4.0 and newer) | `false` |

### CubeAPM

| Setting | Default | What it does |
|---|---|---|
| `profiles.newrelic.disable` | `false` | Turns New Relic profiling off, see [Turning it off](#turning-it-off) |
| `profiles.max-concurrent-uploads` | twice the number of CPUs | Profile uploads processed at once, shared with Datadog. Above it, uploads get 429 |
| `profiles.retention` | `168h` | How long profiles are kept |

## Accounts

If you use more than one CubeAPM account, JFR uploads go to the account whose license key the agent sends in `NEW_RELIC_LICENSE_KEY`, the same as its APM data. Use the license key registered for that account instead of the example value. A key CubeAPM does not know sends data to the default account. Data sent with a revoked key is not visible in any account.

## Turning it off

Set `profiles.newrelic.disable=true` on CubeAPM and restart it.

- JVMs that are already running keep uploading. CubeAPM answers 200 and drops the flame data without reading it. The JVM metrics behind the JVM Health tab are still accepted.
- JVMs that connect after the change are told to turn JFR off, even with `NEW_RELIC_JFR_ENABLED=true`. The agent logs `JFR enabled flag changed to false`. This does not apply when CubeAPM forwards New Relic agent connections to New Relic (`metrics.nr.forwarder.enable=true`): then New Relic's answer decides.

To stop the uploads from a running JVM right away, turn JFR off in its agent settings and restart it.

## Troubleshooting

| What you see | Cause | Fix |
|---|---|---|
| Agent log: `New Relic JFR Monitor is disabled: JFR config has not been enabled in the Java agent.` | JFR is not enabled on the agent | Set `NEW_RELIC_JFR_ENABLED=true` and restart the JVM |
| Same line, right after `JFR enabled flag changed to false` | `profiles.newrelic.disable=true` on CubeAPM | Set it to `false`, restart CubeAPM, then restart the JVM |
| Agent log: `Using default event ingest URI: https://insights-collector.newrelic.com/...` | The ingest URIs are not set, so JFR data goes to New Relic | Set both URIs |
| Agent log: `Unable to connect to New Relic due to an SSL error` with `PKIX path building failed` | The JVM does not trust the load balancer's certificate | Add the certificate's CA to the JVM trust store |
| Agent log: `Batch sending failed` | The agent cannot reach the ingest URI host | Check DNS and the load balancer. The agent retries on its own |
| No profiles, JVM started a minute ago | The agent connects about two minutes after the JVM starts | Wait |
| No profiles, nothing wrong in the agent log | The environment picker is on a real env, or the time range is too short | Set the env to `UNSET`, widen the time range |
| Event URI answers 400 `unsupported path requested` | An old path such as `/v1/accounts/events` | Use `/api/logs/v1/push/newrelic/events` |
| JVM Health is empty, profiles are there | The metric URI is wrong or not set | Use `/api/metrics/v1/push/newrelic/metric/v1` |
| JVM Health: only thread allocation is empty | `jfr.harvest_interval` above about 120 seconds | Lower it (default 10) |
| Two JVMs look like one | Same app name on the same host name | Give each JVM its own host name, or on agent 9.4.0 and newer a distinct `process_host.display_name` with `jfr.use_display_name` |
| The profile's host differs from the APM host | `process_host.display_name` is set. APM uses it, JFR does not by default | Set `NEW_RELIC_JFR_USE_DISPLAY_NAME=true` (agent 9.4.0 and newer) |
| 429 on the JFR uploads | More uploads at once than `profiles.max-concurrent-uploads` | Raise the limit on CubeAPM |

## FAQ

**Do I need a New Relic account?** No. CubeAPM answers the agent itself and does not check the license key with New Relic. Only if you turn on forwarding of New Relic agent connections (`metrics.nr.forwarder.enable=true`) does CubeAPM contact New Relic, with that key. With more than one CubeAPM account, the key picks the account, see [Accounts](#accounts).

**Are the flame graphs on-CPU only?** No. They show where sampled threads were. Threads waiting in I/O (for example an HTTP server waiting in `EPoll.wait`) can take a large share. Use the **Top 50** tab and the **Sandwich** tab to separate waiting frames from real work.

**What do frame names look like?** `Class.method(descriptor):line`, for example `Main.fib(I)J:58`. Numbered thread names arrive with the digits replaced by `#`, for example `Thread-#`. This comes from the agent.

**Is the New Relic thread profiler or on-demand profiling supported?** No. Only the continuous JFR stream.

**Is it safe to send JFR data over plain HTTP?** It works. The data holds service, host and thread names and stack frames. Use HTTPS through the load balancer unless the network path is private.
