---
id: nodeJs
title: 'NodeJS'
slug: /nodejs
---

## Steps to configure CubeAPM

### Installation

1. Create a new project directory 
    
   ```
    mkdir <project_name>
    cd <project_name>
    ```

1. Install dependencies

    First create an empty `package.json` file in the current directory:

    ```
    npm init -y
    ```
    Then install `Express` framework in Node.js project:

    ```
    npm install express
    ```

    Run the following commands to install the appropriate packages:

    ```
    npm install --save @opentelemetry/api
    npm install --save @opentelemetry/sdk-node
    npm install --save @opentelemetry/auto-instrumentations-node
    npm install --save @opentelemetry/exporter-trace-otlp-grpc
    ```

2. Download tracing.js.txt attachment from the email, rename it to tracing.js, and place it at
the root of your project directory.

3. Add the following environment variables:

    ```
    SPYK_APPNAME: <appname_to_identify_the_app_on_spyk_dashboard>
    SPYK_TOKEN: <spyk_token>
    ```

    Here's an example of how you can modify the script:

    ```
    export OTEL_TRACES_EXPORTER="otlp"
    export OTEL_METRICS_EXPORTER="otlp"
    export OTEL_EXPORTER_OTLP_ENDPOINT="your-endpoint" # Replace with your desired endpoint URL
    export OTEL_EXPORTER_OTLP_HEADERS="authorization=Bearer your-token" # Replace 'your-token' with your actual token value
    export OTEL_NODE_RESOURCE_DETECTORS="env,host,os"
    export OTEL_SERVICE_NAME="your-service-name"
    export NODE_OPTIONS="--require @opentelemetry/auto-instrumentations-node/register"
    node index.js
    ```

    Alternatively, the following environment variables can be set:

    ```
    env OTEL_TRACES_EXPORTER=otlp \
        OTEL_EXPORTER_OTLP_ENDPOINT=your-endpoint \
        OTEL_EXPORTER_OTLP_HEADERS="authorization=Bearer your-token" \
        OTEL_NODE_RESOURCE_DETECTORS="env,host,os" \
        OTEL_SERVICE_NAME=your-service-name \
        NODE_OPTIONS="--require @opentelemetry/auto-instrumentations-node/register" \
        node index.js
    ```


5. Modify the application run command to include the argument ```-r
path/to/tracing.js```. For example, if the run command is ```node index.js```, then
change it to ```node -r path/to/tracing.js index.js```. If you use pm2, you can add
this to ```node_args``` in pm2 config. For example:
```node_args: "-r path/to/tracing.js <any_other_args>"```
