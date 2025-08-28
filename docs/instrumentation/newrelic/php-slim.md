---
id: php-slim
title: "PHP Slim"
slug: /instrumentation/newrelic/php-slim
---

import ProxySetup from './\_proxy_setup.mdx';

## Prerequisites

New Relic PHP agent version >= 10.0.0

## Installation

Following are the steps to install the New Relic agent and connect it with CubeAPM. If New Relic agent is already installed, you can jump to step 3.

1. Follow this link to install New Relic agent: https://docs.newrelic.com/docs/apm/agents/php-agent/installation/php-agent-installation-overview.

1. Configure the agent (the config file is generally available at `/etc/php/<php_version>/mods-available/newrelic.ini`).

   ```ini title="newrelic.ini"
   newrelic.license = ABC4567890ABC4567890ABC4567890ABC4567890
   newrelic.appname = <app_name>
   ```

1. <ProxySetup />

   :::info
   Below timeout values need to be set for queue worker, but these values impact web worker performance negatively, so they should not be set for web workers in production.
   1. `newrelic.daemon.app_connect_timeout = 15s` 
   1. `newrelic.daemon.start_timeout = 5s`
   :::

1. Tell the agent to connect with CubeAPM instead of New Relic:

   ```ini title="newrelic.ini"
   ; Use your load balancer's domain name here
   newrelic.daemon.collector_host = <cubeapm-newrelic.yourdomain.com>

   ; remove irrelevant spans from traces (optional but highly recommended)
   newrelic.transaction_tracer.detail = 0

   ; don't report E_WARNING as errors (optional)
   newrelic.error_collector.ignore_errors = E_WARNING
   ```

1. 

## Sample App

A working example is available at https://github.com/cubeapm/sample_app_php_slim/tree/newrelic

## Troubleshooting

The following can be used for troubleshooting:

```ini title="newrelic.ini"
newrelic.loglevel = debug
; newrelic.logfile = /var/log/newrelic/php_agent.log

newrelic.daemon.loglevel = debug
; newrelic.daemon.logfile = /var/log/newrelic/newrelic-daemon.log
```
