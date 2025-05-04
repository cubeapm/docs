---
slug: /install/configure-cubeapm
---

# Configure CubeAPM

CubeAPM can be configured through command line arguments, configuration file, or environment variables. In case of environment variables, please prefix (`CUBE_`) and replace dots (`.`) and dashes (`-`) with underscores (`_`) in variable names. For example:

```
# command line parameter
--metrics.update-interval 30s

# configuration file
metrics.update-interval=30s

# environment variable
CUBE_METRICS_UPDATE_INTERVAL=30s
```

If a parameter if specified through multiple means, the following order of preference applies (highest at top):

1. Command line arguments
2. Environment variables
3. Configuration file
4. Default values set in code

## Essential Configuration

CubeAPM provides reasonable defaults to configuration parameters wherever possible. However, some parameters do not have reasonable default values and therefore their values must be provided at the time of setup for CubeAPM to start up. Following is a list of such parameters:

1. `token`
2. `smtp.url`
3. `database.url`
4. `auth.database.url`
5. `auth.key.session`
6. `auth.key.tokens`

In addition, the following configuration parameters have some default value, but it is quite likely that you may need to override them as per your environment for CubeAPM to work properly.

1. `base-url`
2. `auth.sys-admins`
3. `cluster.peers`
4. `smtp.from`
5. `time-zone`

:::info
For security reasons, CubeAPM requires HTTPS. Hence, it needs to be deployed behind a load balancer or reverse proxy with SSL termination capability.

However, for ease of initial exploration, HTTP can be used with `localhost`/`127.0.0.1` only.

If you want to allow HTTP, set `auth.cookie.insecure=true` (see Configuration Reference below).
:::

## Configuration Reference

Below is the list of all configuration parameters supported by CubeAPM, along with documentation and default values.

