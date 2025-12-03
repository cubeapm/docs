---
id: dotnet
title: ".NET Core"
slug: /instrumentation/datadog/dotnet
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Installation

Following are the steps to install the Datadog agent and connect it with CubeAPM. If Datadog agent is already installed, you can jump to step 3.

1. Follow this link to install Datadog tracer: https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core/.

1. Configure the tracer.

   <Tabs>
      <TabItem value="env" label="Environment Variables">
         ```shell
         DD_AGENT_HOST=<datadog_agent_host_name>
         DD_SERVICE=<app_name>
         # Enable runtime metrics 
         DD_RUNTIME_METRICS_ENABLED=true 
         DD_RUNTIME_METRICS_RUNTIME_ID_ENABLED=true 
         # optional settings
         DD_ENV=UNSET
         DD_VERSION=1.2.3
         DD_TAGS=mykey1:myvalue1,mykey2:myvalue2
         ```
      </TabItem>
   </Tabs>

1. Configure Datadog Agent to forward metrics and traces to CubeAPM

   ```shell
   DD_API_KEY=<your_datadog_key>
   # highlight-start
   # send runtime metrics to CubeAPM
   DD_DD_URL=http://<ip_address_of_cubeapm_server>:3130
   # send traces to CubeAPM
   DD_APM_DD_URL=http://<ip_address_of_cubeapm_server>:3130
   # highlight-end
   # Accept traces and metrics from applications running outside the agent host
   DD_APM_NON_LOCAL_TRAFFIC=true
   DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true
   ```

## Sample App

A working example is available at https://github.com/cubeapm/sample_app_dotnet_core/tree/datadog.

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