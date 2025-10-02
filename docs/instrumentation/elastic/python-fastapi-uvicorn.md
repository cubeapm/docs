---
id: python-fastapi-uvicorn
title: "Python FastAPI Uvicorn"
slug: /instrumentation/elastic/python-fastapi-uvicorn
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

1. Add the highlighted lines below to your project's `main.py` file:

   ```python
   import requests
   from fastapi import FastAPI
   # highlight-start
   from elasticapm.contrib.starlette import ElasticAPM
   # highlight-end

   app = FastAPI()
   # highlight-start
   app.add_middleware(ElasticAPM)
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
      <TabItem value="file" label="Code">
         ```python
         import requests
         from fastapi import FastAPI
         # highlight-start
         from elasticapm.contrib.starlette import make_apm_client, ElasticAPM
         # highlight-end

         app = FastAPI()
         # highlight-start
         apm= make_apm_client({
             'SERVICE_NAME': '<app_name>',
             # send traces to CubeAPM
             'SERVER_URL': 'http://<ip_address_of_cubeapm_server>:3130',
             # optional settings
             'ENVIRONMENT': 'myenv',
             'SERVICE_VERSION': '1.2.3',
             'GLOBAL_LABELS': 'mykey1=myvalue1,mykey2=myvalue2',
         })
         app.add_middleware(ElasticAPM)
         # highlight-end
         ```
      </TabItem>

   </Tabs>

## Sample Application

A working example is available at https://github.com/cubeapm/sample_app_python_fastapi_uvicorn/tree/elastic.

## Troubleshooting

The following can be used for debugging:

```shell
# Print Elastic agent logs on screen
ELASTIC_APM_LOG_FILE=stdout
# Set Elastic agent log level to debug if needed to see detailed logs (also see main.py for additional requirements)[https://github.com/cubeapm/sample_app_python_fastapi_uvicorn/blob/elastic/main.py]
ELASTIC_APM_LOG_LEVEL=debug
```