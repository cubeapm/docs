"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[188],{4137:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>y});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),l=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=l(e.components);return r.createElement(s.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),u=l(n),d=a,y=u["".concat(s,".").concat(d)]||u[d]||m[d]||o;return n?r.createElement(y,i(i({ref:t},c),{},{components:n})):r.createElement(y,i({ref:t},c))}));function y(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p[u]="string"==typeof e?e:a,i[1]=p;for(var l=2;l<o;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},3465:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>p,toc:()=>l});var r=n(7462),a=(n(7294),n(4137));const o={id:"python-sanic",title:"Python Sanic",slug:"/instrumentation/python-sanic"},i=void 0,p={unversionedId:"instrumentation/python-sanic",id:"instrumentation/python-sanic",title:"Python Sanic",description:"As of Oct 2023, OpenTelemetry does not provide auto-instrumentation for Sanic. Still, basic instrumentation can be done as follows.",source:"@site/docs/instrumentation/python-sanic.md",sourceDirName:"instrumentation",slug:"/instrumentation/python-sanic",permalink:"/instrumentation/python-sanic",draft:!1,editUrl:"https://github.com/cubeapm/docs/docs/docs/instrumentation/python-sanic.md",tags:[],version:"current",frontMatter:{id:"python-sanic",title:"Python Sanic",slug:"/instrumentation/python-sanic"},sidebar:"tutorialSidebar",previous:{title:"Python Flask uWSGI",permalink:"/instrumentation/python-flask-uwsgi"}},s={},l=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Installation",id:"installation",level:2},{value:"Troubleshooting",id:"troubleshooting",level:2}],c={toc:l},u="wrapper";function m(e){let{components:t,...n}=e;return(0,a.kt)(u,(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"As of Oct 2023, OpenTelemetry does not provide auto-instrumentation for Sanic. Still, basic instrumentation can be done as follows."),(0,a.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,a.kt)("p",null,"Python 3"),(0,a.kt)("h2",{id:"installation"},"Installation"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Install dependencies:"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"pip install opentelemetry-distro opentelemetry-exporter-otlp-proto-grpc\nopentelemetry-bootstrap -a install\n"))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Create a file ",(0,a.kt)("inlineCode",{parentName:"p"},"tracing.py")," in your project directory, with the following content:"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-python",metastring:'title="tracing.py"',title:'"tracing.py"'},"import os\nfrom opentelemetry import trace, context\nfrom opentelemetry.semconv.trace import SpanAttributes\nfrom opentelemetry.propagate import extract\nfrom opentelemetry.sdk.trace import TracerProvider\nfrom opentelemetry.sdk.trace.export import (\n   BatchSpanProcessor,\n   ConsoleSpanExporter,\n   SimpleSpanProcessor,\n)\nfrom opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter\n\ndef instrument_app(app):\n   provider = TracerProvider()\n   if os.getenv('OTEL_LOG_LEVEL', '') == 'debug':\n      processor = SimpleSpanProcessor(ConsoleSpanExporter())\n   else:\n      processor = BatchSpanProcessor(OTLPSpanExporter())\n   provider.add_span_processor(processor)\n   trace.set_tracer_provider(provider)\n   tracer = trace.get_tracer(__name__)\n\n   _ENVIRON_SPAN_KEY = \"opentelemetry-sanic.span_key\"\n   _ENVIRON_ACTIVATION_KEY = \"opentelemetry-sanic.activation_key\"\n\n   @app.on_request\n   def on_before_request(req):\n      context.attach(extract(req.headers))\n      span = tracer.start_span(\n            req.endpoint,\n            kind=trace.SpanKind.SERVER,\n      )\n      activation = trace.use_span(span, end_on_exit=True)\n      activation.__enter__()\n      span.set_attribute(SpanAttributes.HTTP_METHOD, req.method)\n      span.set_attribute(SpanAttributes.HTTP_ROUTE, req.path)\n      req.ctx.tracing = {_ENVIRON_ACTIVATION_KEY: activation, _ENVIRON_SPAN_KEY: span}\n\n   @app.on_response\n   def on_after_request(req, res):\n      if hasattr(req.ctx, \"tracing\"):\n         req.ctx.tracing[_ENVIRON_SPAN_KEY].set_attribute(SpanAttributes.HTTP_STATUS_CODE, res.status)\n         req.ctx.tracing[_ENVIRON_ACTIVATION_KEY].__exit__(None,None,None)\n"))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Add the highlighted lines below to your project's main file:"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-python",metastring:'title="server.py"',title:'"server.py"'},'from sanic import Sanic\nfrom sanic.response import text\n# highlight-next-line\nfrom tracing import instrument_app\n\napp = Sanic("CubeAPMTestApp")\n# highlight-start\ninstrument_app(app)\n# Additional instrumentation can be enabled by\n# following the docs for respective instrumentations at\n# https://github.com/open-telemetry/opentelemetry-python-contrib/tree/main/instrumentation\n# highlight-end\n\n@app.get("/")\nasync def handler(request):\n   return text(str(request.id))\n'))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Modify the application run command as follows:"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://<ip_address_of_cubeapm_server>:4317 \\\nOTEL_EXPORTER_OTLP_COMPRESSION=gzip \\\nOTEL_SERVICE_NAME=<app_name> \\\nsanic server\n")))),(0,a.kt)("h2",{id:"troubleshooting"},"Troubleshooting"),(0,a.kt)("p",null,"The following can be used for debugging:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"OTEL_LOG_LEVEL=debug\n")),(0,a.kt)("p",null,"The following command can be tried on the application host server to check connectivity to CubeAPM server(s):"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"telnet <ip_address_of_cubeapm_server> 4317\n")))}m.isMDXComponent=!0}}]);