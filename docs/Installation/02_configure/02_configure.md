---
slug: /install/configure-cubeapm
---

# Configure CubeAPM

Cube can be configured through command line arguments, configuration file, or environment variables. In case of environment variables, please prefix (`CUBE_`) and replace dots (`.`) and dashes (`-`) with underscores (`_`) in variable names. For example:

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

Cube provides reasonable defaults to configuration parameters wherever possible. However, some parameters do not have reasonable default values and therefore their values must be provided at the time of setup for Cube to start up. Following is a list of such parameters:

1. `token`
2. `smtp.url`
3. `database.url`
4. `auth.database.url`
5. `auth.key.session`
6. `auth.key.tokens`

In addition, the following configuration parameters have some default value, but it is quite likely that you may need to override them as per your environment for Cube to work properly.

1. `base-url`
2. `auth.sys-admins`
3. `cluster.peers`
4. `smtp.from`
5. `time-zone`

## Configuration Reference

Below is the list of all configuration parameters supported by CubeAPM, along with documentation and default values.

```shell
## CubeAPM configuration parameters


## Mandatory Parameters: CubeAPM will not start if any of these is not provided

# Account token obtained from CubeAPM. This token is used for authentication with CubeAPM.
token=

# URL of SMTP server for sending emails, e.g., reset password email, alert notifications.
# Example:
#  smtp.url=smtp://<username>:<password>@<mailserver>:25/?disable_starttls=false
smtp.url=

# URL of database for storing config data (settings, dashboards, etc.).
# Example:
#  database.url=mysql://<username>:<password>@tcp(<host>:3306)/<db_name>
#  database.url=postgres://<username>:<password>@<host>:5432/<db_name>?sslmode=disable
database.url=

# URL of database for storing user accounts data.
# Example:
#  auth.database.url=mysql://<username>:<password>@tcp(<host>:3306)/<db_name>
#  auth.database.url=postgres://<username>:<password>@<host>:5432/<db_name>?sslmode=disable
auth.database.url=

# Encryption key for session data. Must be 32 characters long. Can use hex encoded UUID without dashes.
auth.key.session=

# Encryption key for tokens. Must be 32 characters long. Can use hex encoded UUID without dashes.
auth.key.tokens=



## Important Parameters: You will quite likely need to set these as per your environment for CubeAPM to work properly.

# URL used by users to access Cube APM. This is used to generate URLs in emails and alerts.
# If you use reverse proxy and sub path specify full url (with sub path).
# Examples: http://cube.yourdomain.com, https://yourdomain.com/cube, http://10.0.0.1:3125
base-url=http://localhost:3125

# Comma separated list of email ids of users to be given sysadmin privilege.
auth.sys-admins=

# Comma separated list of all nodes in the cluster, e.g., 10.0.0.1,10.0.0.2,10.0.0.3. Leave empty for single node operation.
cluster.peers=

# Email address of sender. Your SMTP server must be configured to allow sending emails from this address.
smtp.from=no-reply@cubeapm.com

# Timezone of CubeAPM users. While most of the timezone related operations are done on the browser using browser's time zone setting, a few operations need to be performed on the server and they use this setting.
# Examples: America/Los_Angeles, Asia/Kolkata, UTC
time-zone=UTC



## Optional Parameters

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

# Disable the built-in demo trace generator
tracegen.disable=false

# Minimal allowed log Level. Supported values are debug, info, warn, and error.
log-level=warn



## Tuning Parameters

# Static files (e.g. graph images for alerts) retention period
files.retention=720h

# Metrics retention period. Must be between 24h0m0s and 1440h0m0s.
metrics.retention=720h

# Traces retention period. Must be between 1h0m0s and 720h0m0s.
traces.retention=72h



## Default values are generally good for the following parameters

# Host to bind http server on
http-host=0.0.0.0

# Port to bind http server on
http-port=3125

# Port to use for internal distribution of incoming traces data
cluster.port.distributor=3126

# Port to use for internal exchange of data between nodes for serving read requests
cluster.port.read=3127

# Port to use for internal exchange of data between nodes for maintaining cluster state
cluster.port.state=3129

# Port to use for internal exchange of data between nodes for serving write requests
cluster.port.write=3128

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

# Explicit address to advertise in cluster, e.g. 10.0.0.1. If not specified, CubeAPM will try to detect the address automatically.
cluster.advertise-address=

# By default, CubeAPM only uses private IP address as the advertise address. Set this flag to true to allow public IP addresses to be used.
cluster.allow-insecure-advertise=false

# Replication factor for the ingested data. Default is size_of_cluster/2 + 1
cluster.replication-factor=

# Tag name for environment.
# If set, the value of this tag in traces will be used as the value of env label in metrics. (default "")
collector.env-tag=cube.environment

# Comma separated list of allowed origins for CORS requests.
# Examples: "http://*.domain.com", "*"
collector.otlp.http.cors.origins=

# Path to config file for extending CubeAPM metrics with custom labels.
metrics.custom-labels-config-file=

# Metrics update interval. Must be between 500ms and 1m0s.
metrics.update-interval=15s

# Delay before shutdown. During this delay, health check returns non-OK responses so load balancers can route new requests to other servers.
shutdown-delay=0s

# Path to config file for creating custom indexes on traces.
traces.custom-indexes-config-file=


## End of CubeAPM configuration parameters
```
