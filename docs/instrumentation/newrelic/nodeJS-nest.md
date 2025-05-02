---
id: nodeJs-nest-newrelic
title: "NodeJS Nest"
slug: /instrumentation/newrelic/nodejs-nest-newrelic
---

## Installation

1. Install dependencies

   ```shell
   npm install newrelic
   ```

1. (Optional) From `node_modules/newrelic`, copy `newrelic.js` into the root directory of your application.

1. Configure agent via the newrelic.js file or via environment variables:

   Configuration file
   ```javascript
   exports.config = {
     app_name: ['<app_name>'],
     license_key: 'ABC4567890ABC4567890ABC4567890ABC4567890',
   }
   ```

   Environment variables
   ```shell
   NEW_RELIC_APP_NAME=<app_name> 
   NEW_RELIC_LICENSE_KEY=ABC4567890ABC4567890ABC4567890ABC4567890
   ```

1. Add the below line at the top of your project's main file do load the agent when the application starts:

   ```javascript
   const newrelic = require('newrelic');
   ```
   Alternatively, you can load the agent using the environment variable:

    ```shell
    NODE_OPTIONS=--require newrelic
    ```
   Or you can add `--require newrelic` to your application run command, e.g., 
   ```shell
   node --require newrelic app.js
   ```

1. Tell the agent to connect with CubeAPM instead of New Relic:

   Configuration file
   ```javascript
   exports.config = {
     app_name: ['<app_name>'],
     license_key: 'ABC4567890ABC4567890ABC4567890ABC4567890',
     // highlight-next-line
     host: '<domain_of_cubeapm_server>',
   }
   ```

   Environment variables
   ```shell
   NEW_RELIC_APP_NAME=<app_name> 
   NEW_RELIC_LICENSE_KEY=ABC4567890ABC4567890ABC4567890ABC4567890
   // highlight-next-line
   NEW_RELIC_HOST=<domain_of_cubeapm_server>
   ```

### Sample App

A working example with multiple instrumentations is available at https://github.com/cubeapm/sample_app_nodejs_nest/tree/newrelic


## Troubleshooting

The following can be used for debugging:

Configuration file
   ```javascript
   exports.config = {
     // highlight-start
     logging: {
      level: 'debug',
      filepath: 'stdout'
     },
     // highlight-end
   }
   ```

Environment variables
```shell
# Print New Relic agent logs on screen
// highlight-next-line
NEW_RELIC_LOG=stdout
# Set New Relic agent log level to debug if needed to see detailed logs
// highlight-next-line
NEW_RELIC_LOG_LEVEL=debug
```
