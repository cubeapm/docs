---
id: erlang
title: "Erlang/OTP"
slug: /instrumentation/opentelemetry/erlang
---

## Prerequisites

- Erlang/OTP 24 or later
- rebar3
- cowboy

## Installation

1. Add the following dependencies to your `rebar.config`:

   ```erlang
   {deps, [
       {opentelemetry_api, "~> 1.2"},
       {opentelemetry, "~> 1.4"},
       {opentelemetry_exporter, "~> 1.7"},
       {opentelemetry_cowboy, "~> 0.3"},
       {cowboy, "~> 2.10"}
   ]}.
   ```

2. Add OpenTelemetry applications to your `src/myapp.app.src`:

   ```erlang
    ...existing config params
     {applications,
      [kernel,
       stdlib,
       ssl,
       inets,
       tls_certificate_check,
       opentelemetry_api,
       opentelemetry,
       opentelemetry_exporter,
       opentelemetry_cowboy,
       cowboy
      ]},
      ...existing config params
   ```

## Configuration

1. Create or modify your `config/sys.config` with the following OpenTelemetry configuration:

   ```erlang
   [
     {opentelemetry, [
       {span_processor, batch},
       {traces_exporter, otlp}
     ]},

     % {traces_exporter, {otel_exporter_stdout, []}},  // enable this to export traces to stdout

     {opentelemetry_exporter, [
       {otlp_protocol, http_protobuf},
       {otlp_endpoint, "http://<ip_address_of_cubeapm_server>:4318"},
       {otlp_headers, []},
       {otlp_compression, gzip}
     ]},
     {kernel, [
       {logger, [
         {handler, default, logger_std_h,
          #{config => #{type => standard_io},
            formatter => {logger_formatter, #{}}}}
       ]}
     ]},
     {opentelemetry_api, [
       {resource, #{
         service => #{name => <<"my-erlang-service">>,
                      version => <<"0.1.0">>}
       }}
     ]},
     {ssl, [
       {verify, verify_none}
     ]},
     {httpc, [
       {profiles, [
         {default, [
           {keep_alive_timeout, 60000},
           {max_sessions, 10},
           {max_keep_alive_length, 10},
           {max_pipeline_length, 10}
         ]}
       ]}
     ]}
   ].
   ```

   **Important Configuration Parameters:**

   - `otlp_endpoint`: Replace `<ip_address_of_cubeapm_server>` with your CubeAPM server address
   - `service.name`: Set this to your application name for identification in CubeAPM
   - `service.version`: Set your application version
   - `otlp_compression`: Uses gzip compression for efficient data transfer

## Instrumentation

1. Add OpenTelemetry includes to your handler modules:

   ```erlang
   -module(handler).
   -include_lib("opentelemetry_api/include/otel_tracer.hrl").
   -include_lib("opentelemetry_api/include/opentelemetry.hrl").

   ```

2. Init Tracer:

```erlang
Add below line in init function to initialize tracer.
Tracer = opentelemetry:get_application_tracer(?MODULE),
```

3. Create spans in your handler functions:

```erlang
-export([init/2, handle/2]).

init(Req, State) ->
    ?with_span(<<"request_handler">>, #{}, fun() ->
        Method = cowboy_req:method(Req),
        Path = cowboy_req:path(Req),

        %% Add span attributes
        ?set_attribute(<<"http.method">>, Method),
        ?set_attribute(<<"http.path">>, Path),
        ?set_attribute(<<"custom.handler">>, <<"my_handler">>),

        handle_request(Req, State)
    end).

handle_request(Req, State) ->
    ?with_span(<<"business_logic">>, #{}, fun() ->
        %% Your business logic here
        Response = #{message => <<"Hello, World!">>},

        %% Add custom attributes
        ?set_attribute(<<"response.type">>, <<"json">>),

        cowboy_req:reply(200,
            #{<<"content-type">> => <<"application/json">>},
            jsx:encode(Response),
            Req)
    end),
    {ok, Req, State}.
```

1. For more complex operations, create nested spans:

   ```erlang
   process_data(Data) ->
       ?with_span(<<"data_processing">>, #{}, fun() ->
           %% First step
           ?with_span(<<"validation">>, #{}, fun() ->
               validate_data(Data)
           end),

           %% Second step
           ?with_span(<<"transformation">>, #{}, fun() ->
               transform_data(Data)
           end),

           %% Final step
           ?with_span(<<"storage">>, #{}, fun() ->
               store_data(Data)
           end)
       end).
   ```

### Spans Across Processes

When working with concurrent processes, you need to manually pass the span context:

```erlang
process_async(Data) ->
    SpanCtx = ?start_span(<<"async_operation">>),
    Ctx = otel_ctx:get_current(),

    proc_lib:spawn_link(fun() ->
        otel_ctx:attach(Ctx),
        ?set_current_span(SpanCtx),

        ?with_span(<<"worker_process">>, #{}, fun() ->
            %% Your async work here
            process_in_background(Data)
        end),

        ?end_span(SpanCtx)
    end).
```

## Starting the Application

1. Start your application with the configuration:

   ```shell
   rebar3 shell --config config/sys.config --eval "application:ensure_all_started(myapp)"
   ```

1.. Alternatively, you can set environment variables:

```shell
export OTEL_SERVICE_NAME="my-erlang-service"
export OTEL_EXPORTER_OTLP_ENDPOINT="http://<ip_address_of_cubeapm_server>:4318"
export OTEL_EXPORTER_OTLP_COMPRESSION=gzip

rebar3 shell --eval "application:ensure_all_started(myapp)"
```

## Sample Application

A complete working example is available at [https://github.com/cubeapm/sample-project-erlang](https://github.com/cubeapm/sample-project-erlang)

The sample includes:

- Complete rebar3 project setup
- OpenTelemetry configuration
- Cowboy web server with instrumented handlers
- Example of manual span creation and attributes

## Troubleshooting

1. **Enable Debug Logging:**

   Add debug logging to your `sys.config`:

   ```erlang
   {kernel, [
     {logger, [
       {handler, default, logger_std_h,
        #{level => debug,
          config => #{type => standard_io},
          formatter => {logger_formatter, #{}}}}
     ]}
   ]}
   ```

2. **Check Connectivity:**

   Verify connection to CubeAPM server:

   ```shell
   telnet <ip_address_of_cubeapm_server> 4318
   ```

3. **Common Issues:**
   - Ensure all OpenTelemetry applications are started before your application
   - Verify the CubeAPM server endpoint is correct and accessible
   - Check that SSL verification settings match your environment
   - Make sure the service name is properly configured for identification in CubeAPM

## Reference

- [OpenTelemetry Erlang Documentation](https://opentelemetry.io/docs/languages/erlang/)
- [OpenTelemetry Erlang GitHub](https://github.com/open-telemetry/opentelemetry-erlang)
- [Cowboy OpenTelemetry Instrumentation](https://github.com/open-telemetry/opentelemetry-erlang-contrib/tree/main/instrumentation/opentelemetry_cowboy)
