---
id: nodeJs
title: 'NodeJS'
slug: /nodeJs
---

## **Steps for configuring CubeAPM**

## **Installation**

1. Install dependencies:**

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

4. Modify the application run command to include the argument "```-r
path/to/tracing.js```". For example, if the run command is "```node index.js```", then
change it to "```node -r path/to/tracing.js index.js```". If you use pm2, you can add
this to ```node_args``` in pm2 config. For example:
```node_args: "-r path/to/tracing.js <any_other_args>"```
