---
id: java
title: "Java"
slug: /instrumentation/newrelic/java
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Installation

Following are the steps to install the New Relic agent and connect it with CubeAPM. If New Relic agent is already installed, you can jump to step 5.

1. Download the Java APM agent with this link and then unzip it. (`/newrelic` contains newrelic.jar & newrelic.yml file.)

    ```
    curl -O https://download.newrelic.com/newrelic/java-agent/newrelic-agent/current/newrelic-java.zip 
    ```

1. Configure the agent:

   <Tabs>
      <TabItem value="file" label="newrelic.yml">
         ```javascript
         app_name: <app_name>
         license_key: 'ABC4567890ABC4567890ABC4567890ABC4567890'
         ```
      </TabItem>
      <TabItem value="env" label="Environment Variables">
         ```shell
         NEW_RELIC_APP_NAME=<app_name>
         NEW_RELIC_LICENSE_KEY=ABC4567890ABC4567890ABC4567890ABC4567890
         ```
      </TabItem>
   </Tabs>

1. Load the agent when the application starts.

   <Tabs>
      <TabItem value="env" label="Environment Variables">
         ```shell
         JAVA_TOOL_OPTIONS=-javaagent:</path/newrelic-agent.jar>
         ```
      </TabItem>
      <TabItem value="cmd" label="Startup Command">
         ```shell
         java -javaagent:</path/newrelic-agent.jar> \
         -jar <myapp>.jar
         ```
      </TabItem>
   </Tabs>

1. Tell the agent to connect with CubeAPM instead of New Relic.

   <Tabs>
      <TabItem value="file" label="newrelic.yml">
         ```javascript
         app_name: <app_name>
         license_key: 'ABC4567890ABC4567890ABC4567890ABC4567890'
         // highlight-next-line
         host_name: <domain_of_cubeapm_server>
         ```
      </TabItem>
      <TabItem value="env" label="Environment Variables">
         ```shell
         NEW_RELIC_APP_NAME=<app_name>
         NEW_RELIC_LICENSE_KEY=ABC4567890ABC4567890ABC4567890ABC4567890
         // highlight-next-line
         NEW_RELIC_HOST=<domain_of_cubeapm_server>
         ```
      </TabItem>
   </Tabs>

   :::tip
   See [Using CubeAPM with New Relic agents](newrelic.md) for details on how to set up `<domain_of_cubeapm_server>`.
   :::

## Sample App

A working example is available at https://github.com/cubeapm/sample_app_java_spring/tree/newrelic

## Troubleshooting

The following can be used for troubleshooting:

<Tabs>
   <TabItem value="file" label="newrelic.yml">
      ```javascript
      // Print New Relic agent logs on screen
      log: stdout
      // Set New Relic agent log level to debug if needed to see detailed logs
      log_level: debug
      ```
   </TabItem>
   <TabItem value="env" label="Environment Variables">
      ```shell
      # Print New Relic agent logs on screen
      NEW_RELIC_LOG=stdout
      # Set New Relic agent log level to debug if needed to see detailed logs
      NEW_RELIC_LOG_LEVEL=debug
      ```
   </TabItem>
</Tabs>
