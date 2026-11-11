---
sidebar_position: 1
sidebar_label: Datadog
slug: /profiling/datadog
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Profiling with Datadog tracers

CubeAPM accepts continuous profiles from Datadog tracers. If your applications already send traces to CubeAPM with a Datadog tracer, you only need to turn profiling on in the tracer and, if you use the Datadog Agent, tell the agent where to send profiles. There is nothing to enable in CubeAPM.

The tracer uploads one profile per process about once a minute. Profiles show up on the CubeAPM **Profiles** page with the source **Datadog**, and on the **Profiles** tab of each trace. See [Explore profiles](./4_explore.md) for what you can do with them.

## What you get

| Language | Tracer | Profile types in CubeAPM | Tested with |
|---|---|---|---|
| Java | `dd-java-agent` | CPU, allocations, wall time, GC time, lock time (only when there was lock contention) | dd-java-agent 1.34.0 to 1.66.0 on HotSpot JVMs, and GraalVM native images built with the tracer |
| Python | `ddtrace` | CPU time, wall time, exceptions, lock wait and hold time, allocations, heap | ddtrace 4.15.2 and 4.16.4 |
| Go | `dd-trace-go` | CPU and heap by default. Block, mutex and goroutine when you turn them on | dd-trace-go v1.74.8 and v2.10.1 |
| Node.js | `dd-trace` | Wall time with CPU time, heap space, timeline | dd-trace 6.19.0 on Node.js 22 |
| .NET | `dd-trace-dotnet` | CPU, wall time, exceptions, lock contention, timeline | dd-trace-dotnet 3.54.0 on .NET 8, Linux x64 |
| Ruby | `datadog` gem | CPU time, wall time, timeline | datadog 2.43.0 on Ruby 3.4 |
| PHP | `dd-trace-php` | CPU time, wall time, allocations, exceptions, timeline | dd-trace-php 1.25.1 and 1.26.2 on PHP 7.4 and 8.1 to 8.5: php-fpm, Apache mod_php, CLI, opcache JIT, Alpine, x86_64 and arm64 |
| C, C++, Rust and other native code | `ddprof` | CPU time, allocations | ddprof 0.26.0 |

For every language that has a Datadog tracer, CubeAPM also shows:

- the **endpoint breakdown**: how much of a profile was spent in each HTTP route;
- the **link from a trace to its profile**: open a trace, go to its **Profiles** tab, and see the profiles whose samples were taken while that request ran.

