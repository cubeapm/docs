"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[484],{4137:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>d});var r=t(7294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var l=r.createContext({}),s=function(e){var n=r.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},c=function(e){var n=s(e.components);return r.createElement(l.Provider,{value:n},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},g=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),u=s(t),g=o,d=u["".concat(l,".").concat(g)]||u[g]||m[g]||i;return t?r.createElement(d,a(a({ref:n},c),{},{components:t})):r.createElement(d,a({ref:n},c))}));function d(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var i=t.length,a=new Array(i);a[0]=g;var p={};for(var l in n)hasOwnProperty.call(n,l)&&(p[l]=n[l]);p.originalType=e,p[u]="string"==typeof e?e:o,a[1]=p;for(var s=2;s<i;s++)a[s]=t[s];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}g.displayName="MDXCreateElement"},6734:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>m,frontMatter:()=>i,metadata:()=>p,toc:()=>s});var r=t(7462),o=(t(7294),t(4137));const i={id:"python-django-gunicorn",title:"Python Django Gunicorn",slug:"/instrumentation/python-django-gunicorn"},a=void 0,p={unversionedId:"instrumentation/python-django-gunicorn",id:"instrumentation/python-django-gunicorn",title:"Python Django Gunicorn",description:"Prerequisites",source:"@site/docs/instrumentation/python-django-gunicorn.md",sourceDirName:"instrumentation",slug:"/instrumentation/python-django-gunicorn",permalink:"/instrumentation/python-django-gunicorn",draft:!1,editUrl:"https://github.com/cubeapm/docs/docs/docs/instrumentation/python-django-gunicorn.md",tags:[],version:"current",frontMatter:{id:"python-django-gunicorn",title:"Python Django Gunicorn",slug:"/instrumentation/python-django-gunicorn"},sidebar:"tutorialSidebar",previous:{title:"PHP Slim",permalink:"/instrumentation/php-slim"},next:{title:"Python Django uWSGI",permalink:"/instrumentation/python-django-uwsgi"}},l={},s=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Installation",id:"installation",level:2},{value:"Troubleshooting",id:"troubleshooting",level:2}],c={toc:s},u="wrapper";function m(e){let{components:n,...t}=e;return(0,o.kt)(u,(0,r.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,o.kt)("p",null,"Python 3"),(0,o.kt)("h2",{id:"installation"},"Installation"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Install dependencies:"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"pip install opentelemetry-distro opentelemetry-exporter-otlp-proto-grpc\nopentelemetry-bootstrap -a install\n"))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Modify the gunicorn config file as follows:"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-python",metastring:'title="gunicorn.conf.py"',title:'"gunicorn.conf.py"'},'# highlight-start\nimport os\nfrom opentelemetry import trace\nfrom opentelemetry.sdk.trace import TracerProvider\nfrom opentelemetry.sdk.trace.export import (\n   BatchSpanProcessor,\n   ConsoleSpanExporter,\n   SimpleSpanProcessor,\n)\nfrom opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter\n# highlight-end\n\nbind = "127.0.0.1:8000"\n\n# Sample Worker processes\nworkers = 4\nworker_class = "sync"\nworker_connections = 1000\ntimeout = 30\nkeepalive = 2\n\n# Sample logging\nerrorlog = "-"\nloglevel = "info"\naccesslog = "-"\naccess_log_format = (\n   \'%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s"\'\n)\n\n# highlight-start\ndef post_fork(server, worker):\n   server.log.info("Worker spawned (pid: %s)", worker.pid)\n\n   provider = TracerProvider()\n   if os.getenv(\'OTEL_LOG_LEVEL\', \'\') == \'debug\':\n      processor = SimpleSpanProcessor(ConsoleSpanExporter())\n   else:\n      processor = BatchSpanProcessor(OTLPSpanExporter())\n   provider.add_span_processor(processor)\n   trace.set_tracer_provider(provider)\n# highlight-end\n'))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Add the highlighted lines below to your project's ",(0,o.kt)("inlineCode",{parentName:"p"},"wsgi.py")," file:"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-python",metastring:'title="wsgi.py"',title:'"wsgi.py"'},"import os\nfrom django.core.wsgi import get_wsgi_application\n# highlight-next-line\nfrom opentelemetry.instrumentation.django import DjangoInstrumentor\n\nos.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mysite.settings')\n\n# highlight-start\nDjangoInstrumentor().instrument()\n# Additional instrumentations can be enabled by\n# following the docs for respective instrumentations at\n# https://github.com/open-telemetry/opentelemetry-python-contrib/tree/main/instrumentation\n#\n# A working example with multiple instrumentations is available at\n# https://github.com/cubeapm/sample_app_python_django_gunicorn\n# highlight-end\n\napplication = get_wsgi_application()\n"))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Modify the application run command as follows:"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"DJANGO_SETTINGS_MODULE=<django_app_name>.settings \\\nOTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://<ip_address_of_cubeapm_server>:4317 \\\nOTEL_EXPORTER_OTLP_COMPRESSION=gzip \\\nOTEL_SERVICE_NAME=<app_name> \\\ngunicorn mysite.wsgi -c gunicorn.conf.py\n")))),(0,o.kt)("h2",{id:"troubleshooting"},"Troubleshooting"),(0,o.kt)("p",null,"The following can be used for debugging:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"OTEL_LOG_LEVEL=debug\n")),(0,o.kt)("p",null,"The following command can be tried on the application host server to check connectivity to CubeAPM server(s):"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"telnet <ip_address_of_cubeapm_server> 4317\n")))}m.isMDXComponent=!0}}]);