"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[429],{4137:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>b});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),u=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=u(e.components);return r.createElement(s.Provider,{value:t},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,s=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),c=u(n),d=a,b=c["".concat(s,".").concat(d)]||c[d]||m[d]||l;return n?r.createElement(b,o(o({ref:t},p),{},{components:n})):r.createElement(b,o({ref:t},p))}));function b(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,o=new Array(l);o[0]=d;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[c]="string"==typeof e?e:a,o[1]=i;for(var u=2;u<l;u++)o[u]=n[u];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},4506:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>_,contentTitle:()=>P,default:()=>C,frontMatter:()=>w,metadata:()=>x,toc:()=>I});var r=n(7462),a=n(7294),l=n(4137),o=n(6010),i=n(2957),s=n(6550),u=n(5238),p=n(3609),c=n(2560);function m(e){return function(e){return a.Children.map(e,(e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:n,attributes:r,default:a}}=e;return{value:t,label:n,attributes:r,default:a}}))}function d(e){const{values:t,children:n}=e;return(0,a.useMemo)((()=>{const e=t??m(n);return function(e){const t=(0,p.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function b(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function f(e){let{queryString:t=!1,groupId:n}=e;const r=(0,s.k6)(),l=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,u._X)(l),(0,a.useCallback)((e=>{if(!l)return;const t=new URLSearchParams(r.location.search);t.set(l,e),r.replace({...r.location,search:t.toString()})}),[l,r])]}function h(e){const{defaultValue:t,queryString:n=!1,groupId:r}=e,l=d(e),[o,i]=(0,a.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!b({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const r=n.find((e=>e.default))??n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:l}))),[s,u]=f({queryString:n,groupId:r}),[p,m]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[r,l]=(0,c.Nk)(n);return[r,(0,a.useCallback)((e=>{n&&l.set(e)}),[n,l])]}({groupId:r}),h=(()=>{const e=s??p;return b({value:e,tabValues:l})?e:null})();(0,a.useLayoutEffect)((()=>{h&&i(h)}),[h]);return{selectedValue:o,selectValue:(0,a.useCallback)((e=>{if(!b({value:e,tabValues:l}))throw new Error(`Can't select invalid tab value=${e}`);i(e),u(e),m(e)}),[u,m,l]),tabValues:l}}var g=n(1048);const y={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function k(e){let{className:t,block:n,selectedValue:l,selectValue:s,tabValues:u}=e;const p=[],{blockElementScrollPositionUntilNextRender:c}=(0,i.o5)(),m=e=>{const t=e.currentTarget,n=p.indexOf(t),r=u[n].value;r!==l&&(c(t),s(r))},d=e=>{let t=null;switch(e.key){case"Enter":m(e);break;case"ArrowRight":{const n=p.indexOf(e.currentTarget)+1;t=p[n]??p[0];break}case"ArrowLeft":{const n=p.indexOf(e.currentTarget)-1;t=p[n]??p[p.length-1];break}}t?.focus()};return a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":n},t)},u.map((e=>{let{value:t,label:n,attributes:i}=e;return a.createElement("li",(0,r.Z)({role:"tab",tabIndex:l===t?0:-1,"aria-selected":l===t,key:t,ref:e=>p.push(e),onKeyDown:d,onClick:m},i,{className:(0,o.Z)("tabs__item",y.tabItem,i?.className,{"tabs__item--active":l===t})}),n??t)})))}function v(e){let{lazy:t,children:n,selectedValue:r}=e;const l=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=l.find((e=>e.props.value===r));return e?(0,a.cloneElement)(e,{className:"margin-top--md"}):null}return a.createElement("div",{className:"margin-top--md"},l.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==r}))))}function T(e){const t=h(e);return a.createElement("div",{className:(0,o.Z)("tabs-container",y.tabList)},a.createElement(k,(0,r.Z)({},e,t)),a.createElement(v,(0,r.Z)({},e,t)))}function N(e){const t=(0,g.Z)();return a.createElement(T,(0,r.Z)({key:String(t)},e))}const E={tabItem:"tabItem_Ymn6"};function O(e){let{children:t,hidden:n,className:r}=e;return a.createElement("div",{role:"tabpanel",className:(0,o.Z)(E.tabItem,r),hidden:n},t)}const w={id:"php-slim",title:"PHP Slim",slug:"/instrumentation/php-slim"},P=void 0,x={unversionedId:"instrumentation/php-slim",id:"instrumentation/php-slim",title:"PHP Slim",description:"Prerequisites",source:"@site/docs/instrumentation/php-slim.md",sourceDirName:"instrumentation",slug:"/instrumentation/php-slim",permalink:"/instrumentation/php-slim",draft:!1,editUrl:"https://github.com/cubeapm/docs/docs/docs/instrumentation/php-slim.md",tags:[],version:"current",frontMatter:{id:"php-slim",title:"PHP Slim",slug:"/instrumentation/php-slim"},sidebar:"tutorialSidebar",previous:{title:"NodeJS",permalink:"/instrumentation/nodejs"},next:{title:"Python Django Gunicorn",permalink:"/instrumentation/python-django-gunicorn"}},_={},I=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Installation",id:"installation",level:2},{value:"Troubleshooting",id:"troubleshooting",level:2}],S={toc:I},j="wrapper";function C(e){let{components:t,...n}=e;return(0,l.kt)(j,(0,r.Z)({},S,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"PHP 8.0+"),(0,l.kt)("li",{parentName:"ol"},"composer")),(0,l.kt)("h2",{id:"installation"},"Installation"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Add ",(0,l.kt)("inlineCode",{parentName:"p"},'"minimum-stability": "beta"')," to your composer.json to allow it to pick correct versions of OpenTelemetry packages. The composer.json will look like this:"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-javascript"},'{\n    "require": {\n        ...\n    },\n    "minimum-stability": "beta",\n    "config": {\n        ...\n    }\n}\n'))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Install the required dependencies:"),(0,l.kt)("ol",{parentName:"li"},(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Install the required tools:"),(0,l.kt)(N,{groupId:"operating-systems",mdxType:"Tabs"},(0,l.kt)(O,{value:"lin",label:"Linux",mdxType:"TabItem"},(0,l.kt)("pre",null,"sudo apt-get install php-pear php-dev libtool make gcc autoconf libz-dev zip")),(0,l.kt)(O,{value:"mac",label:"Mac",mdxType:"TabItem"},(0,l.kt)("pre",null,"brew install php libtool make gcc autoconf zlib zip")))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Build the extensions (can take upto 15 minutes):"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"pecl install grpc\npecl install opentelemetry-beta\npecl install protobuf\n"))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Add the extensions to your php.ini file:"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"[opentelemetry]\nextension=grpc.so\nextension=opentelemetry.so\nextension=protobuf.so\n"))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Verify that the extensions are installed and enabled (the following command should list all\nthe extensions we just installed):"),(0,l.kt)(N,{groupId:"operating-systems",mdxType:"Tabs"},(0,l.kt)(O,{value:"lin",label:"Linux",mdxType:"TabItem"},(0,l.kt)("pre",null,"php -m | grep -P 'grpc|opentelemetry|protobuf'")),(0,l.kt)(O,{value:"mac",label:"Mac",mdxType:"TabItem"},(0,l.kt)("pre",null,"php -m | grep -E 'grpc|opentelemetry|protobuf'")))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Add additional dependencies to your application:"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"composer config allow-plugins.php-http/discovery true\ncomposer require php-http/guzzle7-adapter \\\nopen-telemetry/sdk \\\nopen-telemetry/opentelemetry-auto-slim \\\ngrpc/grpc \\\nopen-telemetry/exporter-otlp \\\nopen-telemetry/transport-grpc \\\nopen-telemetry/opentelemetry-auto-psr15 \\\nopen-telemetry/opentelemetry-auto-psr18\n"))))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Modify the application run command as follows:"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"OTEL_PHP_AUTOLOAD_ENABLED=true \\\nOTEL_SERVICE_NAME=<app_name> \\\nOTEL_METRICS_EXPORTER=none \\\nOTEL_TRACES_EXPORTER=otlp \\\nOTEL_EXPORTER_OTLP_PROTOCOL=grpc \\\nOTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://<ip_address_of_cubeapm_server>:4317/opentelemetry.proto.collector.trace.v1.TraceService/Export \\\nOTEL_PROPAGATORS=baggage,tracecontext \\\nphp myapp.php\n")))),(0,l.kt)("p",null,"Data should now be visible in your CubeAPM account."),(0,l.kt)("h2",{id:"troubleshooting"},"Troubleshooting"),(0,l.kt)("p",null,"Traces exporter can be changed from ",(0,l.kt)("inlineCode",{parentName:"p"},"otlp")," to ",(0,l.kt)("inlineCode",{parentName:"p"},"console")," to output traces on console."),(0,l.kt)("p",null,"The following command can be tried on the application host server to check connectivity to CubeAPM server(s):"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"telnet <ip_address_of_cubeapm_server> 4317\n")))}C.isMDXComponent=!0}}]);