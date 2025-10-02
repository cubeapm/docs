---
id: python-flask-uwsgi
title: "Python Flask uWSGI"
slug: /instrumentation/elastic/python-flask-uwsgi
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Prerequisites

Python 3.6+

## Installation

1. Install dependencies:

   ```shell
   pip install "elastic-apm[flask]"
   ```

1. Add the highlighted lines below to your project's `app.py` file:

   ```python
   import requests
   import socket
   from flask import Flask
   # highlight-start
   from elasticapm.contrib.flask import ElasticAPM
   # highlight-end


   app = Flask(__name__)
   # highlight-start
   apm = ElasticAPM(app)
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
         import socket
         from flask import Flask
         # highlight-start
         from elasticapm.contrib.flask import ElasticAPM
         # highlight-end

         app = Flask(__name__)
         # highlight-start
         app.config['ELASTIC_APM'] = {
             'SERVICE_NAME': '<app_name>',
             # send traces to CubeAPM
             'SERVER_URL': 'http://<ip_address_of_cubeapm_server>:3130',
             # optional settings
             'ENVIRONMENT': 'myenv',
             'SERVICE_VERSION': '1.2.3',
             'GLOBAL_LABELS': 'mykey1=myvalue1,mykey2=myvalue2',
         }
         apm = ElasticAPM(app)
         # highlight-end
         ```
      </TabItem>

   </Tabs>

## Sample Application

A working example is available at https://github.com/cubeapm/sample_app_python_flask_uwsgi/tree/elastic.

## Troubleshooting

The following can be used for debugging:

```shell
# Print Elastic agent logs on screen
ELASTIC_APM_LOG_FILE=stdout
# Set Elastic agent log level to debug if needed to see detailed logs (also see app.py for additional requirements)[https://github.com/cubeapm/sample_app_python_flask_uwsgi/blob/elastic/app.py]
ELASTIC_APM_LOG_LEVEL=debug
```