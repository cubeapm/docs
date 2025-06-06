---
id: nodeJs-nest
title: "NodeJS Nest"
slug: /instrumentation/newrelic/nodejs-nest
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ProxySetup from './\_proxy_setup.mdx';

## Installation

Following are the steps to install the New Relic agent and connect it with CubeAPM. If New Relic agent is already installed, you can jump to step 5.

1. Install dependencies

   ```shell
   npm install newrelic
   ```

1. (Optional) From `node_modules/newrelic`, copy `newrelic.js` into the root directory of your application.

1. Configure the agent.

   <Tabs>
      <TabItem value="file" label="newrelic.js">
         ```javascript
         exports.config = {
            app_name: ["<app_name>"],
            license_key: "ABC4567890ABC4567890ABC4567890ABC4567890",
         };
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
      <TabItem value="code" label="Code">
         Add the following line at the top of your project's main file.
         ```javascript
         const newrelic = require("newrelic");
         ```
      </TabItem>
      <TabItem value="env" label="Environment Variables">
         ```shell
         NODE_OPTIONS=--require newrelic
         ```
      </TabItem>
      <TabItem value="cmd" label="Startup Command">
         Add `--require newrelic` to your application run command, e.g.,
         ```shell
         node --require newrelic app.js
         ```
      </TabItem>
   </Tabs>

1. <ProxySetup />

1. Tell the agent to connect with CubeAPM instead of New Relic:

   <Tabs>
      <TabItem value="file" label="newrelic.js">
         ```javascript
         exports.config = {
            app_name: ["<app_name>"],
            license_key: "ABC4567890ABC4567890ABC4567890ABC4567890",
            // Use your load balancer's domain name here
            host: "<cubeapm-newrelic.yourdomain.com>",
         };
         ```
      </TabItem>
      <TabItem value="env" label="Environment Variables">
         ```shell
         NEW_RELIC_APP_NAME=<app_name>
         NEW_RELIC_LICENSE_KEY=ABC4567890ABC4567890ABC4567890ABC4567890
         # Use your load balancer's domain name here
         NEW_RELIC_HOST=<cubeapm-newrelic.yourdomain.com>
         ```
      </TabItem>
   </Tabs>

## Sample App

A working example is available at https://github.com/cubeapm/sample_app_nodejs_nest/tree/newrelic

## Troubleshooting

The following can be used for troubleshooting:

<Tabs>
   <TabItem value="file" label="newrelic.js">
      ```javascript
      exports.config = {
         logging: {
            // Print New Relic agent logs on screen
            filepath: "stdout",
            // Set New Relic agent log level to debug if needed to see detailed logs
            level: "debug",
         },
      };
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
