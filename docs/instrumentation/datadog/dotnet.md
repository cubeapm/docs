---
id: dotnet
title: ".NET Core"
slug: /instrumentation/datadog/dotnet
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

CubeAPM is compatible with Datadog to send traces, metrics and logs to CubeAPM. Instrumenting datadog with application.

1. Using Datadog Auto-Instrumentation
2. Using Datadog APM SDK
3. Using Datadog Agent.

## Using Datadog auto-instrumentation

Instrument your .NET Core application with Datadog auto-instrumentation.

### Installation

Following are the steps to install the Datadog tracer and connect it with CubeAPM. If Datadog tracer is already installed, you can jump to step 2.

1. Follow this link to install Datadog tracer: https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core/.

2. To enable the .NET Tracer for your service, set the required environment variables and restart the application.

   <Tabs>
      <TabItem value="linux" label="Linux">
         ```shell
         CORECLR_ENABLE_PROFILING=1
         CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
         CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
         DD_DOTNET_TRACER_HOME=/opt/datadog
         ```
      </TabItem>
   </Tabs>

:::info
For Windows server refer this: https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/dotnet-core/?tab=windows#enable-the-sdk-for-your-service
:::

3. Configure the tracer to send traces to CubeAPM. Configure these settings in the environment variables of the application.

   <Tabs>
      <TabItem value="env" label="Environment Variables">
         ```shell
         # Configure service name.
         DD_SERVICE=<app_name>

         # Send data DIRECTLY to CubeAPM (Bypassing Datadog Agent)
         DD_TRACE_AGENT_URL=<cubeapm_endpoint>:3130

         ## Enable Agentless Direct Log Submission to CubeAPM
         DD_LOGS_INJECTION=true
         DD_LOGS_DIRECT_SUBMISSION_INTEGRATIONS=ILogger
         DD_LOGS_DIRECT_SUBMISSION_URL=<cubeapm_endpoint>:3130
         DD_API_KEY=<your_cubeapm_token>

         # optional settings
         DD_ENV=UNSET
         DD_VERSION=1.2.3
         DD_TAGS=mykey1:myvalue1,mykey2:myvalue2
         ```
      </TabItem>
   </Tabs>

### Sample Application

A working example is available at: https://github.com/cubeapm/sample_app_dotnet-core/tree/dd-auto-instrument.



## Using Datadog SDK

Instrument your .NET Core application with Datadog APM SDK. This required manual code changes.

### Installation

Following are the steps to configure datadog SDK with your application:

1. In your `<name>.csproj` file add manually imported the required Datadog SDKs via NuGet packages:

   - Datadog.Trace : The core Datadog tracing SDK used to manually create and manage spans.

   ```csharp
   <PackageReference Include="Datadog.Trace" Version="3.13.0" />
   ```

   - **(Optional)** Serilog.Sinks.Datadog.Logs : A Serilog sink that formats your logs specifically for the Datadog ingestion API.

   ```csharp
   <PackageReference Include="Serilog.AspNetCore" Version="8.0.0" />
   <PackageReference Include="Serilog.Sinks.Datadog.Logs" Version="0.5.4" />
   ```

2. Instead of relying on the Datadog Agent's auto-instrumentation to capture the application's lifecycle, you are manually creating a root trace span that wraps the entire execution of your application. In your `Program.cs` add this line of code.

   ```csharp
   // Example of Manual SDK Instrumentation
    using (var scope = Datadog.Trace.Tracer.Instance.StartActive("application.startup"))
    {
        scope.Span.ResourceName = "app.Run";
        scope.Span.SetTag("custom.tag", "sample-sdk-instrumentation"); // optional tags.

        app.Run();
    }
   ```

:::info
For more reference: https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/server-side/?api_type=dd_api&prog_lang=dot_net
:::

3. Configure the tracer to send traces to CubeAPM directly. Add the following in your application environments:

      ```shell
      # Configure service name.
      DD_SERVICE=<app_name>

      # Send data DIRECTLY to CubeAPM (Bypassing Datadog Agent)
      DD_TRACE_AGENT_URL=<cubeapm_endpoint>:3130

      # optional settings
      DD_ENV=UNSET
      DD_VERSION=1.2.3
      DD_TAGS=mykey1:myvalue1,mykey2:myvalue2
      ```

