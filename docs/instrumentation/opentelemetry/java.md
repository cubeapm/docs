---
id: java
title: "Java"
slug: /instrumentation/opentelemetry/java
---

## Prerequisites

Java 8+

Ref: https://github.com/open-telemetry/opentelemetry-java/blob/main/VERSIONING.md#language-version-compatibility

## Auto Instrumentation

1. Download the OpenTelemetry Java Agent jar.

   https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar

2. Modify the application run command as follows:

   ```shell
   java -javaagent:</path/opentelemetry-javaagent.jar> \
       -Dotel.metrics.exporter=otlp \
       -Dotel.logs.exporter=otlp \
       -Dotel.traces.exporter=otlp \
       -Dotel.exporter.otlp.protocol=http/protobuf \
       -Dotel.exporter.otlp.metrics.endpoint=http://<ip_address_of_cubeapm_server>:3130/api/metrics/v1/save/otlp \
       -Dotel.exporter.otlp.logs.endpoint=http://<ip_address_of_cubeapm_server>:3130/api/logs/insert/opentelemetry/v1/logs \
       -Dotel.exporter.otlp.logs.headers=Cube-Stream-Fields=service.name%2Cseverity \
       -Dotel.exporter.otlp.traces.endpoint=http://<ip_address_of_cubeapm_server>:4318/v1/traces \
       -Dotel.exporter.otlp.compression=gzip \
       -Dotel.service.name=<app_name> \
       -jar <myapp>.jar
   ```

   Alternatively, the following environment variables can be set:

   ```shell
   JAVA_TOOL_OPTIONS=-javaagent:</path/opentelemetry-javaagent.jar>
   OTEL_METRICS_EXPORTER=otlp
   OTEL_LOGS_EXPORTER=otlp
   OTEL_TRACES_EXPORTER=otlp
   OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
   OTEL_EXPORTER_OTLP_METRICS_ENDPOINT=http://<ip_address_of_cubeapm_server>:3130/api/metrics/v1/save/otlp
   OTEL_EXPORTER_OTLP_LOGS_ENDPOINT=http://<ip_address_of_cubeapm_server>:3130/api/logs/insert/opentelemetry/v1/logs
   OTEL_EXPORTER_OTLP_LOGS_HEADERS=Cube-Stream-Fields=service.name%2Cseverity
   OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://<ip_address_of_cubeapm_server>:4318/v1/traces
   OTEL_EXPORTER_OTLP_COMPRESSION=gzip
   OTEL_SERVICE_NAME=<app_name>
   ```

Logs/Metrics exporter can be set to `none` instead of `otlp` to disable sending logs/metrics.

For Java applications running on Tomcat, we need to set the CATALINA_OPTS environment variable instead of JAVA_TOOL_OPTIONS. Rest of the steps are the same as above.

```shell
# Add to <tomcat_home>/bin/setenv.sh
export CATALINA_OPTS="$CATALINA_OPTS -javaagent:/path/to/opentelemetry-javaagent.jar"
```

Ref: https://opentelemetry.io/docs/zero-code/java/agent/server-config/

OTel agent does not support having different service name for multiple applications running in the same Tomcat instance. We recommend using New Relic agent in this case, with `enable_auto_app_naming` (ref: https://docs.newrelic.com/docs/apm/agents/java-agent/configuration/automatic-application-naming/).

## Sample App

A working example is available at https://github.com/cubeapm/sample_app_java_spring/tree/otel

## Troubleshooting

The following can be used for debugging:

```
-Dotel.javaagent.debug=true
or
OTEL_JAVAAGENT_DEBUG=true
```

Also, traces, metrics and logs exporters can be changed from `otlp` to `console` to output their respective data on console.

The following command can be tried on the application host server to check connectivity to CubeAPM server(s):

```shell
telnet <ip_address_of_cubeapm_server> 4318
```

## Manual Instrumentation

OpenTelemetry captures a lot of information automatically. However, there is sometimes a need to capture
additional information that may be specific to your application. Follow the below steps to attach additional
information to traces generated by your application.

1. Add the following dependencies to pom.xml

   ```xml
   <project>
     <dependencyManagement>
       <dependencies>
         <dependency>
           <groupId>io.opentelemetry</groupId>
           <artifactId>opentelemetry-bom</artifactId>
           <version>1.37.0</version>
           <type>pom</type>
           <scope>import</scope>
         </dependency>
       </dependencies>
     </dependencyManagement>
     <dependencies>
       <dependency>
         <groupId>io.opentelemetry</groupId>
         <artifactId>opentelemetry-api</artifactId>
       </dependency>
     </dependencies>
   </project>
   ```

   If you use Gradle, add the following:

   ```
   dependencies {
      implementation(platform("io.opentelemetry:opentelemetry-bom:1.37.0"));
      implementation("io.opentelemetry:opentelemetry-api");
   }
   ```

2. Go to the place in your code where you want to add additional information, and do the following:

   ```java
   import io.opentelemetry.api.trace.Span;

   @GetMapping
   public String controllerMethod() {
       Span span = Span.current();
       if (span != null) {
           span.setAttribute("custom.any.name.you.want", "any_value_you_want");
       }
   }
   ```

## Reference

https://opentelemetry.io/docs/instrumentation/java/manual/
