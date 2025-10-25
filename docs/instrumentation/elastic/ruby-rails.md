---
id: ruby-rails
title: "Ruby Rails"
slug: /instrumentation/elastic/ruby-rails
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Installation

1. Add the below gem to your Gemfile:

   ```gemfile
   gem 'elastic-apm'
   ```

1. Configure the agent:

   <Tabs>
      <TabItem value="env" label="Environment Variables">
         ```shell
         ELASTIC_APM_SERVICE_NAME=<app_name>
         # send traces to CubeAPM
         ELASTIC_APM_SERVER_URL=http://<ip_address_of_cubeapm_server>:3130

         # optional settings
         # Elastic agent sets environment from ENV['RAILS_ENV'] by default
         ELASTIC_APM_ENVIRONMENT=UNSET
         ELASTIC_APM_SERVICE_VERSION=1.1.1
         ELASTIC_APM_GLOBAL_LABELS=mykey1=myvalue1,mykey2=myvalue2
         ```
      </TabItem>
   </Tabs>

## Sample App

A working example is available at https://github.com/cubeapm/sample_app_ruby_rails/tree/elastic

## Troubleshooting

The following can be used for troubleshooting:

```shell
# Print Elastic agent logs on screen
ELASTIC_APM_LOG_FILE=stdout
# Set Elastic agent log level to debug if needed to see detailed logs
# (RAILS_LOG_LEVEL=debug is also needed for elastic apm agent debug logs)
RAILS_LOG_LEVEL=debug
ELASTIC_APM_LOG_LEVEL=debug
```


