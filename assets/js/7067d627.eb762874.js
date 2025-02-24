"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[308],{777:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>u,default:()=>h,frontMatter:()=>i,metadata:()=>r,toc:()=>p});const r=JSON.parse('{"id":"instrumentation/php-slim","title":"PHP Slim","description":"Prerequisites","source":"@site/docs/instrumentation/php-slim.md","sourceDirName":"instrumentation","slug":"/instrumentation/php-slim","permalink":"/instrumentation/php-slim","draft":false,"unlisted":false,"editUrl":"https://github.com/cubeapm/docs/docs/docs/instrumentation/php-slim.md","tags":[],"version":"current","frontMatter":{"id":"php-slim","title":"PHP Slim","slug":"/instrumentation/php-slim"},"sidebar":"tutorialSidebar","previous":{"title":"PHP Laravel","permalink":"/instrumentation/php-laravel"},"next":{"title":"Python Django Gunicorn","permalink":"/instrumentation/python-django-gunicorn"}}');var l=t(4848),s=t(8453),a=t(1470),o=t(9365);const i={id:"php-slim",title:"PHP Slim",slug:"/instrumentation/php-slim"},u=void 0,c={},p=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Installation",id:"installation",level:2},{value:"Troubleshooting",id:"troubleshooting",level:2}];function d(e){const n={code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.h2,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsx)(n.li,{children:"PHP 8.0+"}),"\n",(0,l.jsx)(n.li,{children:"composer"}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsx)(n.p,{children:"Install the required dependencies:"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsx)(n.p,{children:"Install the required tools:"}),"\n",(0,l.jsxs)(a.A,{groupId:"operating-systems",children:[(0,l.jsx)(o.A,{value:"lin",label:"Linux",children:(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-shell",children:"sudo apt-get install php-pear php-dev libtool make gcc autoconf libz-dev zip\n"})})}),(0,l.jsx)(o.A,{value:"mac",label:"Mac",children:(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-shell",children:"brew install php libtool make gcc autoconf zlib zip\n"})})})]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsx)(n.p,{children:"Build the extensions:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-shell",children:"sudo pecl install opentelemetry\nsudo pecl install protobuf\n"})}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsx)(n.p,{children:"Add the extensions to your php.ini file:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-shell",children:"[opentelemetry]\nextension=opentelemetry.so\nextension=protobuf.so\n"})}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsx)(n.p,{children:"Verify that the extensions are installed and enabled:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-shell",children:"php --ri opentelemetry\nphp --ri protobuf\n"})}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsx)(n.p,{children:"Add additional dependencies to your application:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-shell",children:"composer config allow-plugins.php-http/discovery true\ncomposer require php-http/guzzle7-adapter \\\nopen-telemetry/sdk \\\nopen-telemetry/opentelemetry-auto-slim \\\nopen-telemetry/exporter-otlp \\\nopen-telemetry/opentelemetry-auto-psr15 \\\nopen-telemetry/opentelemetry-auto-psr18\n\n# Install instrumentation packages for libraries used in your project.\n# Visit the below link for a list of available instrumentation packages.\n# https://opentelemetry.io/ecosystem/registry/?component=instrumentation&language=php\n#\n#composer require open-telemetry/opentelemetry-auto-guzzle\n"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsx)(n.p,{children:"Modify the application run command as follows:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-shell",children:"OTEL_PHP_AUTOLOAD_ENABLED=true \\\nOTEL_SERVICE_NAME=<app_name> \\\nOTEL_METRICS_EXPORTER=none \\\nOTEL_LOGS_EXPORTER=none \\\nOTEL_TRACES_EXPORTER=otlp \\\nOTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf \\\nOTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://<ip_address_of_cubeapm_server>:4318/v1/traces \\\nOTEL_EXPORTER_OTLP_COMPRESSION=gzip \\\nOTEL_PROPAGATORS=baggage,tracecontext \\\nphp myapp.php\n"})}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:"Data should now be visible in your CubeAPM account."}),"\n",(0,l.jsx)(n.h2,{id:"troubleshooting",children:"Troubleshooting"}),"\n",(0,l.jsxs)(n.p,{children:["Traces exporter can be changed from ",(0,l.jsx)(n.code,{children:"otlp"})," to ",(0,l.jsx)(n.code,{children:"console"})," to output traces on console."]}),"\n",(0,l.jsx)(n.p,{children:"The following command can be tried on the application host server to check connectivity to CubeAPM server(s):"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-shell",children:"telnet <ip_address_of_cubeapm_server> 4318\n"})})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(d,{...e})}):d(e)}},1470:(e,n,t)=>{t.d(n,{A:()=>E});var r=t(6540),l=t(8215),s=t(3104),a=t(6347),o=t(205),i=t(7485),u=t(1682),c=t(679);function p(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function d(e){const{values:n,children:t}=e;return(0,r.useMemo)((()=>{const e=n??function(e){return p(e).map((e=>{let{props:{value:n,label:t,attributes:r,default:l}}=e;return{value:n,label:t,attributes:r,default:l}}))}(t);return function(e){const n=(0,u.XI)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function h(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function m(e){let{queryString:n=!1,groupId:t}=e;const l=(0,a.W6)(),s=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,i.aZ)(s),(0,r.useCallback)((e=>{if(!s)return;const n=new URLSearchParams(l.location.search);n.set(s,e),l.replace({...l.location,search:n.toString()})}),[s,l])]}function b(e){const{defaultValue:n,queryString:t=!1,groupId:l}=e,s=d(e),[a,i]=(0,r.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!h({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const r=t.find((e=>e.default))??t[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:n,tabValues:s}))),[u,p]=m({queryString:t,groupId:l}),[b,f]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[l,s]=(0,c.Dv)(t);return[l,(0,r.useCallback)((e=>{t&&s.set(e)}),[t,s])]}({groupId:l}),g=(()=>{const e=u??b;return h({value:e,tabValues:s})?e:null})();(0,o.A)((()=>{g&&i(g)}),[g]);return{selectedValue:a,selectValue:(0,r.useCallback)((e=>{if(!h({value:e,tabValues:s}))throw new Error(`Can't select invalid tab value=${e}`);i(e),p(e),f(e)}),[p,f,s]),tabValues:s}}var f=t(2303);const g={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var x=t(4848);function v(e){let{className:n,block:t,selectedValue:r,selectValue:a,tabValues:o}=e;const i=[],{blockElementScrollPositionUntilNextRender:u}=(0,s.a_)(),c=e=>{const n=e.currentTarget,t=i.indexOf(n),l=o[t].value;l!==r&&(u(n),a(l))},p=e=>{let n=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const t=i.indexOf(e.currentTarget)+1;n=i[t]??i[0];break}case"ArrowLeft":{const t=i.indexOf(e.currentTarget)-1;n=i[t]??i[i.length-1];break}}n?.focus()};return(0,x.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.A)("tabs",{"tabs--block":t},n),children:o.map((e=>{let{value:n,label:t,attributes:s}=e;return(0,x.jsx)("li",{role:"tab",tabIndex:r===n?0:-1,"aria-selected":r===n,ref:e=>{i.push(e)},onKeyDown:p,onClick:c,...s,className:(0,l.A)("tabs__item",g.tabItem,s?.className,{"tabs__item--active":r===n}),children:t??n},n)}))})}function j(e){let{lazy:n,children:t,selectedValue:s}=e;const a=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=a.find((e=>e.props.value===s));return e?(0,r.cloneElement)(e,{className:(0,l.A)("margin-top--md",e.props.className)}):null}return(0,x.jsx)("div",{className:"margin-top--md",children:a.map(((e,n)=>(0,r.cloneElement)(e,{key:n,hidden:e.props.value!==s})))})}function y(e){const n=b(e);return(0,x.jsxs)("div",{className:(0,l.A)("tabs-container",g.tabList),children:[(0,x.jsx)(v,{...n,...e}),(0,x.jsx)(j,{...n,...e})]})}function E(e){const n=(0,f.A)();return(0,x.jsx)(y,{...e,children:p(e.children)},String(n))}},8453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>o});var r=t(6540);const l={},s=r.createContext(l);function a(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:a(e.components),r.createElement(s.Provider,{value:n},e.children)}},9365:(e,n,t)=>{t.d(n,{A:()=>a});t(6540);var r=t(8215);const l={tabItem:"tabItem_Ymn6"};var s=t(4848);function a(e){let{children:n,hidden:t,className:a}=e;return(0,s.jsx)("div",{role:"tabpanel",className:(0,r.A)(l.tabItem,a),hidden:t,children:n})}}}]);