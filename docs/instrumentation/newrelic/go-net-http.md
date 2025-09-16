---
id: go-net-http
title: "Go Net/HTTP"
slug: /instrumentation/newrelic/go-net-http
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ProxySetup from './\_proxy_setup.mdx';

## Prerequisites

New Relic Go agent requires Golang 1.17+

## Installation

Following are the steps to install the New Relic agent and connect it with CubeAPM. If New Relic agent is already installed, you can jump to step 4.

1. Install dependencies

   ```shell
   go get github.com/newrelic/go-agent/v3/newrelic
   ```

1. Add the highlighted lines below to your project's `main.go` file:

   ```go
   package main

   # highlight-start
   import "github.com/newrelic/go-agent/v3/newrelic"
   # highlight-end

   var app *newrelic.Application

   func main() {
       # highlight-start
       // initialize newrelic
       app, err := newrelic.NewApplication(
		   newrelic.ConfigFromEnvironment(),
	    )
       # highlight-end

       // Start HTTP server.
	    srv := &http.Server{
		   Addr:         ":8000",
         # highlight-start
		   Handler:      newHTTPHandler(app),
         # highlight-end
	    }
   }

   func newHTTPHandler(app *newrelic.Application) http.Handler {
	    mux := http.NewServeMux()

	    handleFunc := func(pattern string, handlerFunc func(http.ResponseWriter, *http.Request)) {
           # highlight-start
           // Wrap the handler so New Relic can record metrics & traces
		     route, wrapped := newrelic.WrapHandleFunc(app, pattern, handlerFunc)
           # highlight-end
		     mux.HandleFunc(route, wrapped)
	    }

	    // Register handlers.
	    handleFunc("/", indexFunc)
	    return mux
   }
   ```
   :::info
   For more information, refer to the [NewRelic Go documentation](https://docs.newrelic.com/docs/apm/agents/go-agent/installation/install-new-relic-go/#get-new-relic).
   :::

1. Configure the agent.

   <Tabs>
      <TabItem value="env" label="Environment Variables">
         ```shell
         # Use `newrelic.ConfigFromEnvironment()` as shown in step 2 to load these environment variables.
         NEW_RELIC_APP_NAME=<app_name>
         NEW_RELIC_LICENSE_KEY=ABC4567890ABC4567890ABC4567890ABC4567890
         ```
      </TabItem>
      <TabItem value="file" label="Code">
         ```go
         func main() {
            # highlight-start
            // initialize newrelic
            app, err := newrelic.NewApplication(
		        newrelic.ConfigAppName("<app_name>"),
		        newrelic.ConfigLicense("ABC4567890ABC4567890ABC4567890ABC4567890"),
	         )
            # highlight-end
         }
         ```
      </TabItem>
   </Tabs>

1. <ProxySetup />

1. Tell the agent to connect with CubeAPM instead of New Relic:

   <Tabs>
      <TabItem value="env" label="Environment Variables">
         ```shell
         NEW_RELIC_APP_NAME=<app_name>
         NEW_RELIC_LICENSE_KEY=ABC4567890ABC4567890ABC4567890ABC4567890
         # highlight-start
         # Use your load balancer's domain name here
         NEW_RELIC_HOST=<cubeapm-newrelic.yourdomain.com>
         # highlight-end
         ```
      </TabItem>
      <TabItem value="file" label="Code">
         ```go
         func main() {
            // initialize newrelic
            app, err := newrelic.NewApplication(
		        newrelic.ConfigAppName("<app_name>"),
		        newrelic.ConfigLicense("ABC4567890ABC4567890ABC4567890ABC4567890"),
              # highlight-start
		        func(c *newrelic.Config) {
			        c.Host = "<cubeapm-newrelic.yourdomain.com>" // Use your load balancer's domain name here
		        },
              # highlight-end
	         )
         }
         ```
      </TabItem>
   </Tabs>

### Sample App

A working example with multiple instrumentations is available at https://github.com/cubeapm/sample_app_go_net_http/tree/newrelic

## Troubleshooting

The following can be used for debugging:

<Tabs>
   <TabItem value="env" label="Environment Variables">
      ```shell
      # Print New Relic agent logs on screen
      NEW_RELIC_LOG=stdout
      # Set New Relic agent log level to debug if needed to see detailed logs
      NEW_RELIC_LOG_LEVEL=debug
      ```
   </TabItem>
   <TabItem value="file" label="Code">
      ```go
      app, err := newrelic.NewApplication(
        newrelic.ConfigDebugLogger(os.Stdout),
	  )
      ```
   </TabItem>
</Tabs>