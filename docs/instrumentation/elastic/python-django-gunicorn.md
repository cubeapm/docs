---
id: python-django-gunicorn
title: "Python Django Gunicorn"
slug: /instrumentation/elastic/python-django-gunicorn
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

2. Add `elasticapm.contrib.django` in `settings.py`:

    ```python
    INSTALLED_APPS = [
    'elasticapm.contrib.django',
    ]    
    ```

4. Configure the agent.

   <Tabs>
      <TabItem value="file" label="settings.py">
         ```python
         ELASTIC_APM = {
         'SERVICE_NAME': '<app_name>',
         # send traces to CubeAPM
         'SERVER_URL': 'http://<ip_address_of_cubeapm_server>:3130',
         # optional settings
         'ENVIRONMENT': 'myenv',
         'SERVICE_VERSION': '1.2.3',
         'GLOBAL_LABELS': 'mykey1=myvalue1,mykey2=myvalue2',
         }
         ```
      </TabItem>
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

A working example is available at https://github.com/cubeapm/sample_app_python_django_gunicorn/tree/elastic.

## Troubleshooting

The following can be used for debugging:

```shell
# Print Elastic agent logs on screen
ELASTIC_APM_LOG_FILE=stdout
# Set Elastic agent log level to debug if needed to see detailed logs (also see wsgi.py for additional requirements)[https://github.com/cubeapm/sample_app_python_django_gunicorn/blob/elastic/sample_app/wsgi.py]
ELASTIC_APM_LOG_LEVEL=debug
```