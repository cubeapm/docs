"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[182],{4137:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>y});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),s=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},m=function(e){var t=s(e.components);return r.createElement(l.Provider,{value:t},e.children)},c="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,m=i(e,["components","mdxType","originalType","parentName"]),c=s(n),d=o,y=c["".concat(l,".").concat(d)]||c[d]||u[d]||a;return n?r.createElement(y,p(p({ref:t},m),{},{components:n})):r.createElement(y,p({ref:t},m))}));function y(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,p=new Array(a);p[0]=d;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[c]="string"==typeof e?e:o,p[1]=i;for(var s=2;s<a;s++)p[s]=n[s];return r.createElement.apply(null,p)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},4435:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>p,default:()=>u,frontMatter:()=>a,metadata:()=>i,toc:()=>s});var r=n(7462),o=(n(7294),n(4137));const a={id:"python-django",title:"Python Django",slug:"/instrumentation/python-django"},p=void 0,i={unversionedId:"Instrumentation/python-django",id:"Instrumentation/python-django",title:"Python Django",description:"Steps to configure CubeAPM",source:"@site/docs/Instrumentation/python-django.md",sourceDirName:"Instrumentation",slug:"/instrumentation/python-django",permalink:"/instrumentation/python-django",draft:!1,editUrl:"https://github.com/cubeapm/docs/docs/docs/Instrumentation/python-django.md",tags:[],version:"current",frontMatter:{id:"python-django",title:"Python Django",slug:"/instrumentation/python-django"},sidebar:"tutorialSidebar",previous:{title:"PHP Slim",permalink:"/instrumentation/php-slim"},next:{title:"Python Flask",permalink:"/instrumentation/python-flask"}},l={},s=[{value:"Steps to configure CubeAPM",id:"steps-to-configure-cubeapm",level:2},{value:"Installation",id:"installation",level:3},{value:"Notes",id:"notes",level:3}],m={toc:s},c="wrapper";function u(e){let{components:t,...n}=e;return(0,o.kt)(c,(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"steps-to-configure-cubeapm"},"Steps to configure CubeAPM"),(0,o.kt)("h3",{id:"installation"},"Installation"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("h4",{parentName:"li",id:"prerequisites"},"Prerequisites:"),(0,o.kt)("p",{parentName:"li"},"Python 3")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Set up an environment in a new directory:"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre"},"mkdir <your_project_name>\ncd <your_project_name>\npython3 -m venv .\nsource ./bin/activate\n")),(0,o.kt)("p",{parentName:"li"},"Install django:"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre"},"python -m pip install Django\n"))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Install dependencies:"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre"},"pip install opentelemetry-distro opentelemetry-exporter-otlp\nopentelemetry-bootstrap -a install\n"))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Modify the application run command as follows:"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre"},"DJANGO_SETTINGS_MODULE=<django_app_name>.settings \\\nopentelemetry-instrument \\\n    --metrics_exporter none \\\n    --traces_exporter otlp \\\n    --exporter_otlp_traces_endpoint https://traces-ingest.spyk.ai:4317 \\\n    --exporter_otlp_headers authorization=Bearer%20<spyk_token> \\\n    --exporter_otlp_compression gzip \\\n    --service_name <app_name> \\\n    python manage.py runserver --noreload\n")),(0,o.kt)("p",{parentName:"li"},"Alternatively, the following environment variables can be set:"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre"},"DJANGO_SETTINGS_MODULE=<django_app_name>.settings\nOTEL_METRICS_EXPORTER=none\nOTEL_TRACES_EXPORTER=otlp\nOTEL_EXPORTER_OTLP_TRACES_ENDPOINT=https://traces-ingest.spyk.ai:4317\nOTEL_EXPORTER_OTLP_HEADERS=authorization=Bearer%20<spyk_token>\nOTEL_EXPORTER_OTLP_COMPRESSION=gzip\nOTEL_SERVICE_NAME=<app_name>\n")))),(0,o.kt)("h3",{id:"notes"},"Notes"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"DJANGO_SETTINGS_MODULE environment variable must be set even if configuring the\nintegration via command line parameters.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Additional steps need to be followed for setups with uWSGI/Gunicorn. Please follow the following resources:"),(0,o.kt)("ol",{parentName:"li"},(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("a",{parentName:"p",href:"https://opentelemetry-python.readthedocs.io/en/latest/examples/django/README.html#usage-with-auto-instrumentation-and-uwsgi"},"https://opentelemetry-python.readthedocs.io/en/latest/examples/django/README.html#usage-with-auto-instrumentation-and-uwsgi"))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("a",{parentName:"p",href:"https://opentelemetry-python.readthedocs.io/en/latest/examples/fork-process-model/README.html"},"https://opentelemetry-python.readthedocs.io/en/latest/examples/fork-process-model/README.html")))))))}u.isMDXComponent=!0}}]);