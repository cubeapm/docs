---
id: java
title: "Java"
slug: /instrumentation/newrelic/java
---

## Auto Instrumentation

1. Download the New Relic Java Agent jar.

    https://download.newrelic.com/newrelic/java-agent/newrelic-agent/current/newrelic-agent.jar

1. Modify the application run command as follows:

   ```shell
   java -javaagent:</path/newrelic-agent.jar> \
       -Dnewrelic.config.host_name=<domain_of_cubeapm_server> \
       -Dnewrelic.config.app_name=<app_name> \
       -Dnewrelic.config.license_key=ABC4567890ABC4567890ABC4567890ABC4567890 \
       -jar <myapp>.jar
   ```
   Alternatively, the following environment variables can be set:

   ```shell
   JAVA_TOOL_OPTIONS=-javaagent:</path/newrelic-agent.jar>
   NEW_RELIC_HOST=<domain_of_cubeapm_server>
   NEW_RELIC_APP_NAME=<app_name>
   NEW_RELIC_LICENSE_KEY=ABC4567890ABC4567890ABC4567890ABC4567890
   ```
   :::tip
   See [Using CubeAPM with New Relic agents](newrelic.md) for details on how to set up `<domain_of_cubeapm_server>`.
   :::

## Sample App

A working example is available at https://github.com/cubeapm/sample_app_java_spring/tree/newrelic

## Troubleshooting

The following can be used for debugging:

```
# Print New Relic agent logs on screen
-Dnewrelic.config.log=stdout
or
NEW_RELIC_LOG=stdout

# Set New Relic agent log level to debug if needed to see detailed logs
-Dnewrelic.config.log_level=debug
or
NEW_RELIC_LOG_LEVEL=debug
```