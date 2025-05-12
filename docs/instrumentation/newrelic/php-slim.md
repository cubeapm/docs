---
id: php-slim
title: "PHP Slim"
slug: /instrumentation/newrelic/php-slim
---

## Installation

Following are the steps to install the New Relic agent and connect it with CubeAPM. If New Relic agent is already installed, you can jump to step 3.

1. Follow this link to install New Relic agent: https://docs.newrelic.com/docs/apm/agents/php-agent/installation/php-agent-installation-overview.

1. Configure the agent (the config file is generally available at `/etc/php/<php_version>/mods-available/newrelic.ini`).

    ```shell title="newrelic.ini"
    newrelic.license = "ABC4567890ABC4567890ABC4567890ABC4567890"
    newrelic.appname = "<app_name>"
    ```

1. Tell the agent to connect with CubeAPM instead of New Relic:

    ```shell title="newrelic.ini"
    newrelic.daemon.collector_host = "<domain_of_cubeapm_server>"
    ```

   :::tip
   See [Using CubeAPM with New Relic agents](newrelic.md) for details on how to set up `<domain_of_cubeapm_server>`.
   :::

### Sample App

A working example is available at https://github.com/cubeapm/sample_app_php_slim/tree/newrelic

## Troubleshooting

The following can be used for troubleshooting:

 ```shell title="newrelic.ini"
newrelic.loglevel = "debug"
# newrelic.logfile = "/var/log/newrelic/php_agent.log"

newrelic.daemon.loglevel = "debug"
# newrelic.daemon.logfile = "/var/log/newrelic/newrelic-daemon.log"
```