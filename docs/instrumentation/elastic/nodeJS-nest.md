---
id: nodeJs-nest
title: "NodeJS Nest"
slug: /instrumentation/elastic/nodejs-nest
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Installation

1. Install dependencies:

   ```shell
   npm install --save elastic-apm-node
   npm install --save-dev @types/node
   ```

1. Add the highlighted lines below to your project's `app.service.ts` file:

   ```javascript
   // highlight-start
   // Add the following line at the top of your project's main file.
   import 'elastic-apm-node/start'
   // highlight-end
   import { Injectable } from '@nestjs/common';
   ```

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

## Sample Application

A working example is available at https://github.com/cubeapm/sample_app_nodejs_nest/tree/elastic.

## Troubleshooting

The following can be used for debugging:

```shell
# Print Elastic agent logs on screen
ELASTIC_APM_LOG_FILE=stdout
# Set Elastic agent log level to debug if needed to see detailed logs
ELASTIC_APM_LOG_LEVEL=debug
```