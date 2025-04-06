"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[9014],{1964:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>u,frontMatter:()=>s,metadata:()=>a,toc:()=>p});var r=t(4848),o=t(8453);const s={id:"python-sanic",title:"Python Sanic",slug:"/instrumentation/python-sanic"},i=void 0,a={id:"instrumentation/python-sanic",title:"Python Sanic",description:"As of Apr 2024, OpenTelemetry does not provide auto-instrumentation for Sanic. That said, a fully functional Sanic instrumentation can be achieved as follows.",source:"@site/docs/instrumentation/python-sanic.md",sourceDirName:"instrumentation",slug:"/instrumentation/python-sanic",permalink:"/instrumentation/python-sanic",draft:!1,unlisted:!1,editUrl:"https://github.com/cubeapm/docs/docs/docs/instrumentation/python-sanic.md",tags:[],version:"current",frontMatter:{id:"python-sanic",title:"Python Sanic",slug:"/instrumentation/python-sanic"},sidebar:"tutorialSidebar",previous:{title:"Python Flask uWSGI",permalink:"/instrumentation/python-flask-uwsgi"},next:{title:"Infra Monitoring",permalink:"/infra-monitoring"}},c={},p=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Installation",id:"installation",level:2},{value:"Troubleshooting",id:"troubleshooting",level:2}];function l(e){const n={code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",...(0,o.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.p,{children:"As of Apr 2024, OpenTelemetry does not provide auto-instrumentation for Sanic. That said, a fully functional Sanic instrumentation can be achieved as follows."}),"\n",(0,r.jsx)(n.h2,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,r.jsx)(n.p,{children:"Python 3"}),"\n",(0,r.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Install dependencies:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"pip install opentelemetry-distro opentelemetry-exporter-otlp-proto-http\nopentelemetry-bootstrap -a install\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["Create a file ",(0,r.jsx)(n.code,{children:"tracing.py"})," in your project directory, with the following content:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",metastring:'title="tracing.py"',children:"import os\nfrom opentelemetry import trace, context\nfrom opentelemetry.semconv.resource import ResourceAttributes\nfrom opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter\nfrom opentelemetry.propagate import extract\nfrom opentelemetry.sdk.trace import TracerProvider, Resource\nfrom opentelemetry.sdk.trace.export import (\n   BatchSpanProcessor,\n   ConsoleSpanExporter,\n   SimpleSpanProcessor,\n)\nfrom opentelemetry.semconv.trace import SpanAttributes\nfrom opentelemetry.trace.status import Status, StatusCode\nfrom sanic import HTTPResponse, Request, Sanic\nfrom socket import gethostname\n\ndef instrument_app(app: Sanic):\n   provider = TracerProvider(resource=Resource({\n      ResourceAttributes.SERVICE_NAME: os.environ['OTEL_SERVICE_NAME'],\n      ResourceAttributes.HOST_NAME: gethostname() or 'UNSET',\n   }))   \n   if os.getenv('OTEL_LOG_LEVEL', '') == 'debug':\n      processor = SimpleSpanProcessor(ConsoleSpanExporter())\n   else:\n      processor = BatchSpanProcessor(OTLPSpanExporter())\n   provider.add_span_processor(processor)\n   trace.set_tracer_provider(provider)\n   tracer = trace.get_tracer(__name__)\n\n   SPAN_KEY = 'span_key'\n   ACTIVATION_KEY = 'activation_key'\n\n   @app.on_request\n   async def on_request(req: Request):\n      context.attach(extract(req.headers))\n      span = tracer.start_span(\n            req.method + ' ' + (('/' + req.route.path) if req.route else req.path),\n            kind=trace.SpanKind.SERVER,\n      )\n      activation = trace.use_span(span, end_on_exit=True)\n      activation.__enter__()\n      span.set_attribute(SpanAttributes.HTTP_METHOD, req.method)\n      span.set_attribute(SpanAttributes.HTTP_ROUTE, req.path)\n      req.ctx.cubeapm = {ACTIVATION_KEY: activation, SPAN_KEY: span}\n\n   @app.on_response\n   async def on_response(req: Request, res: HTTPResponse):\n      if hasattr(req.ctx, 'cubeapm'):\n            req.ctx.cubeapm[SPAN_KEY].set_attribute(\n               SpanAttributes.HTTP_STATUS_CODE, res.status)\n            req.ctx.cubeapm[ACTIVATION_KEY].__exit__(None, None, None)\n\n   @app.signal('http.lifecycle.exception')\n   async def on_exception(request:  Request, exception: Exception):\n      if hasattr(request.ctx, 'cubeapm'):\n         request.ctx.cubeapm[SPAN_KEY].record_exception(exception)\n         request.ctx.cubeapm[SPAN_KEY].set_status(Status(StatusCode.ERROR))\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Add the highlighted lines below to your project's main file:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",metastring:'title="server.py"',children:'from sanic import Sanic\nfrom sanic.response import text\n# highlight-next-line\nfrom tracing import instrument_app\n\napp = Sanic("CubeAPMTestApp")\n# highlight-start\ninstrument_app(app)\n# Additional instrumentations can be enabled by\n# following the docs for respective instrumentations at\n# https://github.com/open-telemetry/opentelemetry-python-contrib/tree/main/instrumentation\n#\n# A working example with multiple instrumentations is available at\n# https://github.com/cubeapm/sample_app_python_sanic\n# highlight-end\n\n@app.get("/")\nasync def handler(request):\n   return text(str(request.id))\n'})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Modify the application run command as follows:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"OTEL_METRICS_EXPORTER=none \\\nOTEL_LOGS_EXPORTER=none \\\nOTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://<ip_address_of_cubeapm_server>:4318/v1/traces \\\nOTEL_EXPORTER_OTLP_COMPRESSION=gzip \\\nOTEL_SERVICE_NAME=<app_name> \\\nsanic server\n"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"troubleshooting",children:"Troubleshooting"}),"\n",(0,r.jsx)(n.p,{children:"The following can be used for debugging:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"OTEL_LOG_LEVEL=debug\n"})}),"\n",(0,r.jsx)(n.p,{children:"The following command can be tried on the application host server to check connectivity to CubeAPM server(s):"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"telnet <ip_address_of_cubeapm_server> 4318\n"})})]})}function u(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>i,x:()=>a});var r=t(6540);const o={},s=r.createContext(o);function i(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);