4. **(Optional)** Application Logging via Serilog to CubeAPM endpoint, using `Serilog.Sinks.Datadog.Logs` library to pipe your application logs directly to an API endpoint without needing a local Datadog Agent. In your `Program.cs` add this:

   ```csharp
   Log.Logger = new LoggerConfiguration()
        .Enrich.FromLogContext()
        .WriteTo.Console()
        .WriteTo.DatadogLogs(
            apiKey: "your_cubeapm_token",
            service: "cube_sample_dotnet_core_datadog_sdk",
            source: "csharp",
            host: Environment.MachineName,
            configuration: new Serilog.Sinks.Datadog.Logs.DatadogConfiguration
            {
                Url = "<cubeapm_endpoint>:3130" // Pointing Datadog Sink to CubeAPM
            }
        )
        .CreateLogger();
   ```


### Sample Application

A working example is available at https://github.com/cubeapm/sample_app_dotnet-core/tree/dd-sdk-instrument.

## Using DataDog Agent

Instrument your .NET core application using auto-instrumentation methods mentioned above and then install datadog agent to collect traces, metrics and logs.

1. Follow the steps to configure datadog tracer to send data to datadog agent:

   <Tabs>
      <TabItem value="env" label="Environment Variables">
         ```shell
         # Configure service name.
         DD_SERVICE=<app_name>

         # Send data to Datadog Agent
         DD_AGENT_HOST=datadog-agent

         # Enable Runtime metrics
         DD_RUNTIME_METRICS_ENABLED=true
         DD_RUNTIME_METRICS_RUNTIME_ID_ENABLED=true
         ```
      </TabItem>
   </Tabs>

2. Follow the steps to send traces, metrics and logs from datadog agent to cubeapm:

   <Tabs>
      <TabItem value="env" label="Environment Variables">
         ```shell
         # Required.
         DD_API_KEY=<your_datadog_api_key>

         # Send metrics to CubeAPM
         DD_DD_URL=<cubeapm_endpoint>:3130

         # send traces to CubeAPM
         DD_APM_DD_URL=<cubeapm_endpoint>:3130

         # send logs to CubeAPM
         DD_LOGS_CONFIG_LOGS_DD_URL=<cubeapm_endpoint>:3130
         DD_LOGS_ENABLED=true
         DD_LOGS_INJECTION=true
         DD_LOGS_CONFIG_USE_HTTP=true
         DD_LOGS_CONFIG_LOGS_NO_SSL=true
         DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true

         # Accept traces and metrics from applications running outside the agent host
         DD_APM_NON_LOCAL_TRAFFIC=true
         DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true

         # optional settings
         DD_ENV=UNSET
         DD_VERSION=1.2.3
         DD_TAGS=mykey1:myvalue1,mykey2:myvalue2
         ```
      </TabItem>
   </Tabs>

### Sample Application

A working example is available at https://github.com/cubeapm/sample_app_dotnet-core/tree/dd-agent.

## Additional Configuration

To send data to CubeAPM and Datadog both, Add the following configuration in your datadog agent.

<Tabs>
   <TabItem value="env" lable="Environment Variables">

      ```shell
         # Required
         # Original datadog api key.
         DD_API_KEY=<datadog api key> 

         # Your datadog URL.
         DD_SITE=<datadog site url>

         # Send data to Cubeapm and Datadog both.
         DD_APM_ADDITIONAL_ENDPOINTS={"<cubeapm_endpoint>:3130" :["<datadog api key>"]}
      ```
   </TabItem>
</Tabs>

## Troubleshooting

The following can be used for troubleshooting:

```shell
# Print Datadog tracer startup logs
DD_TRACE_STARTUP_LOGS=true
# Enable Datadog tracer debug logging if needed to see detailed logs
DD_TRACE_DEBUG=true
#
# On Linux, logs files are saved in /var/log/datadog/dotnet/ directory.
# On Windows, logs files are saved in %ProgramData%\Datadog .NET Tracer\logs\ directory.
```