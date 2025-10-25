---
id: java
title: "Java"
slug: /instrumentation/elastic/java
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Installation

1. Download the Elastic APM Java agent jar.

   https://www.elastic.co/docs/reference/apm/agents/java/setup-javaagent#setup-javaagent-get-agent

1. Configure the agent:

   <Tabs>
      <TabItem value="env" label="Environment Variables">
         ```shell
         JAVA_TOOL_OPTIONS=-javaagent:</path/elastic-apm-agent.jar>

         ELASTIC_APM_SERVICE_NAME=<app_name>
         # send traces to CubeAPM
         ELASTIC_APM_SERVER_URL=http://<ip_address_of_cubeapm_server>:3130

         # optional settings
         ELASTIC_APM_ENVIRONMENT=UNSET
         ELASTIC_APM_SERVICE_VERSION=1.2.3
         ELASTIC_APM_GLOBAL_LABELS=mykey1=myvalue1,mykey2=myvalue2
         ```
      </TabItem>
   </Tabs>

## Sample App

A working example is available at https://github.com/cubeapm/sample_app_java_spring/tree/elastic

## Troubleshooting

The following can be used for troubleshooting:

```shell
# Print Elastic agent logs on screen
ELASTIC_APM_LOG_FILE=stdout
# Set Elastic agent log level to debug if needed to see detailed logs
ELASTIC_APM_LOG_LEVEL=debug
```