The profile types you see depend on what the tracer collects. Most tracers collect a subset by default and let you turn on more. Check the [Datadog profiler documentation](https://docs.datadoghq.com/profiler/enabling/) for your language.

## How it works

The tracer in your application collects profiles and sends them, either through the Datadog Agent or straight to CubeAPM:

| Setup | Path | When to use it |
|---|---|---|
| Through the Datadog Agent | application -> Datadog Agent (port 8126) -> CubeAPM port 3130 | You already run the Datadog Agent. You change the agent once, not every application |
| Straight to CubeAPM | application -> CubeAPM port 3130 | You run no Datadog Agent |

Both setups store the same profiles. With the agent in the path, CubeAPM picks the account from the agent's `DD_API_KEY`, see [Accounts](#accounts).

## Before you start

- Your applications send traces to CubeAPM with a Datadog tracer. If not, follow the steps for your language under [Instrumentation > Datadog](/instrumentation/datadog) first.
- The applications (or the Datadog Agent) can reach CubeAPM on port 3130.

## Step 1. Send profiles to CubeAPM

<Tabs groupId="dd-setup">
<TabItem value="agent" label="Through the Datadog Agent">

The Datadog Agent forwards profiles to the URL in `DD_APM_PROFILING_DD_URL`. Add it to the agent next to the settings you already have for traces:

```shell
DD_API_KEY=<your_datadog_key>
# send runtime metrics to CubeAPM
DD_DD_URL=http://<ip_address_of_cubeapm_server>:3130
# send traces to CubeAPM
DD_APM_DD_URL=http://<ip_address_of_cubeapm_server>:3130
# highlight-start
# send profiles to CubeAPM
DD_APM_PROFILING_DD_URL=http://<ip_address_of_cubeapm_server>:3130/api/v2/profile
# highlight-end
# Accept traces and metrics from applications running outside the agent host
DD_APM_NON_LOCAL_TRAFFIC=true
DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true
```

In `datadog.yaml` the same setting is `apm_config.profiling_dd_url`.

- Keep the path `/api/v2/profile`. The agent uses the URL as it is and adds nothing to it.
- Without this setting, the agent sends profiles to Datadog, not to CubeAPM.
- Restart the agent before you turn on profiling in the applications, so no profile goes to Datadog.
- Tested with Datadog Agent 7.77.0 to 7.85.4.

</TabItem>
<TabItem value="direct" label="Straight to CubeAPM">

Point the tracer at CubeAPM's port 3130 instead of the agent. This is the same setting that sends traces, so profiles follow it.

```shell
DD_TRACE_AGENT_URL=http://<ip_address_of_cubeapm_server>:3130
```

For PHP, set `datadog.trace.agent_url = http://<ip_address_of_cubeapm_server>:3130` in the ini file.

</TabItem>
</Tabs>

## Step 2. Turn on profiling in the tracer

Profiling is off by default in Datadog tracers. Turn it on for each application, then restart it.

<Tabs groupId="dd-language">
<TabItem value="java" label="Java">

Add one setting to the way you already start the tracer:

```shell
# environment variable
DD_PROFILING_ENABLED=true

# or JVM system property
java -javaagent:</path/dd-java-agent.jar> -Ddd.profiling.enabled=true -jar <myapp>.jar
```

The first profile arrives about two minutes after the JVM starts.

For a GraalVM native image, the tracer has to be added when the image is built, for example `native-image -J-javaagent:</path/dd-java-agent.jar> -J-Ddd.profiling.enabled=true --enable-monitoring=jfr ...`. See Datadog's documentation for native images.

</TabItem>
<TabItem value="python" label="Python">

Set the variable and start the application with `ddtrace-run`, as for tracing:

```shell
DD_PROFILING_ENABLED=true \
ddtrace-run gunicorn app:app -c gunicorn.conf.py
```

</TabItem>
<TabItem value="go" label="Go">

Start the profiler in `main`, next to the tracer. It reads `DD_SERVICE`, `DD_ENV`, `DD_VERSION` and the agent address from the same environment variables as the tracer.

```go
import (
	"log"

	"github.com/DataDog/dd-trace-go/v2/profiler"
)

func main() {
	if err := profiler.Start(); err != nil {
		log.Fatal(err)
	}
	defer profiler.Stop()
	// ...
}
```

`profiler.Start()` collects CPU and heap profiles. To also collect block, mutex and goroutine profiles:

```go
profiler.Start(profiler.WithProfileTypes(
	profiler.CPUProfile,
	profiler.HeapProfile,
	profiler.BlockProfile,
	profiler.MutexProfile,
	profiler.GoroutineProfile,
))
```

With dd-trace-go v1, import `gopkg.in/DataDog/dd-trace-go.v1/profiler` instead. The functions are the same.

</TabItem>
<TabItem value="node" label="Node.js">

Set the variable on the application. The tracer must be initialized before any other module, as for tracing.

```shell
DD_PROFILING_ENABLED=true
```

Or in code:

```javascript
require('dd-trace').init({ profiling: true });
```

</TabItem>
<TabItem value="dotnet" label=".NET">

The profiler ships in the same `datadog-dotnet-apm` package as the tracer. On Linux x64 with the package installed in `/opt/datadog`, set these on the application, next to the tracer variables:

```shell
DD_PROFILING_ENABLED=true
CORECLR_ENABLE_PROFILING=1
CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
DD_DOTNET_TRACER_HOME=/opt/datadog
# needed by the profiler on Linux
LD_PRELOAD=/opt/datadog/linux-x64/Datadog.Linux.ApiWrapper.x64.so
```

After installing the package, run `/opt/datadog/createLogPath.sh` once so the tracer can write its logs.

</TabItem>
<TabItem value="ruby" label="Ruby">

Use the `datadog` gem (it builds a native extension, so the image needs a compiler at install time). Set the variable and start the application through `ddprofrb`:

```shell
DD_PROFILING_ENABLED=true \
bundle exec ddprofrb exec rails server
```

</TabItem>
<TabItem value="php" label="PHP">

Install the tracer with profiling. On Alpine Linux, install `libgcc` first (`apk add --no-cache libgcc`).

```shell
curl -LO https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php
php datadog-setup.php --php-bin=all --enable-profiling
```

Then turn it on in the same ini file that holds your tracer settings (for example `/etc/php/<php_version>/fpm/conf.d/98-ddtrace.ini`), and restart php-fpm or Apache:

```ini title="ddtrace.ini"
datadog.profiling.enabled = 1
```

Use the ini file rather than environment variables. Environment variables do not reach Apache mod_php or php-fpm workers by default.

</TabItem>
<TabItem value="native" label="Native (ddprof)">

`ddprof` profiles any native program without code changes. Download it from the [ddprof releases](https://github.com/DataDog/ddprof/releases) and start your program through it:

```shell
DD_SERVICE=<app_name> \
DD_ENV=myenv \
DD_VERSION=1.2.3 \
DD_TRACE_AGENT_URL=http://<datadog_agent_host_name>:8126 \
ddprof <your_program> <args>
```

`ddprof` uses the kernel's `perf_event_open`. In a container, give it the `PERFMON` capability and an unconfined seccomp profile (with Docker: `--cap-add PERFMON --security-opt seccomp=unconfined`). Build with debug symbols, or keep the binary unstripped, so frames have names.

</TabItem>
</Tabs>

## Step 3. Check that it works

1. Wait two to three minutes after the application restarts.
2. Open **Profiles** in CubeAPM. Set the environment picker at the top to the env your application sends in `DD_ENV`, or to `UNSET` to see all envs.
3. Pick your service under **service** in the filter rail. Each upload shows up as one or more rows with the source **Datadog**.
4. Open a row to see its flame graph.

If nothing shows up, see [Troubleshooting](#troubleshooting).

## Accounts

If you use more than one CubeAPM account, profiles go to the same account as your traces:

| Setup | Account |
|---|---|
| Through the Datadog Agent | The account whose license key is set as the agent's `DD_API_KEY`. A key CubeAPM does not know sends data to the default account. Data sent with a revoked key is not visible in any account |
| Straight to CubeAPM | The default account. Tracers send no key. To route profiles to another account, send them through the Datadog Agent |

## Limits

| Item | Value |
|---|---|
| Upload size | 50 MiB per upload, and 200 MiB for each profile in it after decompression. Real uploads are usually a few kilobytes to a few megabytes |
| Uploads processed at once | `profiles.max-concurrent-uploads`, default twice the number of CPUs. Above it, CubeAPM answers 429 with `Retry-After: 60` |
| Retention | `profiles.retention`, default 7 days |

See [Profiling > Settings](/profiling#settings) for all CubeAPM settings.

## Troubleshooting

To see each upload in the CubeAPM log, set `log-level=info` on CubeAPM. A good upload logs `profiles: received datadog profile payload` and then `profiles: datadog profile parsed` with the service and the record types. A rejected one logs `profiles: datadog parse failed` at `warn` level with the reason.

| What you see | Cause | Fix |
|---|---|---|
| No profiles through the agent, while traces arrive | `DD_APM_PROFILING_DD_URL` is not set, so the agent sends profiles to Datadog | Set it as in Step 1 and restart the agent |
| No profiles and no CubeAPM log lines, through the agent | `DD_APM_PROFILING_DD_URL` has no path, so the agent posts to `/` | Use the full URL ending in `/api/v2/profile` |
| No profiles. The tracer logs no error, or the agent logs HTTP 401 | The tracer or agent points at port 3125 (the UI port) instead of 3130 | Use port 3130 |
| Agent log warns that the `profiling_dd_url` path is deprecated | The URL ends in `/profiling/v1/input`. CubeAPM accepts it, but the agent prefers `/api/v2/profile` | Switch to `/api/v2/profile` to remove the warning |
| Profiles are in the default account instead of yours | Straight-to-CubeAPM setup, or the agent's `DD_API_KEY` is not a registered license key | Send through the agent with a registered key |
| Tracer log shows HTTP 429 | More uploads at once than `profiles.max-concurrent-uploads` | Raise the limit on CubeAPM |
| No rows when an env is selected | The application sends a different `DD_ENV`, or none | Set the environment picker to `UNSET` |
| Python profiles have no host | The Python tracer does not send a host name with profiles | Filter Python profiles by service |
| Go heap profile: allocations are empty in some records | Go updates heap data only after a garbage collection. A minute with no GC has no new allocations | Expected. Look at a longer time range |
| A trace's **Profiles** tab says no profile records overlap this span | The tab starts narrowed to the selected span, and the work ran in a child span | Click **widen to the whole trace** |
| A trace's **Profiles** tab is empty for a very fast request | The profiler took no sample while that request ran. Requests of a few milliseconds often have none | Expected. Open a slower trace of the same endpoint |
| Traces stopped arriving after upgrading the Datadog Agent to 7.84 or newer (profiles still arrive) | Older CubeAPM builds cannot read the trace format the 7.84 agent sends by default | Upgrade CubeAPM |

Tracer side, these settings help:

```shell
# print the tracer configuration at startup
DD_TRACE_STARTUP_LOGS=true
# detailed tracer logs
DD_TRACE_DEBUG=true
```

## FAQ

**Do I need a Datadog account?** No. The Datadog Agent requires `DD_API_KEY` to be set, but nothing is sent to Datadog for profiles. With more than one CubeAPM account, use a registered license key as the value, see [Accounts](#accounts).

**Which host shows on a profile?** The application's host name (in a container, the container's host name), as the tracer reports it. With the agent in between, it is still the application's host, not the agent's. Python profiles carry no host.

**Can I turn Datadog profiling off on the CubeAPM side?** There is no switch in CubeAPM. Turn profiling off in each application (`DD_PROFILING_ENABLED=false`, or `datadog.profiling.enabled = 0` for PHP) and restart it. Do not just remove `DD_APM_PROFILING_DD_URL` from the agent: the agent then sends profiles to Datadog.

**Why does a Java profile have a `jfr-source` row?** It is the original JFR recording the tracer sent, kept as it arrived. It has no flame graph of its own. The `cpu`, `alloc_space`, `wall_time`, `gc_time` and `lock_time` rows next to it are built from it.

**Why do Python, PHP, Ruby, .NET and native profiles show one `combined` row?** These tracers send all their profile types in one file. Open the row and pick the type in the sample type selector.

**How much data does it add?** One upload per process per minute. In our tests, a Java upload was between about 17 KB and 1.6 MB, depending on load and profile types.
