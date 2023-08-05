---
slug: /install/configure-cubeapm/
---

# Configure CubeAPM

Run `cube --help` to see a list of available configuration parameters, along with description and examples. Cube can be configured through command line arguments, configuration file, or environment variables. In case of environment variables, please prefix (`CUBE_`) and replace dots (`.`) and dashes (-) with underscores (`_`) in variable names. For example:

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
2. `database.url`
3. `smtp.url`
4. `auth.database.url`
5. `auth.key.session`
6. `auth.key.tokens`

In addition, the following configuration parameters have some default value, but it is quite likely that you may need to override them as per your environment for Cube to work properly.

1. `base-url`
2. `data-dir`
3. `smtp.from`
4. `auth.sys-admins`
