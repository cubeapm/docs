---
id: python-flask-uwsgi
title: "Python Flask uWSGI"
slug: /instrumentation/newrelic/python-flask-uwsgi
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ProxySetup from './\_proxy_setup.mdx';

## Installation

Following are the steps to install the New Relic agent and connect it with CubeAPM. If New Relic agent is already installed, you can jump to step 5.

1. Install dependencies:

   ```shell
   pip install newrelic
   ```

1. (Optional) From `lib/pythonx.xx/site-packages/newrelic`, copy `newrelic.ini` into the root directory of your application.

1. Configure the agent.

   <Tabs>
      <TabItem value="file" label="newrelic.ini">
         ```ini
         [newrelic]
         app_name = <app_name>
         license_key = ABC4567890ABC4567890ABC4567890ABC4567890
         ```
      </TabItem>
      <TabItem value="env" label="Environment Variables">
         ```shell
         NEW_RELIC_APP_NAME=<app_name>
         NEW_RELIC_LICENSE_KEY=ABC4567890ABC4567890ABC4567890ABC4567890
         ```
      </TabItem>
   </Tabs>

1. Add the highlighted lines below to your project's `app.py` file:

   <Tabs>
      <TabItem value="file" label="newrelic.ini">
         ```python title="app.py"
         from flask import Flask
         # highlight-start
         import newrelic.agent
         # highlight-end
         app = Flask(__name__)
         # highlight-start
         newrelic.agent.initialize("newrelic.ini")
         # highlight-end
         ```
      </TabItem>
      <TabItem value="env" label="Environment Variables">
         ```python title="app.py"
         from flask import Flask
         # highlight-start
         import newrelic.agent
         # highlight-end
         app = Flask(__name__)
         # highlight-start
         newrelic.agent.initialize()
         # highlight-end
         ```
      </TabItem>
   </Tabs>

1. <ProxySetup />

1. Tell the agent to connect with CubeAPM instead of New Relic:

   <Tabs>
      <TabItem value="file" label="newrelic.ini">
         ```ini
         [newrelic]
         app_name = <app_name>
         license_key = ABC4567890ABC4567890ABC4567890ABC4567890
         # highlight-start
         ; Use your load balancer's domain name here
         host = <cubeapm-newrelic.yourdomain.com>
         ; (optional) to get garbage collection metrics
         gc_runtime_metrics.enabled = true
         # highlight-end
         ```
      </TabItem>
      <TabItem value="env" label="Environment Variables">
         ```shell
         NEW_RELIC_APP_NAME=<app_name>
         NEW_RELIC_LICENSE_KEY=ABC4567890ABC4567890ABC4567890ABC4567890
         # highlight-start
         # Use your load balancer's domain name here
         NEW_RELIC_HOST=<cubeapm-newrelic.yourdomain.com>
         # (optional) to get garbage collection metrics
         NEW_RELIC_GC_RUNTIME_METRICS_ENABLED=true
         # highlight-end
         ```
      </TabItem>
   </Tabs>

### Sample App

A working example is available at https://github.com/cubeapm/sample_app_python_flask_uwsgi/tree/newrelic

## Troubleshooting

The following can be used for troubleshooting:

<Tabs>
   <TabItem value="file" label="newrelic.ini">
      ```ini
      [newrelic]
      ; Print New Relic agent logs on screen
      log_file = stdout
      ; Set New Relic agent log level to debug if needed to see detailed logs
      log_level = debug
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
