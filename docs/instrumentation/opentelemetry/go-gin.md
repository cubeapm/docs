---
id: go-gin
title: "Go Gin"
slug: /instrumentation/opentelemetry/go-gin
---

## Prerequisites

Go 1.23+

## Installation

1. Create a file `otel.go` in your project directory with the following content:

   <details>
   <summary>otel.go</summary>
   ```go
    package main

    import (
	    "context"
	    "errors"
	    "os"
	    "time"

	    "go.opentelemetry.io/contrib/instrumentation/host"
	    "go.opentelemetry.io/contrib/instrumentation/runtime"
	    "go.opentelemetry.io/otel"
	    "go.opentelemetry.io/otel/attribute"
	    "go.opentelemetry.io/otel/exporters/otlp/otlpmetric/otlpmetrichttp"
	    "go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp"
	    "go.opentelemetry.io/otel/exporters/stdout/stdoutmetric"
	    "go.opentelemetry.io/otel/exporters/stdout/stdouttrace"
	    "go.opentelemetry.io/otel/propagation"
	    "go.opentelemetry.io/otel/sdk/metric"
	    "go.opentelemetry.io/otel/sdk/resource"
	    "go.opentelemetry.io/otel/sdk/trace"
	    semconv "go.opentelemetry.io/otel/semconv/v1.34.0"
    )

    // setupOTelSDK bootstraps the OpenTelemetry pipeline.
    // If it does not return an error, make sure to call shutdown for proper cleanup.
    func setupOTelSDK(ctx context.Context) (shutdown func(context.Context) error, err error) {
	    var shutdownFuncs []func(context.Context) error

	    // shutdown calls cleanup functions registered via shutdownFuncs.
	    // The errors from the calls are joined.
	    // Each registered cleanup will be invoked once.
	    shutdown = func(ctx context.Context) error {
		    var err error
		    for _, fn := range shutdownFuncs {
			    err = errors.Join(err, fn(ctx))
		    }
		    shutdownFuncs = nil
		    return err
	    }

	    // handleErr calls shutdown for cleanup and makes sure that all errors are returned.
	    handleErr := func(inErr error) {
		    err = errors.Join(inErr, shutdown(ctx))
	    }

	    // Set up propagator.
	    prop := newPropagator()
	    otel.SetTextMapPropagator(prop)

	    hostname, _ := os.Hostname()
	    res := resource.Default()
	    res = resource.NewWithAttributes(
		    res.SchemaURL(),
		    append(res.Attributes(), attribute.KeyValue{
			    Key:   semconv.HostNameKey,
			    Value: attribute.StringValue(hostname),
		    })...,
	    )

	    // Set up trace provider.
	    tracerProvider, err := newTraceProvider(ctx, res)
	    if err != nil {
		    handleErr(err)
		    return
	    }
	    shutdownFuncs = append(shutdownFuncs, tracerProvider.Shutdown)
	    otel.SetTracerProvider(tracerProvider)

	    // Set up meter provider.
	    meterProvider, err := newMeterProvider(ctx, res)
	    if err != nil {
		    handleErr(err)
		    return
	    }
	    shutdownFuncs = append(shutdownFuncs, meterProvider.Shutdown)
	    otel.SetMeterProvider(meterProvider)

	    err = host.Start()
	    if err != nil {
		    handleErr(err)
		    return
	    }
	    // enable deprecated runtime metrics to get garbage collection details
	    os.Setenv("OTEL_GO_X_DEPRECATED_RUNTIME_METRICS", "true")
	    err = runtime.Start(runtime.WithMeterProvider(meterProvider))
	    if err != nil {
		    handleErr(err)
		    return
	    }

	    return
    }

    func newPropagator() propagation.TextMapPropagator {
	    return propagation.NewCompositeTextMapPropagator(
		    propagation.TraceContext{},
		    propagation.Baggage{},
	    )
    }

    func newTraceProvider(ctx context.Context, res *resource.Resource) (*trace.TracerProvider, error) {
	    var traceExporter trace.SpanExporter
	    var err error
	    if os.Getenv("OTEL_LOG_LEVEL") == "debug" {
		    traceExporter, err = stdouttrace.New(
			    stdouttrace.WithPrettyPrint(),
		    )
	    } else {
		    traceExporter, err = otlptracehttp.New(ctx)
	    }
	    if err != nil {
		    return nil, err
	    }

	    traceProvider := trace.NewTracerProvider(
		    trace.WithResource(res),
		    trace.WithBatcher(traceExporter),
	    )
	    return traceProvider, nil
    }

    func newMeterProvider(ctx context.Context, res *resource.Resource) (*metric.MeterProvider, error) {
	    var metricExporter metric.Exporter
	    var err error
	    var opts []metric.PeriodicReaderOption
	    if os.Getenv("OTEL_LOG_LEVEL") == "debug" {
		    metricExporter, err = stdoutmetric.New(
			    stdoutmetric.WithPrettyPrint(),
		    )
		    // Default is 1m. Set to 10s to get output faster.
		    opts = append(opts, metric.WithInterval(10*time.Second))
	    } else {
		    metricExporter, err = otlpmetrichttp.New(ctx)
	    }
	    if err != nil {
		    return nil, err
	    }

	    meterProvider := metric.NewMeterProvider(
		    metric.WithResource(res),
		    metric.WithReader(
			    metric.NewPeriodicReader(metricExporter, opts...),
		    ),
	    )
	    return meterProvider, nil
    }
   ```
   </details>

1. Add the highlighted lines below to your project's `main.go` file:

   ```go
   package main

   # highlight-start
   import "go.opentelemetry.io/contrib/instrumentation/github.com/gin-gonic/gin/otelgin"
   # highlight-end

   func main() {
       ......
	   # highlight-start
	   // Handle SIGINT (CTRL+C)
	   ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt)
	   defer stop()

	   // Set up OpenTelemetry.
	   otelShutdown, err := setupOTelSDK(ctx)
	   if err != nil {
	   	return err
	   }
	   // Handle shutdown properly so nothing leaks.
	   defer func() {
       	err = errors.Join(err, otelShutdown(context.Background()))
	   }()
	   # highlight-end

       r := gin.Default()
	   # highlight-start
       router.Use(otelgin.Middleware(os.Getenv("OTEL_SERVICE_NAME")))
	   # highlight-end
       ......
   }
   ```
   :::info
   For more information, refer to the [OpenTelemetry Go documentation](https://opentelemetry.io/docs/languages/go/getting-started/).
   :::

1. Modify the application run command as follows:

   ```shell
   OTEL_LOGS_EXPORTER=none \
   OTEL_RESOURCE_ATTRIBUTES=cube.environment=UNSET,service.version=1.2.3,mykey1=myvalue1,mykey2=myvalue2 \
   OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://<ip_address_of_cubeapm_server>:4318/v1/traces \
   OTEL_EXPORTER_OTLP_METRICS_ENDPOINT=http://<ip_address_of_cubeapm_server>:3130/api/metrics/v1/save/otlp \
   OTEL_EXPORTER_OTLP_COMPRESSION=gzip \
   OTEL_SERVICE_NAME=<app_name> \
   go run main.go
   ```

### Sample App

A working example with multiple instrumentations is available at https://github.com/cubeapm/sample_app_go_gin/tree/otel

## Troubleshooting

The following can be used for debugging:

```shell
# print traces and metrics on console
OTEL_LOG_LEVEL=debug
```

The following command can be tried on the application host server to check connectivity to CubeAPM server(s):

```shell
telnet <ip_address_of_cubeapm_server> 4318
```
