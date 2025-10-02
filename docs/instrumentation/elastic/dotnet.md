---
id: dotnet
title: ".NET Core"
slug: /instrumentation/elastic/dotnet
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Installation

1. Follow this link to install Elastic agent: https://www.elastic.co/docs/reference/apm/agents/dotnet/setup-dotnet-net-core#zero-code-change-setup.

1. Configure the agent.

   <Tabs>
      <TabItem value="env" label="Environment Variables">
         ```shell
         ELASTIC_APM_SERVICE_NAME=<app_name>
         # send traces to CubeAPM
         ELASTIC_APM_SERVER_URL=http://<ip_address_of_cubeapm_server>:3130
         # optional settings
         ELASTIC_APM_ENVIRONMENT=myenv
         ELASTIC_APM_SERVICE_VERSION=1.2.3
         ELASTIC_APM_GLOBAL_LABELS=mykey1=myvalue1,mykey2=myvalue2
         ```
      </TabItem>
   </Tabs>

## Sample App

A working example is available at https://github.com/cubeapm/sample_app_dotnet_core/tree/elastic.

## Troubleshooting

The following can be used for troubleshooting:

```shell
# Print Elastic agent logs on screen
ELASTIC_OTEL_LOG_TARGETS=stdout
# Set Elastic agent log level to debug if needed to see detailed logs
OTEL_LOG_LEVEL=debug
```