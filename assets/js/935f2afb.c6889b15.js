"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[581],{5610:e=>{e.exports=JSON.parse('{"pluginId":"default","version":"current","label":"Next","banner":null,"badge":false,"noIndex":false,"className":"docs-version-current","isLast":true,"docsSidebars":{"tutorialSidebar":[{"type":"link","label":"Introduction","href":"/","docId":"introduction","unlisted":false},{"type":"category","label":"Installation","collapsible":true,"collapsed":true,"items":[{"type":"category","label":"Install CubeAPM","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Bare Metal / Virtual Machine","href":"/install/install-cubeapm/bare-metal-virtual-machine","docId":"Installation/install/baremetal","unlisted":false},{"type":"link","label":"Docker","href":"/install/install-cubeapm/docker","docId":"Installation/install/docker","unlisted":false},{"type":"link","label":"Kubernetes","href":"/install/install-cubeapm/kubernetes","docId":"Installation/install/kubernetes","unlisted":false}],"href":"/install/install-cubeapm"},{"type":"category","label":"Configure CubeAPM","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Sign in with Google","href":"/install/configure-cubeapm/sign-in-with-google","docId":"Installation/configure/oauth_google","unlisted":false},{"type":"link","label":"Sign in with GitHub","href":"/install/configure-cubeapm/sign-in-with-github","docId":"Installation/configure/oauth_github","unlisted":false},{"type":"link","label":"Connect with Slack for alerting","href":"/install/configure-cubeapm/connect-with-slack-for-alerting","docId":"Installation/configure/alerting_slack","unlisted":false},{"type":"link","label":"Connect with PagerDuty for alerting","href":"/install/configure-cubeapm/connect-with-pagerduty-for-alerting","docId":"Installation/configure/alerting_pagerduty","unlisted":false},{"type":"link","label":"Connect with Google Chat for alerting","href":"/install/configure-cubeapm/connect-with-google-chat-for-alerting","docId":"Installation/configure/alerting_googlechat","unlisted":false},{"type":"link","label":"Webhook for alerting","href":"/install/configure-cubeapm/webhook-for-alerting","docId":"Installation/configure/alerting_webhook","unlisted":false}],"href":"/install/configure-cubeapm"}]},{"type":"category","label":"Instrumentation","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"JavaScript (browser)","href":"/instrumentation/javascript-browser","docId":"instrumentation/javascript-browser","unlisted":false},{"type":"link","label":"Java","href":"/instrumentation/java","docId":"instrumentation/java","unlisted":false},{"type":"link","label":"NodeJS Express","href":"/instrumentation/nodejs-express","docId":"instrumentation/nodeJs-express","unlisted":false},{"type":"link","label":"NodeJS Nest","href":"/instrumentation/nodejs-nest","docId":"instrumentation/nodeJs-nest","unlisted":false},{"type":"link","label":"PHP Laravel","href":"/instrumentation/php-laravel","docId":"instrumentation/php-laravel","unlisted":false},{"type":"link","label":"PHP Slim","href":"/instrumentation/php-slim","docId":"instrumentation/php-slim","unlisted":false},{"type":"link","label":"Python Django Gunicorn","href":"/instrumentation/python-django-gunicorn","docId":"instrumentation/python-django-gunicorn","unlisted":false},{"type":"link","label":"Python Django uWSGI","href":"/instrumentation/python-django-uwsgi","docId":"instrumentation/python-django-uwsgi","unlisted":false},{"type":"link","label":"Python FastAPI Uvicorn","href":"/instrumentation/python-fastapi-uvicorn","docId":"instrumentation/python-fastapi-uvicorn","unlisted":false},{"type":"link","label":"Python Flask Gunicorn","href":"/instrumentation/python-flask-gunicorn","docId":"instrumentation/python-flask-gunicorn","unlisted":false},{"type":"link","label":"Python Flask uWSGI","href":"/instrumentation/python-flask-uwsgi","docId":"instrumentation/python-flask-uwsgi","unlisted":false},{"type":"link","label":"Python Sanic","href":"/instrumentation/python-sanic","docId":"instrumentation/python-sanic","unlisted":false}],"href":"/instrumentation"},{"type":"category","label":"Infra Monitoring","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Bare Metal / Virtual Machine","href":"/infra-monitoring/bare-metal-virtual-machine","docId":"infra-monitoring/baremetal","unlisted":false},{"type":"link","label":"Kubernetes","href":"/infra-monitoring/kubernetes","docId":"infra-monitoring/kubernetes","unlisted":false},{"type":"link","label":"AWS CloudWatch","href":"/infra-monitoring/aws-cloudwatch","docId":"infra-monitoring/cloudwatch","unlisted":false},{"type":"link","label":"Prometheus Metrics","href":"/infra-monitoring/prometheus-metrics","docId":"infra-monitoring/prometheus","unlisted":false},{"type":"link","label":"Varnish Cache","href":"/infra-monitoring/varnish-cache","docId":"infra-monitoring/varnish-cache","unlisted":false}],"href":"/infra-monitoring"},{"type":"category","label":"Logs","collapsible":true,"collapsed":true,"items":[{"type":"category","label":"Ingestion","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"AWS ECS","href":"/logs/ingestion/aws-ecs","docId":"logs/ingestion/aws-ecs","unlisted":false},{"type":"link","label":"AWS Lambda","href":"/logs/ingestion/aws-lambda","docId":"logs/ingestion/aws-lambda","unlisted":false},{"type":"link","label":"Filebeat","href":"/logs/ingestion/filebeat","docId":"logs/ingestion/filebeat","unlisted":false},{"type":"link","label":"Fluentbit","href":"/logs/ingestion/fluentbit","docId":"logs/ingestion/fluentbit","unlisted":false},{"type":"link","label":"Fluentd","href":"/logs/ingestion/fluentd","docId":"logs/ingestion/fluentd","unlisted":false},{"type":"link","label":"Kubernetes","href":"/logs/ingestion/kubernetes","docId":"logs/ingestion/kubernetes","unlisted":false}],"href":"/logs/ingestion"},{"type":"link","label":"Querying","href":"/logs/querying","docId":"logs/querying","unlisted":false}],"href":"/logs"}]},"docs":{"infra-monitoring/baremetal":{"id":"infra-monitoring/baremetal","title":"Bare Metal / Virtual Machine","description":"The recommended setup for infra monitoring with CubeAPM is to use OpenTelemetry (OTel) Collector for collecting the metrics from host machines and sending them to CubeAPM. CubeAPM then provides visualization and alerting on the collected metrics.","sidebar":"tutorialSidebar"},"infra-monitoring/cloudwatch":{"id":"infra-monitoring/cloudwatch","title":"AWS CloudWatch","description":"The recommended setup for monitoring AWS with CubeAPM is to use AWS CloudWatch Metric Streams for collecting the metrics from AWS and sending them to CubeAPM. CubeAPM then provides visualization and alerting on the collected metrics.","sidebar":"tutorialSidebar"},"infra-monitoring/infra-monitoring":{"id":"infra-monitoring/infra-monitoring","title":"Infra Monitoring","description":"CubeAPM supports monitoring of popular infrastructure components, e.g., bare-metal/virtual-machines, Kubernetes, MySQL, MS SQL, Redis, Nginx, ElasticSearch, Kafka, and many more.","sidebar":"tutorialSidebar"},"infra-monitoring/kubernetes":{"id":"infra-monitoring/kubernetes","title":"Kubernetes","description":"The recommended setup for infra monitoring with CubeAPM is to use OpenTelemetry (OTel) Collector for collecting the metrics from host machines and sending them to CubeAPM. CubeAPM then provides visualization and alerting on the collected metrics.","sidebar":"tutorialSidebar"},"infra-monitoring/prometheus":{"id":"infra-monitoring/prometheus","title":"Prometheus Metrics","description":"CubeAPM can store Prometheus metrics. These metrics can the be used for any purpose in CubeAPM, e.g., building dashboards, setting up alerts, etc.","sidebar":"tutorialSidebar"},"infra-monitoring/varnish-cache":{"id":"infra-monitoring/varnish-cache","title":"Varnish Cache","description":"CubeAPM provides built-in dashboards for monitoring Varnish Cache. Since OpenTelemetry collector does not provide support for Varnish yet, CubeAPM Varnish dashboards are based on metrics generated by the Prometheus Varnish Exporter.","sidebar":"tutorialSidebar"},"Installation/configure/alerting_googlechat":{"id":"Installation/configure/alerting_googlechat","title":"Connect with Google Chat for alerting","description":"To send alert notifications to Google Chat, you need to create a Webhook in the Google Chat Space in which you want to receive notifications. The following steps guide you through the process:","sidebar":"tutorialSidebar"},"Installation/configure/alerting_pagerduty":{"id":"Installation/configure/alerting_pagerduty","title":"Connect with PagerDuty for alerting","description":"To enable sending alert notifications to PagerDuty, you need to create an app in your PagerDuty account. The following steps guide you through the process:","sidebar":"tutorialSidebar"},"Installation/configure/alerting_slack":{"id":"Installation/configure/alerting_slack","title":"Connect with Slack for alerting","description":"To enable sending alert notifications to Slack, you need to create an app in your Slack workspace. The following steps guide you through the process:","sidebar":"tutorialSidebar"},"Installation/configure/alerting_webhook":{"id":"Installation/configure/alerting_webhook","title":"Webhook for alerting","description":"CubeAPM supports sending alert notifications to arbitrary webhooks. You can specify any URL and CubeAPM will send alert notifications to that URL via HTTP POST request with JSON payload. You can also specify custom HTTP headers to be sent with the request.","sidebar":"tutorialSidebar"},"Installation/configure/configure":{"id":"Installation/configure/configure","title":"Configure CubeAPM","description":"CubeAPM can be configured through command line arguments, configuration file, or environment variables. In case of environment variables, please prefix (CUBE) and replace dots (.) and dashes (-) with underscores (``) in variable names. For example:","sidebar":"tutorialSidebar"},"Installation/configure/oauth_github":{"id":"Installation/configure/oauth_github","title":"Sign in with GitHub","description":"To enable Sign in with GitHub, you need to create a GitHub app in your GitHub organization. The following steps guide you through the process:","sidebar":"tutorialSidebar"},"Installation/configure/oauth_google":{"id":"Installation/configure/oauth_google","title":"Sign in with Google","description":"To enable Sign in with Google, you need to create an OAuth app in your Google Workspace account. The following steps guide you through the process:","sidebar":"tutorialSidebar"},"Installation/install/baremetal":{"id":"Installation/install/baremetal","title":"Bare Metal / Virtual Machine","description":"Run the following command. It downloads and executes the CubeAPM install script.","sidebar":"tutorialSidebar"},"Installation/install/docker":{"id":"Installation/install/docker","title":"Docker","description":"CubeAPM is also available as a Docker image. Run the following command to start CubeAPM in a Docker container.","sidebar":"tutorialSidebar"},"Installation/install/install":{"id":"Installation/install/install","title":"Install CubeAPM","description":"Supported Platforms","sidebar":"tutorialSidebar"},"Installation/install/kubernetes":{"id":"Installation/install/kubernetes","title":"Kubernetes","description":"CubeAPM can be deployed on Kubernetes using the official Helm charts.","sidebar":"tutorialSidebar"},"instrumentation/instrumentation":{"id":"instrumentation/instrumentation","title":"Instrumentation","description":"CubeAPM understands Open Telemetry Protocol (OTLP) natively. So it can be used to monitor applications written in a wide variety of programming languages/frameworks. We have documentation for connecting applications written in some of the most popular languages/frameworks in this section (see left sidebar). Documentation for a wider range of languages/frameworks is available on the official Open Telemetry website.","sidebar":"tutorialSidebar"},"instrumentation/java":{"id":"instrumentation/java","title":"Java","description":"Auto Instrumentation","sidebar":"tutorialSidebar"},"instrumentation/javascript-browser":{"id":"instrumentation/javascript-browser","title":"JavaScript (browser)","description":"Installation","sidebar":"tutorialSidebar"},"instrumentation/nodeJs-express":{"id":"instrumentation/nodeJs-express","title":"NodeJS Express","description":"Installation","sidebar":"tutorialSidebar"},"instrumentation/nodeJs-nest":{"id":"instrumentation/nodeJs-nest","title":"NodeJS Nest","description":"Installation","sidebar":"tutorialSidebar"},"instrumentation/php-laravel":{"id":"instrumentation/php-laravel","title":"PHP Laravel","description":"Prerequisites","sidebar":"tutorialSidebar"},"instrumentation/php-slim":{"id":"instrumentation/php-slim","title":"PHP Slim","description":"Prerequisites","sidebar":"tutorialSidebar"},"instrumentation/python-django-gunicorn":{"id":"instrumentation/python-django-gunicorn","title":"Python Django Gunicorn","description":"Prerequisites","sidebar":"tutorialSidebar"},"instrumentation/python-django-uwsgi":{"id":"instrumentation/python-django-uwsgi","title":"Python Django uWSGI","description":"Prerequisites","sidebar":"tutorialSidebar"},"instrumentation/python-fastapi-uvicorn":{"id":"instrumentation/python-fastapi-uvicorn","title":"Python FastAPI Uvicorn","description":"Prerequisites","sidebar":"tutorialSidebar"},"instrumentation/python-flask-gunicorn":{"id":"instrumentation/python-flask-gunicorn","title":"Python Flask Gunicorn","description":"Prerequisites","sidebar":"tutorialSidebar"},"instrumentation/python-flask-uwsgi":{"id":"instrumentation/python-flask-uwsgi","title":"Python Flask uWSGI","description":"Prerequisites","sidebar":"tutorialSidebar"},"instrumentation/python-sanic":{"id":"instrumentation/python-sanic","title":"Python Sanic","description":"As of Apr 2024, OpenTelemetry does not provide auto-instrumentation for Sanic. That said, a fully functional Sanic instrumentation can be achieved as follows.","sidebar":"tutorialSidebar"},"introduction":{"id":"introduction","title":"Introduction","description":"CubeAPM is an Application Performance Monitoring (APM) platform. It collects telemetry data from applications and infrastructure, and provides a UI for users to visualize and query the data. It also provides the ability to set up alerts based on the telemetry data, and sending notifications to users over various channels like Email, Slack, PagerDuty, Google Chat, etc.","sidebar":"tutorialSidebar"},"logs/ingestion/aws-ecs":{"id":"logs/ingestion/aws-ecs","title":"AWS ECS","description":"AWS ECS can send logs to external services using AWS FireLens, which is a wrapper over Fluentbit.","sidebar":"tutorialSidebar"},"logs/ingestion/aws-lambda":{"id":"logs/ingestion/aws-lambda","title":"AWS Lambda","description":"AWS Lambda can send logs to external services using lambda extension layers. We recommend using Datadog\'s lambda extension, as it provides good performance and is convenient to integrate as well.","sidebar":"tutorialSidebar"},"logs/ingestion/filebeat":{"id":"logs/ingestion/filebeat","title":"Filebeat","description":"Configure output.elasticsearch section in filebeat.yml as below:","sidebar":"tutorialSidebar"},"logs/ingestion/fluentbit":{"id":"logs/ingestion/fluentbit","title":"Fluentbit","description":"Loki","sidebar":"tutorialSidebar"},"logs/ingestion/fluentd":{"id":"logs/ingestion/fluentd","title":"Fluentd","description":"HTTP","sidebar":"tutorialSidebar"},"logs/ingestion/ingestion":{"id":"logs/ingestion/ingestion","title":"Ingestion","description":"CubeAPM receives logs data on the below endpoints. See the left sidebar for configuration using popular log shippers.","sidebar":"tutorialSidebar"},"logs/ingestion/kubernetes":{"id":"logs/ingestion/kubernetes","title":"Kubernetes","description":"Refer Infra Monitoring > Kubernetes.","sidebar":"tutorialSidebar"},"logs/logs":{"id":"logs/logs","title":"Logs","description":"CubeAPM supports aggregating logs from a wide range of agents - Elastic (Logstash, Fluent, etc.), Loki, OpenTelemetry, Vector, and more. It can ingest structured as well as unstructured logs.","sidebar":"tutorialSidebar"},"logs/querying":{"id":"logs/querying","title":"Querying","description":"Start by selecting the appropriate stream fields from the Filters section. Multiple values of the same stream fields are ORed together and values of different stream fields are ANDed, e.g. service IN (\\"order-service\\", \\"payment-service\\") AND env IN (\\"PROD\\").","sidebar":"tutorialSidebar"}}}')}}]);