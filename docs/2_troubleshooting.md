---
slug: /troubleshooting
sidebar_position: 10
---

# Troubleshooting

Troubleshoot the challanges you are facing while using CubeAPM.


## Traces & Logs Correlation.

To have Traces and Logs correlated, you need to have the same trace_id across all the traces and logs.

For configuring same trace_id field accross all the traces and logs, you can follow the steps below.

#### For Otel/Fluentd/FluentBit and other log collectors.

Make sure the regex for extracting `trace_id` from raw logs is correct. And use proper receiver for this.

> OTEL supports *filelog receiver* to collect logs from files and also has support for regex. You can refer ***[here](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver)*** to configure.

> Fluentd and Fluent Bit supports *Multiline*, *parser*, *regex* plugins to parse the required attributes from the raw logs. You can refer ***[Fluentd](https://docs.fluentd.org/parser/)*** and ***[FluentBit](https://docs.fluentbit.io/manual/data-pipeline/parsers)*** to configure.

> Filebeat and Logstash supports *multiline*, *grok* etc, To parse the required fields from the raw logs. You can refer ***[Filebeat](https://www.elastic.co/docs/reference/beats/filebeat/regexp-support)*** and ***[Logstash](https://www.elastic.co/docs/reference/logstash/plugins)*** to configure.

#### For DataDog/Elastic/NewRelic/Otel and other APM

During the logs configuration on your application side(any logger like logback, log4j, etc.), make sure the application traces are configured and mapped with the `trace_id` field of the logs.

-------------------------------------------------------------------------

## Receiver Group for Alerts.

You can configure receiver groups to receive alerts on your selected receivers. Also you can configure multiple receivers for a single receiver group and the alert will be sent to all the receivers in the group. Also you can configure multiple receiver groups and assign them to different alert rules.

#### Configure Receiver Group for Alerts.

1. Go to the alert page and select ***Receiver Groups*** option. Click on the **New +** button. 

1. Configure the ***Alert Receiver Groups*** by giving name to the group and select the receivers to which you want to send the alerts. Also you can add multiple receivers in a group by clicking the ***Add Receiver*** button.

    ![Receiver Groups](/img/configure/troubleshoot/receiver-group.png)

-------------------------------------------------------------------------

## Mute Groups for Alerts.

You can configure the mute group to temporarly stop receiving alerts for a specific time period. For example, if you are doing some maintenance on your application, you can configure the mute group to stop receiving alerts for the duration of the maintenance. Also you can configure multiple mute groups to mute alerts on a specific day or for a specific time duration.

#### Configure Mute Group for Alerts.

1. Go to the alert page and select ***Mute Groups*** option. Click on the **New +** button.

1. Configure the ***Alert Mute Groups*** by giving name to the group and select the *Start at*, *Mute for*, *Every [days]* and *Timezone*.

    ![Mute Groups](/img/configure/troubleshoot/mute-group.png)

-------------------------------------------------------------------------

## Data Retention.

By default CubeAPM can store logs, traces and metrics data for certain time period on the disk and after that it will delete that data.

> For logs, the default time period is 24hrs.

> For traces, the default time period is 168hrs (7days).

> For metrics, the default time period is 720hrs (30days).

You can configure this in the CubeAPM config.properties file.

-------------------------------------------------------------------------

## CubeAPM Monitoring.

You can monitor the health of CubeAPM and server or pods on which it is running. Also, you can monitor your traces, metrics & logs ingestion rate.

- To monitor this, you can go to **Admin -> Stats** on the CubeAPM UI. Here you can see all the metrics like CPU, Memory, and disk usage etc.

-------------------------------------------------------------------------

## Disable Dummy Services.

By default CubeAPM show dummy services and their metrics on CubeAPM UI. To disable them, you need to set `tracegen.disable=false` to `true` in CubeAPM's config properties file.

-------------------------------------------------------------------------

## Multiple Latency Column & Dashboard.

By default, CubeAPM shows a single latency column (usually P90) and dashboard on the home page and APM page. But you can enable multiple latency columns and corresponding dashboards.

Additionally, there are two available options:

1. Add these columns to the **Service Home Page**.
2. Add them as a dashboard on the **Services Page** under the **Overview**, **RED**, and **Detail** tabs.

#### Enable Multiple Latency Column on Service Home Page.

To enable multiple latency columns on service home page (like P50,P90,P95,P99 etc), you need to set the following parameters.


1. Go to **Admin -> Settings** page on the CubeAPM UI.
1. On the settings page you can see **Detail View** option. Under this you can see *Latency Column 1*, *Latency Column 2* and *Latency Column 3* option.
1. In the Latency column, select the Percentile and right next to it add the values and click the ***Save*** button.

    ![Detail View](/img/configure/troubleshoot/detail-view.png)

1. Once you save the changes, the multiple latency columns will be visible on the service home page.

    ![Service Home Page](/img/configure/troubleshoot/service-homepage.png)

#### Enable Multiple Latency Dashboard on Services Page.

1. Go to **Admin -> Settings** page on the CubeAPM UI.
1. On the settings page you can see **APM** option. Under this you can see *Latency 1*, *Latency 2*, and *Latency 3* option.
1. In the Latency column, select the Percentile and right next to it add the values and click the ***Save*** button.

    ![Latency Settings](/img/configure/troubleshoot/APM-view.png)

1. Once you save the changes, the multiple latency dashboards will be visible on the services page under the **Overview**, **RED**, and **Detail** tabs.

    ![Latency Dashboard](/img/configure/troubleshoot/service-page.png)

-------------------------------------------------------------------------

## Logs Download.

By default, the maximum number of log entries that can be downloaded in a single request is 1,000.

You can configure this setting in the CubeAPM UI under **Admin → Settings → Max number of log entries that can be downloaded in one download request**. The allowed range is 1,000 to 10,000 entries.

-------------------------------------------------------------------------

## Add Tags on Service.

By default CubeAPM don't add any tags on the services. But you can add the tags on the services based on your requirement.

#### Steps to Configure Tags on Service.

1. Go to the **Services** Page and select the **Settings** option.
1. On the settings page, you can see the **Tags** option. Click on the **Tags** option.
1. On the **Tags** configure the following options:

    - Select the Env
    - Select the Service for which you want to add the tags.
    - After selecting the service, click on **Add** button to add the tags to the selected service.
    - After clicking add, you can pass the key:value pair of the tags (Example: env:PROD, tier:PROD etc).
    - Click on **Save Tags** button to save the changes.

        ![Add Tags](/img/configure/troubleshoot/add_tags.png)

    - After saving the tags, you can see the tags on the service home page.

        ![Tags Added](/img/configure/troubleshoot/show-tags.png)

-------------------------------------------------------------------------

## Deployment Version Tag.

By default CubeAPM don't add any deployment version tag on the services. But you can add the deployment version tag to the services. To configure this, you need to add one variable to the application side like you have done for agent-specific configurations.

> For DataDog add this: `DD_VERSION=<app_version>` on your application side.

> For Elastic APM add this: `ELASTIC_APM_SERVICE_VERSION=<app_version>` on your application side.

> For NewRelic add this: `NEW_RELIC_METADATA_CUBE_ATTRS_SERVICE_P_VERSION=<app_version>` on your application side.

> For OpenTelemetry add this: `OTEL_RESOURCE_ATTRIBUTES=service.version=<app_version>` on your application side.

After adding the version tag you can see these versions on the **Services** page for that service under **Version** column.

![Version Tag](/img/configure/troubleshoot/version-tag.png)

-------------------------------------------------------------------------



