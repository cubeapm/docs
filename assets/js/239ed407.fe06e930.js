"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[810],{4137:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>O});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=r.createContext({}),s=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=s(n),m=o,O=u["".concat(p,".").concat(m)]||u[m]||d[m]||a;return n?r.createElement(O,i(i({ref:t},c),{},{components:n})):r.createElement(O,i({ref:t},c))}));function O(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=m;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[u]="string"==typeof e?e:o,i[1]=l;for(var s=2;s<a;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},2772:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>d,frontMatter:()=>a,metadata:()=>l,toc:()=>s});var r=n(7462),o=(n(7294),n(4137));const a={id:"nodeJs",title:"NodeJS",slug:"/instrumentation/nodejs"},i=void 0,l={unversionedId:"instrumentation/nodeJs",id:"instrumentation/nodeJs",title:"NodeJS",description:"Installation",source:"@site/docs/instrumentation/nodeJS.md",sourceDirName:"instrumentation",slug:"/instrumentation/nodejs",permalink:"/instrumentation/nodejs",draft:!1,editUrl:"https://github.com/cubeapm/docs/docs/docs/instrumentation/nodeJS.md",tags:[],version:"current",frontMatter:{id:"nodeJs",title:"NodeJS",slug:"/instrumentation/nodejs"},sidebar:"tutorialSidebar",previous:{title:"Java",permalink:"/instrumentation/java"},next:{title:"PHP Slim",permalink:"/instrumentation/php-slim"}},p={},s=[{value:"Installation",id:"installation",level:2},{value:"Troubleshooting",id:"troubleshooting",level:2}],c={toc:s},u="wrapper";function d(e){let{components:t,...n}=e;return(0,o.kt)(u,(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"installation"},"Installation"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Install dependencies"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre"},"npm install --save @opentelemetry/auto-instrumentations-node@^0.38.0\n"))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Add the following environment variables:"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre"},'OTEL_METRICS_EXPORTER=none\nOTEL_TRACES_EXPORTER=otlp\nOTEL_EXPORTER_OTLP_TRACES_PROTOCOL=grpc\nOTEL_EXPORTER_OTLP_COMPRESSION=gzip\nOTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://<ip_address_of_cubeapm_server>:4317\nOTEL_SERVICE_NAME=<app_name>\nNODE_OPTIONS="--require @opentelemetry/auto-instrumentations-node/register"\n')),(0,o.kt)("p",{parentName:"li"},"For example, if the run command is ",(0,o.kt)("inlineCode",{parentName:"p"},"node injex.js"),", then change it to:"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre"},'OTEL_METRICS_EXPORTER=none \\\nOTEL_TRACES_EXPORTER=otlp \\\nOTEL_EXPORTER_OTLP_TRACES_PROTOCOL=grpc \\\nOTEL_EXPORTER_OTLP_COMPRESSION=gzip \\\nOTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://<ip_address_of_cubeapm_server>:4317 \\\nOTEL_SERVICE_NAME=<app_name> \\\nNODE_OPTIONS="--require @opentelemetry/auto-instrumentations-node/register" \\\nnode index.js\n')))),(0,o.kt)("h2",{id:"troubleshooting"},"Troubleshooting"),(0,o.kt)("p",null,"The following can be used for debugging:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"OTEL_LOG_LEVEL=debug\n")),(0,o.kt)("p",null,"The following command can be tried on the application host server to check connectivity to CubeAPM server(s):"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"telnet <ip_address_of_cubeapm_server> 4317\n")))}d.isMDXComponent=!0}}]);