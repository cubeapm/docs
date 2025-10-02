---
id: dotnet
title: ".NET Core"
slug: /instrumentation/datadog/dotnet
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Installation

1. Follow this link to install Datadog agent: https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core/.

1. Configure the agent.

   <Tabs>
      <TabItem value="env" label="Environment Variables">
         ```shell
         DD_SERVICE=<app_name>
         # send traces to CubeAPM
         DD_TRACE_AGENT_URL=http://<ip_address_of_cubeapm_server>:3130

         # optional settings
         DD_ENV=UNSET
         DD_VERSION=1.2.3
         DD_TAGS=mykey1:myvalue1,mykey2:myvalue2
         ```
      </TabItem>
   </Tabs>

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