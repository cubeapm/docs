"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[783],{4137:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>f});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=r.createContext({}),s=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,p=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),u=s(n),d=o,f=u["".concat(p,".").concat(d)]||u[d]||m[d]||a;return n?r.createElement(f,l(l({ref:t},c),{},{components:n})):r.createElement(f,l({ref:t},c))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,l=new Array(a);l[0]=d;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i[u]="string"==typeof e?e:o,l[1]=i;for(var s=2;s<a;s++)l[s]=n[s];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},121:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>m,frontMatter:()=>a,metadata:()=>i,toc:()=>s});var r=n(7462),o=(n(7294),n(4137));const a={id:"pythonflask",title:"Python Flask",slug:"/instrumentation/python-flask"},l=void 0,i={unversionedId:"instrumentation/pythonflask",id:"instrumentation/pythonflask",title:"Python Flask",description:"Prerequisites",source:"@site/docs/instrumentation/python-flask.md",sourceDirName:"instrumentation",slug:"/instrumentation/python-flask",permalink:"/instrumentation/python-flask",draft:!1,editUrl:"https://github.com/cubeapm/docs/docs/docs/instrumentation/python-flask.md",tags:[],version:"current",frontMatter:{id:"pythonflask",title:"Python Flask",slug:"/instrumentation/python-flask"},sidebar:"tutorialSidebar",previous:{title:"Python Django",permalink:"/instrumentation/python-django"}},p={},s=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Installation",id:"installation",level:2},{value:"Troubleshooting",id:"troubleshooting",level:2},{value:"Notes",id:"notes",level:2}],c={toc:s},u="wrapper";function m(e){let{components:t,...n}=e;return(0,o.kt)(u,(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,o.kt)("p",null,"Python 3"),(0,o.kt)("h2",{id:"installation"},"Installation"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Install dependencies:"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre"},"pip install opentelemetry-distro opentelemetry-exporter-otlp\nopentelemetry-bootstrap -a install\n"))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Modify the application run command as follows:"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre"},"opentelemetry-instrument \\\n    --metrics_exporter none \\\n    --traces_exporter otlp \\\n    --exporter_otlp_traces_endpoint http://<ip_address_of_cubeapm_server>:4317 \\\n    --exporter_otlp_compression gzip \\\n    --service_name <app_name> \\\n    flask run -p 8080\n")),(0,o.kt)("p",{parentName:"li"},"Alternatively, the following environment variables can be set:"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre"},"OTEL_METRICS_EXPORTER=none\nOTEL_TRACES_EXPORTER=otlp\nOTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://<ip_address_of_cubeapm_server>:4317\nOTEL_EXPORTER_OTLP_COMPRESSION=gzip\nOTEL_SERVICE_NAME=<app_name>\n")))),(0,o.kt)("h2",{id:"troubleshooting"},"Troubleshooting"),(0,o.kt)("p",null,"Traces exporter can be changed from ",(0,o.kt)("inlineCode",{parentName:"p"},"otlp")," to ",(0,o.kt)("inlineCode",{parentName:"p"},"console")," to output traces on console."),(0,o.kt)("p",null,"The following command can be tried on the application host server to check connectivity to CubeAPM server(s):"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"telnet <ip_address_of_cubeapm_server> 4317\n")),(0,o.kt)("h2",{id:"notes"},"Notes"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Additional steps need to be followed for setups with uWSGI/Gunicorn. Please follow the following resources:"),(0,o.kt)("ol",{parentName:"li"},(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("a",{parentName:"li",href:"https://opentelemetry-python.readthedocs.io/en/latest/examples/fork-process-model/README.html"},"https://opentelemetry-python.readthedocs.io/en/latest/examples/fork-process-model/README.html"))))))}m.isMDXComponent=!0}}]);