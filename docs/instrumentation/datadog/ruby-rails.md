---
id: ruby-rails
title: "Ruby Rails"
slug: /instrumentation/datadog/ruby-rails
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import AccountRouting from './\_account_routing.mdx';

## Installation

Following are the steps to install the Datadog agent and connect it with CubeAPM. If Datadog agent is already installed, you can jump to step 4.

1.  Add the below gem to your Gemfile:

    ```gemfile
    gem 'datadog', require: 'datadog/auto_instrument'
    ```

1.  Create a file `config/initializers/datadog.rb` in your project directory, with the following content:

    ```ruby title="config/initializers/datadog.rb"
    Datadog.configure do |c|
     # Add additional configuration here.
     # Activate integrations, change tracer settings, etc...
     # https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby/#rails
    end
    ```

1.  Configure the tracer.

    <Tabs>
       <TabItem value="env" label="Environment Variables">
          ```shell
          DD_SERVICE=<app_name>
          # Send data to Datadog Agent
          DD_AGENT_HOST=datadog-agent

          # optional settings
          DD_ENV=myenv
          DD_VERSION=1.2.3
          DD_TAGS=mykey1:myvalue1,mykey2:myvalue2
          ```

       </TabItem>
    </Tabs>

1.  Configure Datadog Agent to forward metrics and traces to CubeAPM

    ```shell
    DD_API_KEY=<your_datadog_key>
    # highlight-start
    # send runtime metrics to CubeAPM
    DD_DD_URL=http://<ip_address_of_cubeapm_server>:3130
    # send traces to CubeAPM
    DD_APM_DD_URL=http://<ip_address_of_cubeapm_server>:3130
    # highlight-end
    # Accept traces and metrics from applications running outside the agent host
    DD_APM_NON_LOCAL_TRAFFIC=true
    DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true
    ```

1.  <AccountRouting />

## Sample App

A working example is available at https://github.com/cubeapm/sample_app_ruby_rails/tree/datadog

## Troubleshooting

The following can be used for troubleshooting:

```shell
# Print Datadog tracer startup logs on screen
DD_TRACE_STARTUP_LOGS=true
# Enable Datadog tracer debug logging if needed to see detailed logs
DD_TRACE_DEBUG=true
```
