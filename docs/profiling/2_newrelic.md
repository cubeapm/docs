---
sidebar_position: 2
sidebar_label: New Relic
slug: /profiling/newrelic
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Profiling with New Relic agent

As of November 2026, New Relic has mature profiling support for Java, and _early preview_ support for some other languages, with more coverage planned over time. CubeAPM, at present, supports profiling with New Relic only for Java. Support for other languages will be added as they mature.

## Coverage

| Item          | Support                                                                                                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Profile type  | CPU. Values are sample counts, not CPU time.                                                                                                                       |
| JVM metrics   | CPU load, heap memory, garbage collection, thread allocation, metaspace, thread context switches.                                                                  |
| Not available | Allocation, lock and wall-clock profiles, the link from a trace to its profile, and the endpoint breakdown. The New Relic agent does not send the data these need. |

## Integration

1. Install New Relic agent

   Support for profiling is built into the New Relic APM agent itself. So, the first step is to [install the New Relic Java agent](../instrumentation/newrelic/java.md).

1. Turn on profiling in the agent

   Profiling is off by default. Turn it on for each application, then restart it.

   <Tabs>
      <TabItem value="file" label="newrelic.yml">
         ```yaml
         app_name: <app_name>
         license_key: 'ABC4567890ABC4567890ABC4567890ABC4567890'
         # Use your load balancer's domain name here
         # highlight-start
         host: <cubeapm-newrelic.yourdomain.com>
         event_ingest_uri: https://<cubeapm-newrelic.yourdomain.com>/api/logs/v1/push/newrelic/events
         metric_ingest_uri: https://<cubeapm-newrelic.yourdomain.com>/api/metrics/v1/push/newrelic/metric/v1
         jfr:
           enabled: true
         # highlight-end
         ```
      </TabItem>
      <TabItem value="env" label="Environment Variables">
         ```shell
         NEW_RELIC_APP_NAME=<app_name>
         NEW_RELIC_LICENSE_KEY=ABC4567890ABC4567890ABC4567890ABC4567890
         # Use your load balancer's domain name here
         # highlight-start
         NEW_RELIC_HOST=<cubeapm-newrelic.yourdomain.com>
         NEW_RELIC_JFR_ENABLED=true
         NEW_RELIC_EVENT_INGEST_URI=https://<cubeapm-newrelic.yourdomain.com>/api/logs/v1/push/newrelic/events
         NEW_RELIC_METRIC_INGEST_URI=https://<cubeapm-newrelic.yourdomain.com>/api/metrics/v1/push/newrelic/metric/v1
         # highlight-end
         ```
      </TabItem>
   </Tabs>

   :::info
   To give profiles an environment, write the app name as `<app_name>%<env>`, for example `order-service%sandbox`. The semicolon convention from the [multi-environment setup](../instrumentation/newrelic/newrelic.md#multi-environment-setup) is not supported by the profiler, and it results in profiles getting mapped to UNSET environment. Using percent works well for all cases.
   :::
