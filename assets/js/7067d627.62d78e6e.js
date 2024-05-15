"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[308],{4795:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>h,frontMatter:()=>o,metadata:()=>u,toc:()=>d});var r=t(4848),l=t(8453),s=t(9489),a=t(7227);const o={id:"php-slim",title:"PHP Slim",slug:"/instrumentation/php-slim"},i=void 0,u={id:"instrumentation/php-slim",title:"PHP Slim",description:"Prerequisites",source:"@site/docs/instrumentation/php-slim.md",sourceDirName:"instrumentation",slug:"/instrumentation/php-slim",permalink:"/instrumentation/php-slim",draft:!1,unlisted:!1,editUrl:"https://github.com/cubeapm/docs/docs/docs/instrumentation/php-slim.md",tags:[],version:"current",frontMatter:{id:"php-slim",title:"PHP Slim",slug:"/instrumentation/php-slim"},sidebar:"tutorialSidebar",previous:{title:"NodeJS",permalink:"/instrumentation/nodejs"},next:{title:"Python Django Gunicorn",permalink:"/instrumentation/python-django-gunicorn"}},c={},d=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Installation",id:"installation",level:2},{value:"Troubleshooting",id:"troubleshooting",level:2}];function p(e){const n={code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",...(0,l.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsx)(n.li,{children:"PHP 8.0+"}),"\n",(0,r.jsx)(n.li,{children:"composer"}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Install the required dependencies:"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Install the required tools:"}),"\n",(0,r.jsxs)(s.A,{groupId:"operating-systems",children:[(0,r.jsx)(a.A,{value:"lin",label:"Linux",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"sudo apt-get install php-pear php-dev libtool make gcc autoconf libz-dev zip\n"})})}),(0,r.jsx)(a.A,{value:"mac",label:"Mac",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"brew install php libtool make gcc autoconf zlib zip\n"})})})]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Build the extensions:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"sudo pecl install opentelemetry\nsudo pecl install protobuf\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Add the extensions to your php.ini file:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"[opentelemetry]\nextension=opentelemetry.so\nextension=protobuf.so\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Verify that the extensions are installed and enabled:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"php --ri opentelemetry\nphp --ri protobuf\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Add additional dependencies to your application:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"composer config allow-plugins.php-http/discovery true\ncomposer require php-http/guzzle7-adapter \\\nopen-telemetry/sdk \\\nopen-telemetry/opentelemetry-auto-slim \\\nopen-telemetry/exporter-otlp \\\nopen-telemetry/opentelemetry-auto-psr15 \\\nopen-telemetry/opentelemetry-auto-psr18\n"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Modify the application run command as follows:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"OTEL_PHP_AUTOLOAD_ENABLED=true \\\nOTEL_SERVICE_NAME=<app_name> \\\nOTEL_METRICS_EXPORTER=none \\\nOTEL_LOGS_EXPORTER=none \\\nOTEL_TRACES_EXPORTER=otlp \\\nOTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf \\\nOTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://<ip_address_of_cubeapm_server>:4318/v1/traces \\\nOTEL_EXPORTER_OTLP_COMPRESSION=gzip \\\nOTEL_PROPAGATORS=baggage,tracecontext \\\nphp myapp.php\n"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"Data should now be visible in your CubeAPM account."}),"\n",(0,r.jsx)(n.h2,{id:"troubleshooting",children:"Troubleshooting"}),"\n",(0,r.jsxs)(n.p,{children:["Traces exporter can be changed from ",(0,r.jsx)(n.code,{children:"otlp"})," to ",(0,r.jsx)(n.code,{children:"console"})," to output traces on console."]}),"\n",(0,r.jsx)(n.p,{children:"The following command can be tried on the application host server to check connectivity to CubeAPM server(s):"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"telnet <ip_address_of_cubeapm_server> 4318\n"})})]})}function h(e={}){const{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(p,{...e})}):p(e)}},7227:(e,n,t)=>{t.d(n,{A:()=>a});t(6540);var r=t(8215);const l={tabItem:"tabItem_Ymn6"};var s=t(4848);function a(e){let{children:n,hidden:t,className:a}=e;return(0,s.jsx)("div",{role:"tabpanel",className:(0,r.A)(l.tabItem,a),hidden:t,children:n})}},9489:(e,n,t)=>{t.d(n,{A:()=>E});var r=t(6540),l=t(8215),s=t(4245),a=t(6347),o=t(6494),i=t(2814),u=t(5167),c=t(1269);function d(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:n,children:t}=e;return(0,r.useMemo)((()=>{const e=n??function(e){return d(e).map((e=>{let{props:{value:n,label:t,attributes:r,default:l}}=e;return{value:n,label:t,attributes:r,default:l}}))}(t);return function(e){const n=(0,u.X)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function h(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function m(e){let{queryString:n=!1,groupId:t}=e;const l=(0,a.W6)(),s=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,i.aZ)(s),(0,r.useCallback)((e=>{if(!s)return;const n=new URLSearchParams(l.location.search);n.set(s,e),l.replace({...l.location,search:n.toString()})}),[s,l])]}function b(e){const{defaultValue:n,queryString:t=!1,groupId:l}=e,s=p(e),[a,i]=(0,r.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!h({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const r=t.find((e=>e.default))??t[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:n,tabValues:s}))),[u,d]=m({queryString:t,groupId:l}),[b,f]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[l,s]=(0,c.Dv)(t);return[l,(0,r.useCallback)((e=>{t&&s.set(e)}),[t,s])]}({groupId:l}),x=(()=>{const e=u??b;return h({value:e,tabValues:s})?e:null})();(0,o.A)((()=>{x&&i(x)}),[x]);return{selectedValue:a,selectValue:(0,r.useCallback)((e=>{if(!h({value:e,tabValues:s}))throw new Error(`Can't select invalid tab value=${e}`);i(e),d(e),f(e)}),[d,f,s]),tabValues:s}}var f=t(1062);const x={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var g=t(4848);function v(e){let{className:n,block:t,selectedValue:r,selectValue:a,tabValues:o}=e;const i=[],{blockElementScrollPositionUntilNextRender:u}=(0,s.a_)(),c=e=>{const n=e.currentTarget,t=i.indexOf(n),l=o[t].value;l!==r&&(u(n),a(l))},d=e=>{let n=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const t=i.indexOf(e.currentTarget)+1;n=i[t]??i[0];break}case"ArrowLeft":{const t=i.indexOf(e.currentTarget)-1;n=i[t]??i[i.length-1];break}}n?.focus()};return(0,g.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.A)("tabs",{"tabs--block":t},n),children:o.map((e=>{let{value:n,label:t,attributes:s}=e;return(0,g.jsx)("li",{role:"tab",tabIndex:r===n?0:-1,"aria-selected":r===n,ref:e=>i.push(e),onKeyDown:d,onClick:c,...s,className:(0,l.A)("tabs__item",x.tabItem,s?.className,{"tabs__item--active":r===n}),children:t??n},n)}))})}function j(e){let{lazy:n,children:t,selectedValue:l}=e;const s=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=s.find((e=>e.props.value===l));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return(0,g.jsx)("div",{className:"margin-top--md",children:s.map(((e,n)=>(0,r.cloneElement)(e,{key:n,hidden:e.props.value!==l})))})}function y(e){const n=b(e);return(0,g.jsxs)("div",{className:(0,l.A)("tabs-container",x.tabList),children:[(0,g.jsx)(v,{...e,...n}),(0,g.jsx)(j,{...e,...n})]})}function E(e){const n=(0,f.A)();return(0,g.jsx)(y,{...e,children:d(e.children)},String(n))}},8453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>o});var r=t(6540);const l={},s=r.createContext(l);function a(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:a(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);