---
sidebar_position: 1
sidebar_label: Datadog
slug: /profiling/datadog
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Profiling with Datadog tracers

CubeAPM accepts continuous profiles from Datadog tracers. If your applications already send traces to CubeAPM with a Datadog tracer, you only need to turn profiling on in the tracer, and tell the agent to send profiles to CubeAPM.

## Coverage

| Language                           | Profile types                                                                         |
| ---------------------------------- | ------------------------------------------------------------------------------------- |
| .NET                               | CPU, wall time, exceptions, lock contention, timeline                                 |
| Go                                 | CPU and heap by default. Block, mutex and goroutine when you turn them on             |
| Java                               | CPU, allocations, wall time, GC time, lock time (only when there was lock contention) |
| Node.js                            | Wall time with CPU time, heap space, timeline                                         |
| PHP                                | CPU time, wall time, allocations, exceptions, timeline                                |
| Python                             | CPU time, wall time, exceptions, lock wait and hold time, allocations, heap           |
| Ruby                               | CPU time, wall time, timeline                                                         |
| C, C++, Rust and other native code | CPU time, allocations                                                                 |

For every language that has a Datadog tracer, CubeAPM also shows:

- the **endpoint breakdown**: how much of a profile was spent in each HTTP route;
- the **link from a trace to its profile**: open a trace, go to its **Profiles** tab, and see the profiles whose samples were taken while that request ran.

The profile types you see depend on what the tracer collects. Most tracers collect a subset by default and let you turn on more. Check the [Datadog profiler documentation](https://docs.datadoghq.com/profiler/enabling/) for your language.

## Integration

1. Install Datadog tracer

   For .NET, Go, Java, Node.js, PHP, Python, and Ruby, the profiler ships along with the tracer. So, for these languages, the first step is to [install the Datadog tracer](../instrumentation/datadog/datadog.md).

   For C, C++, Rust and other native code, profiling works via a separate integration as described in the next step.

1. Turn on profiling in the tracer

   Profiling is off by default in Datadog tracers. Turn it on for each application, then restart it.

   <Tabs groupId="dd-language">
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
   <TabItem value="java" label="Java">

   Add one setting to the way you already start the tracer:

   ```shell
   # environment variable
   DD_PROFILING_ENABLED=true

   # or JVM system property
   java -javaagent:</path/dd-java-agent.jar> -Ddd.profiling.enabled=true -jar <myapp>.jar
   ```

   </TabItem>
   <TabItem value="node" label="Node.js">

   Set the variable on the application. The tracer must be initialized before any other module, as for tracing.

   ```shell
   DD_PROFILING_ENABLED=true
   ```

   Or in code:

   ```javascript
   require("dd-trace").init({ profiling: true });
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
   <TabItem value="python" label="Python">

   Set the variable and start the application with `ddtrace-run`, as for tracing:

   ```shell
   DD_PROFILING_ENABLED=true \
   ddtrace-run gunicorn app:app -c gunicorn.conf.py
   ```

   </TabItem>
   <TabItem value="ruby" label="Ruby">

   Use the `datadog` gem (it builds a native extension, so the image needs a compiler at install time). Set the variable and start the application through `ddprofrb`:

   ```shell
   DD_PROFILING_ENABLED=true \
   bundle exec ddprofrb exec rails server
   ```

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

1. Configure Datadog Agent to forward profiles to CubeAPM

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
   # Accept telemetry data from applications running outside the agent host
   DD_APM_NON_LOCAL_TRAFFIC=true
   DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true
   ```

   If you are not using Datadog agent, and instead sending telemetry data from Datadog tracer directly to CubeAPM, the same `DD_TRACE_AGENT_URL` setting used for sending traces to CubeAPM works for profiles as well, so no extra config is needed.

## Troubleshooting

| What you see                                                         | Cause                                                                                              | Fix                                                |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| Python profiles have no host                                         | The Python tracer does not send a host name with profiles                                          | Filter Python profiles by service                  |
| Go heap profile: allocations are empty in some records               | Go updates heap data only after a garbage collection. A minute with no GC has no new allocations   | Expected. Look at a longer time range              |
| A trace's **Profiles** tab says no profile records overlap this span | The tab starts narrowed to the selected span, and the work ran in a child span                     | Click **widen to the whole trace**                 |
| A trace's **Profiles** tab is empty for a very fast request          | The profiler took no sample while that request ran. Requests of a few milliseconds often have none | Expected. Open a slower trace of the same endpoint |
