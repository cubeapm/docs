---
id: python-sanic
title: "Python Sanic"
slug: /instrumentation/elastic/python-sanic
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Prerequisites

Python 3.6+

## Installation

1. Install dependencies:

   ```shell
   pip install elastic-apm
   ```

1. Add the highlighted lines below to your project's `server.py` file:

   ```python
   import os
   import requests
   import socket
   from sanic import Sanic
   # highlight-start
   from elasticapm.contrib.sanic import ElasticAPM
   # highlight-end


   app = Sanic("CubeAPMSampleApp")
   # highlight-start
   apm = ElasticAPM(app=app)
   # highlight-end
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

A working example is available at https://github.com/cubeapm/sample_app_python_sanic/tree/elastic.

## Troubleshooting

The following can be used for debugging:

```shell
# Print Elastic agent logs on screen
ELASTIC_APM_LOG_FILE=stdout
# Set Elastic agent log level to debug if needed to see detailed logs.
# Refer to Sample Application for additional requirements.
ELASTIC_APM_LOG_LEVEL=debug
```