```shell title="config.properties"
## CubeAPM configuration parameters


## Mandatory Parameters: CubeAPM will not start if any of these is not provided

# Account token obtained from CubeAPM. This token is used for authentication with CubeAPM.
token=

# Encryption key for session data. Must be 32 characters long. Can use hex encoded UUID without dashes.
auth.key.session=



## Important Parameters: You will quite likely need to set these as per your environment for CubeAPM to work properly.

# URL used by users to access CubeAPM. This is used to generate URLs in emails and alerts.
# If you use reverse proxy and sub path specify full url (with sub path).
# Examples: http://cube.yourdomain.com, https://yourdomain.com/cube, http://10.0.0.1:3125
base-url=http://localhost:3125

# Comma separated list of email ids of users to be given sysadmin privilege.
auth.sys-admins=

# Comma separated list of all nodes in the cluster, e.g., 10.0.0.1,10.0.0.2,10.0.0.3. Leave empty for single node operation.
cluster.peers=

# Timezone of CubeAPM users. While most of the timezone related operations are done on the browser using browser's time zone setting, a few operations need to be performed on the server and they use this setting.
# Examples: America/Los_Angeles, Asia/Kolkata, UTC
time-zone=UTC



## Optional Parameters

# URL of database for storing config data (settings, dashboards, etc.).
# Example:
#  database.url=mysql://<username>:<password>@tcp(<host>:3306)/<db_name>
#  database.url=postgres://<username>:<password>@<host>:5432/<db_name>?sslmode=disable
# Note: A-Za-z0-9.-_ characters are safe for use in password. Other characters can cause problems.
database.url=

# URL of database for storing user accounts data.
# Example:
#  auth.database.url=mysql://<username>:<password>@tcp(<host>:3306)/<db_name>
#  auth.database.url=postgres://<username>:<password>@<host>:5432/<db_name>?sslmode=disable
# Note: A-Za-z0-9.-_ characters are safe for use in password. Other characters can cause problems.
auth.database.url=

# Client ID for Sign in with GitHub
auth.oidc.github.client-id=

# Client secret for Sign in with GitHub
auth.oidc.github.client-secret=

# Client ID for Sign in with Google
auth.oidc.google.client-id=

# Client secret for Sign in with Google
auth.oidc.google.client-secret=

# App ID for sending alert notifications on PagerDuty.
alertmanager.oauth.pagerduty.app-id=

# Bot user OAuth token for sending alert notifications on Slack. Slack bot tokens start with 'xoxb'.
alertmanager.oauth.slack.token=

# Name of the site for sending alert notifications on Jira. If you access Jira on https://youraccountid.atlassian.net, the site name is youraccountid.
alertmanager.jira.site-name=

# API token for sending alert notifications on Jira.
alertmanager.jira.token=

# Expiry date of the Jira API token in YYYY-MM-DD format. Will be used to remind when the token is about to expire.
alertmanager.jira.token-expiry-date=

# Email address of Jira user for sending alert notifications on Jira.
alertmanager.jira.user-email=

# API tokens for sending alert notifications on Opsgenie.
# Format: team1:token1,team2:token2,...,teamN:tokenN
alertmanager.opsgenie.tokens=

# URL of SMTP server for sending emails, e.g., reset password email, alert notifications.
# Example:
#  smtp.url=smtp://<username>:<password>@<mailserver>:25/?disable_starttls=false
# Note: username and password must be url-encoded to escape any special characters.
smtp.url=

# Email address of sender. Your SMTP server must be configured to allow sending emails from this address.
smtp.from=no-reply@cubeapm.com

# Disable the built-in demo trace generator
tracegen.disable=false

# The number of concurrent workers. 0 means equal to number of available CPUs.
logs.backup.concurrency=0

# Path to file with GCS or S3 credentials. Credentials are loaded from default locations if not set.
# See https://docs.aws.amazon.com/general/latest/gr/aws-security-credentials.html and https://cloud.google.com/iam/docs/creating-managing-service-account-keys.
logs.backup.creds-file-path=

# Where to put the backup on the remote storage.
# Example: s3://bucket/path/to/backup, gs://bucket/path/to/backup, azblob://container/path/to/backup or fs:///path/to/local/backup/dir
logs.backup.destination=

# Path to file with S3 configs. Configs are loaded from default location if not set.
# See https://docs.aws.amazon.com/general/latest/gr/aws-security-credentials.html.
logs.backup.s3.config-file-path=

# Profile name for S3 configs. If no set, the value of the environment variable will be loaded (AWS_PROFILE or AWS_DEFAULT_PROFILE), or if both not set, DefaultSharedConfigProfile is used.
logs.backup.s3.config-profile=

# Custom S3 endpoint for use with S3-compatible storages (e.g. MinIO). S3 is used if not set.
logs.backup.s3.custom-endpoint=

# Prefixing endpoint with bucket name when set false.
logs.backup.s3.force-path-style=false

# The Storage Class applied to objects uploaded to AWS S3. Supported values are: GLACIER, DEEP_ARCHIVE, GLACIER_IR, INTELLIGENT_TIERING, ONEZONE_IA, OUTPOSTS, REDUCED_REDUNDANCY, STANDARD, STANDARD_IA.
# See https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html.
logs.backup.s3.storage-class=

# Minimal allowed log Level. Supported values are debug, info, warn, and error.
log-level=warn



## Tuning Parameters

# Logs retention period. Must be at least 24h.
logs.retention=24h

# Metrics retention period. Must be at least 24h.
metrics.retention=720h

# Traces retention period. Must be at least 24h.
traces.retention=72h

# Static files (e.g. javascript source maps) retention period
files.retention=720h

# Minimum query duration for labeling database queries as slow.
traces.slow-query-threshold=500ms

# Comma separated list of Datadog tags to be used as stream fields.
logs.datadog.stream-fields=

# Comma separated list of Datadog tags to ignore.
logs.datadog.ignore-fields=

# Comma separated list of New Relic tags to be used as stream fields.
logs.newrelic.stream-fields=service.name,faas.name

# Comma separated list of New Relic tags to ignore.
logs.newrelic.ignore-fields=



## Default values are generally good for the following parameters

# Host to bind http server on
http-host=0.0.0.0

# Port to bind http server on
http-port=3125

# Port to use for internal http communication between CubeAPM nodes
http-port-internal=3130

# Port to use for internal distribution of incoming traces data
cluster.port.distributor=3126

# Port to use for internal exchange of data between nodes for serving read requests
cluster.port.read=3127

# Port to use for internal exchange of data between nodes for maintaining cluster state
cluster.port.state=3129

# Port to use for internal exchange of data between nodes for serving write requests
cluster.port.write=3128

# Disable New Relic infinite tracing receiver
collector.nr.8t-disable=false

# Host to bind New Relic infinite tracing receiver on
collector.nr.8t-host=0.0.0.0

# Port to bind New Relic infinite tracing receiver on
collector.nr.8t-port=3124

# Disable OTLP grpc receiver
collector.otlp.grpc-disable=false

# Host to bind OTLP grpc receiver on
collector.otlp.grpc-host=0.0.0.0

# Port to bind OTLP grpc receiver on
collector.otlp.grpc-port=4317

# Disable OTLP http receiver
collector.otlp.http-disable=false

# Host to bind OTLP http receiver on
collector.otlp.http-host=0.0.0.0

# Port to bind OTLP http receiver on
collector.otlp.http-port=4318

# Disable charts in alert notifications
alertmanager.charts.disable=false



## Advanced Parameters: Changing values of these parameters can impact CubeAPM performance adversely, hence these should not be changed without consultation with CubeAPM support team

# Directory to store data in (default "./data")
data-dir=

# Tag name for environment.
# If set, the value of this tag in logs, metrics, and traces will be used to segragate them in the UI.
env-tag=cube.environment

# Path to config file for alerts.
alerts.config-file=

# Default role to be assigned to a new user on signup.
# Possible values are none, viewer, editor, admin.
auth.default-role=viewer

# Disable sign-up and sign-in using email/password
auth.method.email.disable=false

# Enable sign-up and sign-in using webauthn
auth.method.webauthn.enable=false

# Enforce Multi-Factor Authentication for all users
auth.mfa.enforce=false

# Disable self-service sign-up. Only admins will be able to add new users.
auth.selfservice.signup.disable=false

# Defines how long a session is active. Once that lifespan has been reached, the user needs to sign in again.
auth.session.lifespan=24h

# Explicit address to advertise in cluster, e.g. 10.0.0.1. If not specified, CubeAPM will try to detect the address automatically.
cluster.advertise-address=

# By default, CubeAPM only uses private IP address as the advertise address. Set this flag to true to allow public IP addresses to be used.
cluster.allow-insecure-advertise=false

# Replication factor for the ingested data. Default is size_of_cluster/2 + 1
cluster.replication-factor=

# [Deprecated] Use env-tag instead.
#collector.env-tag=cube.environment

# Comma separated list of allowed headers for CORS requests.
# Examples: "Content-Type,tracestate,traceparent", "Content-Type,X-My-Custom-Header"
collector.nr.cors.headers=Content-Type

# Comma separated list of allowed origins for CORS requests.
# Examples: "http://*.domain.com", "*"
collector.nr.cors.origins=*

# Comma separated list of allowed origins for CORS requests.
# Examples: "http://*.domain.com", "*"
collector.otlp.http.cors.origins=

# Percent error traces to sample. Zero means dynamic sampling, which provides good performance while ensuring at least some samples of every kind of error are saved.
collector.sampling.error-percent=0

# Path to config file for transforming ingested spans before further processing.
collector.span-transforms-config-file=

# Update HTTP client span name as per called service's name and route.
collector.span-transforms.enrich-http-client=false

# Access key for AWS CloudWatch integration via Amazon Data Firehose. If provided, CubeAPM will match the access key before accepting data from Amazon Data Firehose.
metrics.aws.data-firehose-access-key=

# Path to config file for extending CubeAPM metrics with custom labels.
metrics.custom-labels-config-file=

# Whether to enable infrastructure correlation.
metrics.infra-correlation.enable=false

# Whether to perfer HTTP status code description as error description in the reported metrics. By default, exception name is preferred and HTTP status code description is used if no exception occured.
metrics.prefer-http-status-as-error-desc=false

# Path to config file for SLOs (Service Level Objectives).
metrics.slo.config-file=

# Whether to treat HTTP 4xx response as error in the reported metrics.
metrics.treat-4xx-as-error=false

# Metrics update interval. Must be between 5s and 1m.
metrics.update-interval=30s

# Delay before shutdown. During this delay, health check returns non-OK responses so load balancers can route new requests to other servers.
shutdown-delay=0s

# Path to config file for creating custom indexes on traces.
traces.custom-indexes-config-file=


## End of CubeAPM configuration parameters
```
