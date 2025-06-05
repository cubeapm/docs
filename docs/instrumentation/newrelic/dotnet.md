---
id: dotnet
title: ".NET Core"
slug: /instrumentation/newrelic/dotnet
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ProxySetup from './\_proxy_setup.mdx';

## Installation

Following are the steps to install the New Relic agent and connect it with CubeAPM. If New Relic agent is already installed, you can jump to step 3.

1. Follow this link to install New Relic agent: https://docs.newrelic.com/install/dotnet.

1. Configure the agent.

   <Tabs>
      <TabItem value="file" label="newrelic.config">
         ```xml
         <configuration xmlns="urn:newrelic-config" agentEnabled="true">
            <service licenseKey="ABC4567890ABC4567890ABC4567890ABC4567890" />
            <application>
                <name>app_name</name>
            </application>
         </configuration>
         ```
      </TabItem>
      <TabItem value="env" label="Environment Variables">
         ```shell
         NEW_RELIC_APP_NAME=<app_name>
         NEW_RELIC_LICENSE_KEY=ABC4567890ABC4567890ABC4567890ABC4567890 
         ```
      </TabItem>
   </Tabs>

1. <ProxySetup />

1. Tell the agent to connect with CubeAPM instead of New Relic:

   <Tabs>
      <TabItem value="file" label="newrelic.config">
         ```xml
         <configuration xmlns="urn:newrelic-config" agentEnabled="true">
            <service 
               licenseKey="ABC4567890ABC4567890ABC4567890ABC4567890" 
               // highlight-start
               host="<cubeapm-newrelic.yourdomain.com>" 
               // highlight-end 
            />
            <application>
                <name>app_name</name>
            </application>
        </configuration>
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

A working example is available at https://github.com/cubeapm/sample_app_dotnet_core/tree/newrelic

## Troubleshooting

The following can be used for troubleshooting:

<Tabs>
   <TabItem value="file" label="newrelic.config">
      ```xml
      <configuration xmlns="urn:newrelic-config" agentEnabled="true">
         <log level="debug" console="true" />
      </configuration>
      ```
   </TabItem>
   <TabItem value="env" label="Environment Variables">
      ```shell
      # Print New Relic agent logs on screen
      NEW_RELIC_LOG_CONSOLE=true
      # Set New Relic agent log level to debug if needed to see detailed logs
      NEW_RELIC_LOG_LEVEL=debug
      ```
   </TabItem>
</Tabs>
