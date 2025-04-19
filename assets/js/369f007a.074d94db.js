"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[37],{5003:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>Z,contentTitle:()=>I,default:()=>m,frontMatter:()=>c,metadata:()=>s,toc:()=>o});var l=n(4848),d=n(8453),a=n(9489),t=n(7227);const c={slug:"/instrumentation",sidebar_position:3},I="Instrumentation",s={id:"instrumentation/instrumentation",title:"Instrumentation",description:"CubeAPM understands Open Telemetry Protocol (OTLP) natively. So it can be used to monitor applications written in a wide variety of programming languages/frameworks. We have documentation for connecting applications written in some of the most popular languages/frameworks in this section (see left sidebar). Documentation for a wider range of languages/frameworks is available on the official Open Telemetry website.",source:"@site/docs/instrumentation/instrumentation.md",sourceDirName:"instrumentation",slug:"/instrumentation",permalink:"/instrumentation",draft:!1,unlisted:!1,editUrl:"https://github.com/cubeapm/docs/docs/docs/instrumentation/instrumentation.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{slug:"/instrumentation",sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Webhook for alerting",permalink:"/install/configure-cubeapm/webhook-for-alerting"},next:{title:"JavaScript (browser)",permalink:"/instrumentation/javascript-browser"}},Z={},o=[{value:"Using CubeAPM with New Relic agents",id:"using-cubeapm-with-new-relic-agents",level:2},{value:"Multi-environment setup",id:"multi-environment-setup",level:3},{value:"Troubleshooting",id:"troubleshooting",level:3},{value:"AWS Lambda",id:"aws-lambda",level:3},{value:"Infinite Tracing",id:"infinite-tracing",level:3},{value:"Minimum New Relic Agent version required for infinite tracing",id:"minimum-new-relic-agent-version-required-for-infinite-tracing",level:4}];function b(e){const i={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",img:"img",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,d.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(i.h1,{id:"instrumentation",children:"Instrumentation"}),"\n",(0,l.jsxs)(i.p,{children:["CubeAPM understands Open Telemetry Protocol (OTLP) natively. So it can be used to monitor applications written in a wide variety of programming languages/frameworks. We have documentation for connecting applications written in some of the most popular languages/frameworks in this section (see left sidebar). Documentation for a wider range of languages/frameworks is available on the official ",(0,l.jsx)(i.a,{href:"https://opentelemetry.io/docs/instrumentation/",children:"Open Telemetry website"}),"."]}),"\n",(0,l.jsx)(i.h2,{id:"using-cubeapm-with-new-relic-agents",children:"Using CubeAPM with New Relic agents"}),"\n",(0,l.jsx)(i.p,{children:"CubeAPM natively supports New Relic agents as well, i.e., CubeAPM can be used to monitor applications instrumented with New Relic agents as well. Here's how to use New Relic agents with CubeAPM:"}),"\n",(0,l.jsxs)(i.p,{children:["By default, New Relic agents send data to New Relic servers. However, if an environment variable ",(0,l.jsx)(i.code,{children:"NEW_RELIC_HOST"})," is found, the agents send data to the domain mentioned in this environment variable's value instead of sending to New Relic servers. Thus, by adding the environment variable ",(0,l.jsx)(i.code,{children:"NEW_RELIC_HOST=<domain_of_cubeapm_server>"})," to the application deployment setup, New Relic agent will send data to your CubeAPM servers instead of New Relic servers."]}),"\n",(0,l.jsx)(i.p,{children:"However, there is one more thing that needs to be taken care of. New Relic agents send data using HTTPS on port 443. However, CubeAPM expects data on port 3130 over HTTP. So, a load balancer (or HTTP reverse proxy) is needed to accept data on HTTPS/443 and forward to CubeAPM on HTTP/3130."}),"\n",(0,l.jsx)(i.p,{children:"That's it! New Relic agents can now be used to send data to CubeAPM."}),"\n",(0,l.jsx)(i.p,{children:(0,l.jsx)(i.img,{alt:"CubeAPM with New Relic",src:n(849).A+"",width:"421",height:"141"})}),"\n",(0,l.jsxs)(i.admonition,{type:"info",children:[(0,l.jsxs)(i.p,{children:["New Relic PHP agent does not support the NEW_RELIC_HOST environment variable. It needs setting the ",(0,l.jsx)(i.code,{children:"newrelic.daemon.collector_host"})," value in newrelic.ini instead."]}),(0,l.jsxs)(i.p,{children:["Also, while unrelated to CubeAPM, we highly recommend setting ",(0,l.jsx)(i.code,{children:"newrelic.transaction_tracer.detail = 0"})," in newrelic.ini. Without this, the New Relic PHP agent generates a lot of data which degrades application performance."]})]}),"\n",(0,l.jsxs)(i.admonition,{type:"info",children:[(0,l.jsxs)(i.p,{children:["New Relic Go agent does not read environment variables by default. ",(0,l.jsx)(i.code,{children:"newrelic.ConfigFromEnvironment()"})," needs to be added to ",(0,l.jsx)(i.code,{children:"newrelic.NewApplication()"})," as below."]}),(0,l.jsx)(i.pre,{children:(0,l.jsx)(i.code,{className:"language-go",children:"newrelic.NewApplication(\n    newrelic.ConfigFromEnvironment(),\n    ...\n)\n"})})]}),"\n",(0,l.jsx)(i.h3,{id:"multi-environment-setup",children:"Multi-environment setup"}),"\n",(0,l.jsx)(i.p,{children:"If you are using multi-environment feature of CubeAPM, you can set your application\u2019s environment name by setting the app name as per the below format:"}),"\n",(0,l.jsx)(i.pre,{children:(0,l.jsx)(i.code,{className:"language-shell",children:"# environment variable\nNEW_RELIC_APP_NAME=<application_name>[semicolon]<environment_name>\n\n# If the agent config file sets app_name as an array, then\n# set the app name as:\n# app_name: ['<application_name>', '<environment_name>']\n"})}),"\n",(0,l.jsx)(i.p,{children:"For example:"}),"\n",(0,l.jsx)(i.pre,{children:(0,l.jsx)(i.code,{className:"language-shell",children:"# environment variable\nNEW_RELIC_APP_NAME=order-service;sandbox\n\n# config file\n# app_name: ['order-service', 'sandbox']\n"})}),"\n",(0,l.jsx)(i.h3,{id:"troubleshooting",children:"Troubleshooting"}),"\n",(0,l.jsx)(i.p,{children:"The following command can be tried on the application host server to check connectivity to CubeAPM server(s):"}),"\n",(0,l.jsxs)(a.A,{groupId:"shells",children:[(0,l.jsx)(t.A,{value:"bash",label:"bash",children:(0,l.jsx)(i.pre,{children:(0,l.jsx)(i.code,{className:"language-shell",children:"curl -X POST -v -d '[]' 'https://<domain_of_cubeapm_server>/agent_listener/invoke_raw_method?marshal_format=json&protocol_version=17&method=preconnect' -H 'content-type: application/json'\n"})})}),(0,l.jsx)(t.A,{value:"powershell",label:"powershell",children:(0,l.jsx)(i.pre,{children:(0,l.jsx)(i.code,{className:"language-shell",children:"$uri = 'https://<domain_of_cubeapm_server>/agent_listener/invoke_raw_method?marshal_format=json&protocol_version=17&method=preconnect'\n$headers = @{\n    'content-type' = 'application/json'\n}\nInvoke-RestMethod -Uri $uri -Method Post -Headers $headers -Body '[]'\n"})})})]}),"\n",(0,l.jsxs)(i.p,{children:["Expected response: ",(0,l.jsx)(i.code,{children:"200 OK"})," with response message ",(0,l.jsx)(i.code,{children:'{"return_value":{"redirect_host":"<domain_of_cubeapm_server>"}}'})]}),"\n",(0,l.jsx)(i.h3,{id:"aws-lambda",children:"AWS Lambda"}),"\n",(0,l.jsxs)(i.p,{children:["For AWS Lambda, instead of setting ",(0,l.jsx)(i.code,{children:"NEW_RELIC_HOST"}),", set ",(0,l.jsx)(i.code,{children:"NEW_RELIC_TELEMETRY_ENDPOINT"})," as below in your Lambda environment variables."]}),"\n",(0,l.jsx)(i.pre,{children:(0,l.jsx)(i.code,{className:"language-shell",children:"NEW_RELIC_TELEMETRY_ENDPOINT=https://<domain_of_cubeapm_server>/newrelic/aws/lambda/v1\n\n# For multi-environment setup\nNEW_RELIC_TELEMETRY_ENDPOINT=https://<domain_of_cubeapm_server>/newrelic/aws/lambda/v1/env/<environment_name>\n"})}),"\n",(0,l.jsx)(i.h3,{id:"infinite-tracing",children:"Infinite Tracing"}),"\n",(0,l.jsxs)(i.p,{children:["Using New Relic's infinite tracing with CubeAPM is also easy. By adding the environment variable ",(0,l.jsx)(i.code,{children:"NEW_RELIC_INFINITE_TRACING_TRACE_OBSERVER_HOST=<domain_of_cubeapm_server>"})," (and optionally ",(0,l.jsx)(i.code,{children:"NEW_RELIC_INFINITE_TRACING_TRACE_OBSERVER_PORT=<desired_port>"}),") to the application deployment setup, New Relic agent will send infinite tracing data to your CubeAPM servers instead of New Relic servers. Note that NEW_RELIC_HOST is still required."]}),"\n",(0,l.jsx)(i.p,{children:"In case of infinite tracing, New Relic agents send data using gRPCS on port 443. However, CubeAPM expects data on port 3124 over gRPC. So, a load balancer (or gRPC reverse proxy) is needed to accept data on gRPCS/443 and forward to CubeAPM on gRPC/3124."}),"\n",(0,l.jsx)(i.p,{children:(0,l.jsx)(i.img,{alt:"CubeAPM with New Relic infinite tracing",src:n(5026).A+"",width:"421",height:"141"})}),"\n",(0,l.jsxs)(i.admonition,{type:"info",children:[(0,l.jsx)(i.p,{children:"In case of Python language, the following package also needs to be installed."}),(0,l.jsx)(i.p,{children:'pip install "newrelic[infinite-tracing]"'}),(0,l.jsxs)(i.p,{children:["Also, if you are using gevent, please check ",(0,l.jsx)(i.a,{href:"https://stackoverflow.com/questions/60957202/using-grpc-with-gevent",children:"https://stackoverflow.com/questions/60957202/using-grpc-with-gevent"})," for additional consideration."]})]}),"\n",(0,l.jsx)(i.admonition,{type:"info",children:(0,l.jsxs)(i.p,{children:["In case of Ruby language, please follow the guide here - ",(0,l.jsx)(i.a,{href:"https://docs.newrelic.com/docs/apm/agents/ruby-agent/configuration/distributed-tracing-ruby-agent/#configure-agent-inf",children:"https://docs.newrelic.com/docs/apm/agents/ruby-agent/configuration/distributed-tracing-ruby-agent/#configure-agent-inf"})]})}),"\n",(0,l.jsxs)(i.admonition,{type:"warning",children:[(0,l.jsxs)(i.p,{children:["Infinite tracing uses GRPC metadata. GRPC metadata is passed in http headers. By default, nginx drops headers with underscore in name, so if nginx is being used in the request path, it needs to be configured to allow underscores in headers - ",(0,l.jsx)(i.a,{href:"https://nginx.org/en/docs/http/ngx_http_core_module.html#underscores_in_headers",children:"https://nginx.org/en/docs/http/ngx_http_core_module.html#underscores_in_headers"})]}),(0,l.jsxs)(i.p,{children:["AWS Application Load Balancer (ALB) also drops headers with underscores if ",(0,l.jsx)(i.code,{children:"drop invalid header fields"})," is turned on."]})]}),"\n",(0,l.jsx)(i.h4,{id:"minimum-new-relic-agent-version-required-for-infinite-tracing",children:"Minimum New Relic Agent version required for infinite tracing"}),"\n",(0,l.jsxs)(i.table,{children:[(0,l.jsx)(i.thead,{children:(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.th,{children:"Language"}),(0,l.jsx)(i.th,{children:"Minimum Agent Version"})]})}),(0,l.jsxs)(i.tbody,{children:[(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{children:"Java"}),(0,l.jsx)(i.td,{children:"v8.3.0"})]}),(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{children:"NodeJS"}),(0,l.jsx)(i.td,{children:"v10.1.0"})]}),(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{children:"Python"}),(0,l.jsx)(i.td,{children:"v8.7.0"})]}),(0,l.jsxs)(i.tr,{children:[(0,l.jsx)(i.td,{children:"Ruby"}),(0,l.jsx)(i.td,{children:"v8.15.0"})]})]})]})]})}function m(e={}){const{wrapper:i}={...(0,d.R)(),...e.components};return i?(0,l.jsx)(i,{...e,children:(0,l.jsx)(b,{...e})}):b(e)}},7227:(e,i,n)=>{n.d(i,{A:()=>t});n(6540);var l=n(8215);const d={tabItem:"tabItem_Ymn6"};var a=n(4848);function t(e){let{children:i,hidden:n,className:t}=e;return(0,a.jsx)("div",{role:"tabpanel",className:(0,l.A)(d.tabItem,t),hidden:n,children:i})}},9489:(e,i,n)=>{n.d(i,{A:()=>j});var l=n(6540),d=n(8215),a=n(4245),t=n(6347),c=n(6494),I=n(2814),s=n(5167),Z=n(1269);function o(e){return l.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,l.isValidElement)(e)&&function(e){const{props:i}=e;return!!i&&"object"==typeof i&&"value"in i}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function b(e){const{values:i,children:n}=e;return(0,l.useMemo)((()=>{const e=i??function(e){return o(e).map((e=>{let{props:{value:i,label:n,attributes:l,default:d}}=e;return{value:i,label:n,attributes:l,default:d}}))}(n);return function(e){const i=(0,s.X)(e,((e,i)=>e.value===i.value));if(i.length>0)throw new Error(`Docusaurus error: Duplicate values "${i.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[i,n])}function m(e){let{value:i,tabValues:n}=e;return n.some((e=>e.value===i))}function g(e){let{queryString:i=!1,groupId:n}=e;const d=(0,t.W6)(),a=function(e){let{queryString:i=!1,groupId:n}=e;if("string"==typeof i)return i;if(!1===i)return null;if(!0===i&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:i,groupId:n});return[(0,I.aZ)(a),(0,l.useCallback)((e=>{if(!a)return;const i=new URLSearchParams(d.location.search);i.set(a,e),d.replace({...d.location,search:i.toString()})}),[a,d])]}function r(e){const{defaultValue:i,queryString:n=!1,groupId:d}=e,a=b(e),[t,I]=(0,l.useState)((()=>function(e){let{defaultValue:i,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(i){if(!m({value:i,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${i}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return i}const l=n.find((e=>e.default))??n[0];if(!l)throw new Error("Unexpected error: 0 tabValues");return l.value}({defaultValue:i,tabValues:a}))),[s,o]=g({queryString:n,groupId:d}),[r,G]=function(e){let{groupId:i}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(i),[d,a]=(0,Z.Dv)(n);return[d,(0,l.useCallback)((e=>{n&&a.set(e)}),[n,a])]}({groupId:d}),u=(()=>{const e=s??r;return m({value:e,tabValues:a})?e:null})();(0,c.A)((()=>{u&&I(u)}),[u]);return{selectedValue:t,selectValue:(0,l.useCallback)((e=>{if(!m({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);I(e),o(e),G(e)}),[o,G,a]),tabValues:a}}var G=n(1062);const u={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var h=n(4848);function p(e){let{className:i,block:n,selectedValue:l,selectValue:t,tabValues:c}=e;const I=[],{blockElementScrollPositionUntilNextRender:s}=(0,a.a_)(),Z=e=>{const i=e.currentTarget,n=I.indexOf(i),d=c[n].value;d!==l&&(s(i),t(d))},o=e=>{let i=null;switch(e.key){case"Enter":Z(e);break;case"ArrowRight":{const n=I.indexOf(e.currentTarget)+1;i=I[n]??I[0];break}case"ArrowLeft":{const n=I.indexOf(e.currentTarget)-1;i=I[n]??I[I.length-1];break}}i?.focus()};return(0,h.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,d.A)("tabs",{"tabs--block":n},i),children:c.map((e=>{let{value:i,label:n,attributes:a}=e;return(0,h.jsx)("li",{role:"tab",tabIndex:l===i?0:-1,"aria-selected":l===i,ref:e=>I.push(e),onKeyDown:o,onClick:Z,...a,className:(0,d.A)("tabs__item",u.tabItem,a?.className,{"tabs__item--active":l===i}),children:n??i},i)}))})}function W(e){let{lazy:i,children:n,selectedValue:d}=e;const a=(Array.isArray(n)?n:[n]).filter(Boolean);if(i){const e=a.find((e=>e.props.value===d));return e?(0,l.cloneElement)(e,{className:"margin-top--md"}):null}return(0,h.jsx)("div",{className:"margin-top--md",children:a.map(((e,i)=>(0,l.cloneElement)(e,{key:i,hidden:e.props.value!==d})))})}function w(e){const i=r(e);return(0,h.jsxs)("div",{className:(0,d.A)("tabs-container",u.tabList),children:[(0,h.jsx)(p,{...e,...i}),(0,h.jsx)(W,{...e,...i})]})}function j(e){const i=(0,G.A)();return(0,h.jsx)(w,{...e,children:o(e.children)},String(i))}},5026:(e,i,n)=>{n.d(i,{A:()=>l});const l="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSI0MjFweCIgaGVpZ2h0PSIxNDFweCIgdmlld0JveD0iLTAuNSAtMC41IDQyMSAxNDEiIGNsYXNzPSJnZS1leHBvcnQtc3ZnLWF1dG8iPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+QG1lZGlhIChwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyaykgeyYjeGE7c3ZnLmdlLWV4cG9ydC1zdmctYXV0bzpub3QobWp4LWNvbnRhaW5lciAmZ3Q7IHN2ZykgeyBmaWx0ZXI6IGludmVydCgxMDAlKSBodWUtcm90YXRlKDE4MGRlZyk7IH0mI3hhO3N2Zy5nZS1leHBvcnQtc3ZnLWF1dG8gZm9yZWlnbk9iamVjdCBpbWcsJiN4YTtzdmcuZ2UtZXhwb3J0LXN2Zy1hdXRvIGltYWdlOm5vdChzdmcuZ2UtZXhwb3J0LXN2Zy1hdXRvIHN3aXRjaCBpbWFnZSksJiN4YTtzdmcuZ2UtZXhwb3J0LXN2Zy1hdXRvIHN2Zzpub3QobWp4LWNvbnRhaW5lciAmZ3Q7IHN2ZykmI3hhO3sgZmlsdGVyOiBpbnZlcnQoMTAwJSkgaHVlLXJvdGF0ZSgxODBkZWcpIH0mI3hhO308L3N0eWxlPjwvZGVmcz48Zz48ZyBkYXRhLWNlbGwtaWQ9IjAiPjxnIGRhdGEtY2VsbC1pZD0iMSI+PGcgZGF0YS1jZWxsLWlkPSJuZ0IxbGkxNXdoZjhRNG51bnN5RC0xMiI+PGc+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjQyMCIgaGVpZ2h0PSIxNDAiIGZpbGw9InJnYigyNTUsIDI1NSwgMjU1KSIgc3Ryb2tlPSIjZmZmZmZmIiBwb2ludGVyLWV2ZW50cz0iYWxsIi8+PC9nPjwvZz48ZyBkYXRhLWNlbGwtaWQ9Im5nQjFsaTE1d2hmOFE0bnVuc3lELTEiPjxnPjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxMjAiIGZpbGw9InJnYigyNTUsIDI1NSwgMjU1KSIgc3Ryb2tlPSJyZ2IoMCwgMCwgMCkiIHBvaW50ZXItZXZlbnRzPSJhbGwiLz48L2c+PGc+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuNSAtMC41KSI+PHN3aXRjaD48Zm9yZWlnbk9iamVjdCBwb2ludGVyLWV2ZW50cz0ibm9uZSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgcmVxdWlyZWRGZWF0dXJlcz0iaHR0cDovL3d3dy53My5vcmcvVFIvU1ZHMTEvZmVhdHVyZSNFeHRlbnNpYmlsaXR5IiBzdHlsZT0ib3ZlcmZsb3c6IHZpc2libGU7IHRleHQtYWxpZ246IGxlZnQ7Ij48ZGl2IHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sIiBzdHlsZT0iZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IHVuc2FmZSBjZW50ZXI7IGp1c3RpZnktY29udGVudDogdW5zYWZlIGNlbnRlcjsgd2lkdGg6IDExOHB4OyBoZWlnaHQ6IDFweDsgcGFkZGluZy10b3A6IDcwcHg7IG1hcmdpbi1sZWZ0OiAxMXB4OyI+PGRpdiBkYXRhLWRyYXdpby1jb2xvcnM9ImNvbG9yOiByZ2IoMCwgMCwgMCk7ICIgc3R5bGU9ImJveC1zaXppbmc6IGJvcmRlci1ib3g7IGZvbnQtc2l6ZTogMHB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7Ij48ZGl2IHN0eWxlPSJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IGZvbnQtc2l6ZTogMTJweDsgZm9udC1mYW1pbHk6IEhlbHZldGljYTsgY29sb3I6IHJnYigwLCAwLCAwKTsgbGluZS1oZWlnaHQ6IDEuMjsgcG9pbnRlci1ldmVudHM6IGFsbDsgd2hpdGUtc3BhY2U6IG5vcm1hbDsgb3ZlcmZsb3ctd3JhcDogbm9ybWFsOyI+QXBwbGljYXRpb248L2Rpdj48L2Rpdj48L2Rpdj48L2ZvcmVpZ25PYmplY3Q+PHRleHQgeD0iNzAiIHk9Ijc0IiBmaWxsPSJyZ2IoMCwgMCwgMCkiIGZvbnQtZmFtaWx5PSImcXVvdDtIZWx2ZXRpY2EmcXVvdDsiIGZvbnQtc2l6ZT0iMTJweCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QXBwbGljYXRpb248L3RleHQ+PC9zd2l0Y2g+PC9nPjwvZz48L2c+PGcgZGF0YS1jZWxsLWlkPSJuZ0IxbGkxNXdoZjhRNG51bnN5RC0yIj48Zz48cmVjdCB4PSI3MCIgeT0iOTAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI0MCIgZmlsbD0icmdiKDI1NSwgMjU1LCAyNTUpIiBzdHJva2U9InJnYigwLCAwLCAwKSIgcG9pbnRlci1ldmVudHM9ImFsbCIvPjwvZz48Zz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMC41IC0wLjUpIj48c3dpdGNoPjxmb3JlaWduT2JqZWN0IHBvaW50ZXItZXZlbnRzPSJub25lIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiByZXF1aXJlZEZlYXR1cmVzPSJodHRwOi8vd3d3LnczLm9yZy9UUi9TVkcxMS9mZWF0dXJlI0V4dGVuc2liaWxpdHkiIHN0eWxlPSJvdmVyZmxvdzogdmlzaWJsZTsgdGV4dC1hbGlnbjogbGVmdDsiPjxkaXYgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwiIHN0eWxlPSJkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogdW5zYWZlIGNlbnRlcjsganVzdGlmeS1jb250ZW50OiB1bnNhZmUgY2VudGVyOyB3aWR0aDogNThweDsgaGVpZ2h0OiAxcHg7IHBhZGRpbmctdG9wOiAxMTBweDsgbWFyZ2luLWxlZnQ6IDcxcHg7Ij48ZGl2IGRhdGEtZHJhd2lvLWNvbG9ycz0iY29sb3I6IHJnYigwLCAwLCAwKTsgIiBzdHlsZT0iYm94LXNpemluZzogYm9yZGVyLWJveDsgZm9udC1zaXplOiAwcHg7IHRleHQtYWxpZ246IGNlbnRlcjsiPjxkaXYgc3R5bGU9ImRpc3BsYXk6IGlubGluZS1ibG9jazsgZm9udC1zaXplOiAxMnB4OyBmb250LWZhbWlseTogSGVsdmV0aWNhOyBjb2xvcjogcmdiKDAsIDAsIDApOyBsaW5lLWhlaWdodDogMS4yOyBwb2ludGVyLWV2ZW50czogYWxsOyB3aGl0ZS1zcGFjZTogbm9ybWFsOyBvdmVyZmxvdy13cmFwOiBub3JtYWw7Ij5OZXcgUmVsaWM8YnIgLz5BZ2VudDwvZGl2PjwvZGl2PjwvZGl2PjwvZm9yZWlnbk9iamVjdD48dGV4dCB4PSIxMDAiIHk9IjExNCIgZmlsbD0icmdiKDAsIDAsIDApIiBmb250LWZhbWlseT0iJnF1b3Q7SGVsdmV0aWNhJnF1b3Q7IiBmb250LXNpemU9IjEycHgiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5ldyBSZWxpYy4uLjwvdGV4dD48L3N3aXRjaD48L2c+PC9nPjwvZz48ZyBkYXRhLWNlbGwtaWQ9Im5nQjFsaTE1d2hmOFE0bnVuc3lELTQiPjxnPjxyZWN0IHg9IjE3MCIgeT0iMTAiIHdpZHRoPSI4MCIgaGVpZ2h0PSIxMjAiIGZpbGw9InJnYigyNTUsIDI1NSwgMjU1KSIgc3Ryb2tlPSJyZ2IoMCwgMCwgMCkiIHBvaW50ZXItZXZlbnRzPSJhbGwiLz48L2c+PGc+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuNSAtMC41KSI+PHN3aXRjaD48Zm9yZWlnbk9iamVjdCBwb2ludGVyLWV2ZW50cz0ibm9uZSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgcmVxdWlyZWRGZWF0dXJlcz0iaHR0cDovL3d3dy53My5vcmcvVFIvU1ZHMTEvZmVhdHVyZSNFeHRlbnNpYmlsaXR5IiBzdHlsZT0ib3ZlcmZsb3c6IHZpc2libGU7IHRleHQtYWxpZ246IGxlZnQ7Ij48ZGl2IHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sIiBzdHlsZT0iZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IHVuc2FmZSBjZW50ZXI7IGp1c3RpZnktY29udGVudDogdW5zYWZlIGNlbnRlcjsgd2lkdGg6IDc4cHg7IGhlaWdodDogMXB4OyBwYWRkaW5nLXRvcDogNzBweDsgbWFyZ2luLWxlZnQ6IDE3MXB4OyI+PGRpdiBkYXRhLWRyYXdpby1jb2xvcnM9ImNvbG9yOiByZ2IoMCwgMCwgMCk7ICIgc3R5bGU9ImJveC1zaXppbmc6IGJvcmRlci1ib3g7IGZvbnQtc2l6ZTogMHB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7Ij48ZGl2IHN0eWxlPSJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IGZvbnQtc2l6ZTogMTJweDsgZm9udC1mYW1pbHk6IEhlbHZldGljYTsgY29sb3I6IHJnYigwLCAwLCAwKTsgbGluZS1oZWlnaHQ6IDEuMjsgcG9pbnRlci1ldmVudHM6IGFsbDsgd2hpdGUtc3BhY2U6IG5vcm1hbDsgb3ZlcmZsb3ctd3JhcDogbm9ybWFsOyI+TG9hZDxiciAvPkJhbGFuY2VyPC9kaXY+PC9kaXY+PC9kaXY+PC9mb3JlaWduT2JqZWN0Pjx0ZXh0IHg9IjIxMCIgeT0iNzQiIGZpbGw9InJnYigwLCAwLCAwKSIgZm9udC1mYW1pbHk9IiZxdW90O0hlbHZldGljYSZxdW90OyIgZm9udC1zaXplPSIxMnB4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Mb2FkLi4uPC90ZXh0Pjwvc3dpdGNoPjwvZz48L2c+PC9nPjxnIGRhdGEtY2VsbC1pZD0ibmdCMWxpMTV3aGY4UTRudW5zeUQtNSI+PGc+PHJlY3QgeD0iMjkwIiB5PSIxMCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxMjAiIGZpbGw9InJnYigyNTUsIDI1NSwgMjU1KSIgc3Ryb2tlPSJyZ2IoMCwgMCwgMCkiIHBvaW50ZXItZXZlbnRzPSJhbGwiLz48L2c+PGc+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuNSAtMC41KSI+PHN3aXRjaD48Zm9yZWlnbk9iamVjdCBwb2ludGVyLWV2ZW50cz0ibm9uZSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgcmVxdWlyZWRGZWF0dXJlcz0iaHR0cDovL3d3dy53My5vcmcvVFIvU1ZHMTEvZmVhdHVyZSNFeHRlbnNpYmlsaXR5IiBzdHlsZT0ib3ZlcmZsb3c6IHZpc2libGU7IHRleHQtYWxpZ246IGxlZnQ7Ij48ZGl2IHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sIiBzdHlsZT0iZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IHVuc2FmZSBjZW50ZXI7IGp1c3RpZnktY29udGVudDogdW5zYWZlIGNlbnRlcjsgd2lkdGg6IDExOHB4OyBoZWlnaHQ6IDFweDsgcGFkZGluZy10b3A6IDcwcHg7IG1hcmdpbi1sZWZ0OiAyOTFweDsiPjxkaXYgZGF0YS1kcmF3aW8tY29sb3JzPSJjb2xvcjogcmdiKDAsIDAsIDApOyAiIHN0eWxlPSJib3gtc2l6aW5nOiBib3JkZXItYm94OyBmb250LXNpemU6IDBweDsgdGV4dC1hbGlnbjogY2VudGVyOyI+PGRpdiBzdHlsZT0iZGlzcGxheTogaW5saW5lLWJsb2NrOyBmb250LXNpemU6IDEycHg7IGZvbnQtZmFtaWx5OiBIZWx2ZXRpY2E7IGNvbG9yOiByZ2IoMCwgMCwgMCk7IGxpbmUtaGVpZ2h0OiAxLjI7IHBvaW50ZXItZXZlbnRzOiBhbGw7IHdoaXRlLXNwYWNlOiBub3JtYWw7IG92ZXJmbG93LXdyYXA6IG5vcm1hbDsiPkN1YmVBUE08L2Rpdj48L2Rpdj48L2Rpdj48L2ZvcmVpZ25PYmplY3Q+PHRleHQgeD0iMzUwIiB5PSI3NCIgZmlsbD0icmdiKDAsIDAsIDApIiBmb250LWZhbWlseT0iJnF1b3Q7SGVsdmV0aWNhJnF1b3Q7IiBmb250LXNpemU9IjEycHgiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkN1YmVBUE08L3RleHQ+PC9zd2l0Y2g+PC9nPjwvZz48L2c+PGcgZGF0YS1jZWxsLWlkPSJuZ0IxbGkxNXdoZjhRNG51bnN5RC02Ij48Zz48cGF0aCBkPSJNIDEzMCAxMTAgTCAxNjMuNjMgMTEwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYigwLCAwLCAwKSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBwb2ludGVyLWV2ZW50cz0ic3Ryb2tlIi8+PHBhdGggZD0iTSAxNjguODggMTEwIEwgMTYxLjg4IDExMy41IEwgMTYzLjYzIDExMCBMIDE2MS44OCAxMDYuNSBaIiBmaWxsPSJyZ2IoMCwgMCwgMCkiIHN0cm9rZT0icmdiKDAsIDAsIDApIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHBvaW50ZXItZXZlbnRzPSJhbGwiLz48L2c+PC9nPjxnIGRhdGEtY2VsbC1pZD0ibmdCMWxpMTV3aGY4UTRudW5zeUQtOSI+PGc+PHJlY3QgeD0iMTcwIiB5PSI5MCIgd2lkdGg9IjUwIiBoZWlnaHQ9IjQwIiBmaWxsPSJyZ2IoMjU1LCAyNTUsIDI1NSkiIHN0cm9rZT0icmdiKDAsIDAsIDApIiBwb2ludGVyLWV2ZW50cz0iYWxsIi8+PC9nPjxnPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjUgLTAuNSkiPjxzd2l0Y2g+PGZvcmVpZ25PYmplY3QgcG9pbnRlci1ldmVudHM9Im5vbmUiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHJlcXVpcmVkRmVhdHVyZXM9Imh0dHA6Ly93d3cudzMub3JnL1RSL1NWRzExL2ZlYXR1cmUjRXh0ZW5zaWJpbGl0eSIgc3R5bGU9Im92ZXJmbG93OiB2aXNpYmxlOyB0ZXh0LWFsaWduOiBsZWZ0OyI+PGRpdiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCIgc3R5bGU9ImRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiB1bnNhZmUgY2VudGVyOyBqdXN0aWZ5LWNvbnRlbnQ6IHVuc2FmZSBjZW50ZXI7IHdpZHRoOiA0OHB4OyBoZWlnaHQ6IDFweDsgcGFkZGluZy10b3A6IDExMHB4OyBtYXJnaW4tbGVmdDogMTcxcHg7Ij48ZGl2IGRhdGEtZHJhd2lvLWNvbG9ycz0iY29sb3I6IHJnYigwLCAwLCAwKTsgIiBzdHlsZT0iYm94LXNpemluZzogYm9yZGVyLWJveDsgZm9udC1zaXplOiAwcHg7IHRleHQtYWxpZ246IGNlbnRlcjsiPjxkaXYgc3R5bGU9ImRpc3BsYXk6IGlubGluZS1ibG9jazsgZm9udC1zaXplOiAxMnB4OyBmb250LWZhbWlseTogSGVsdmV0aWNhOyBjb2xvcjogcmdiKDAsIDAsIDApOyBsaW5lLWhlaWdodDogMS4yOyBwb2ludGVyLWV2ZW50czogYWxsOyB3aGl0ZS1zcGFjZTogbm9ybWFsOyBvdmVyZmxvdy13cmFwOiBub3JtYWw7Ij5nUlBDUzxiciAvPjQ0MzwvZGl2PjwvZGl2PjwvZGl2PjwvZm9yZWlnbk9iamVjdD48dGV4dCB4PSIxOTUiIHk9IjExNCIgZmlsbD0icmdiKDAsIDAsIDApIiBmb250LWZhbWlseT0iJnF1b3Q7SGVsdmV0aWNhJnF1b3Q7IiBmb250LXNpemU9IjEycHgiIHRleHQtYW5jaG9yPSJtaWRkbGUiPmdSUENTLi4uPC90ZXh0Pjwvc3dpdGNoPjwvZz48L2c+PC9nPjxnIGRhdGEtY2VsbC1pZD0ibmdCMWxpMTV3aGY4UTRudW5zeUQtMTAiPjxnPjxyZWN0IHg9IjI5MCIgeT0iOTAiIHdpZHRoPSI1MCIgaGVpZ2h0PSI0MCIgZmlsbD0icmdiKDI1NSwgMjU1LCAyNTUpIiBzdHJva2U9InJnYigwLCAwLCAwKSIgcG9pbnRlci1ldmVudHM9ImFsbCIvPjwvZz48Zz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMC41IC0wLjUpIj48c3dpdGNoPjxmb3JlaWduT2JqZWN0IHBvaW50ZXItZXZlbnRzPSJub25lIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiByZXF1aXJlZEZlYXR1cmVzPSJodHRwOi8vd3d3LnczLm9yZy9UUi9TVkcxMS9mZWF0dXJlI0V4dGVuc2liaWxpdHkiIHN0eWxlPSJvdmVyZmxvdzogdmlzaWJsZTsgdGV4dC1hbGlnbjogbGVmdDsiPjxkaXYgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwiIHN0eWxlPSJkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogdW5zYWZlIGNlbnRlcjsganVzdGlmeS1jb250ZW50OiB1bnNhZmUgY2VudGVyOyB3aWR0aDogNDhweDsgaGVpZ2h0OiAxcHg7IHBhZGRpbmctdG9wOiAxMTBweDsgbWFyZ2luLWxlZnQ6IDI5MXB4OyI+PGRpdiBkYXRhLWRyYXdpby1jb2xvcnM9ImNvbG9yOiByZ2IoMCwgMCwgMCk7ICIgc3R5bGU9ImJveC1zaXppbmc6IGJvcmRlci1ib3g7IGZvbnQtc2l6ZTogMHB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7Ij48ZGl2IHN0eWxlPSJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IGZvbnQtc2l6ZTogMTJweDsgZm9udC1mYW1pbHk6IEhlbHZldGljYTsgY29sb3I6IHJnYigwLCAwLCAwKTsgbGluZS1oZWlnaHQ6IDEuMjsgcG9pbnRlci1ldmVudHM6IGFsbDsgd2hpdGUtc3BhY2U6IG5vcm1hbDsgb3ZlcmZsb3ctd3JhcDogbm9ybWFsOyI+Z1JQQzxiciAvPjMxMjQ8L2Rpdj48L2Rpdj48L2Rpdj48L2ZvcmVpZ25PYmplY3Q+PHRleHQgeD0iMzE1IiB5PSIxMTQiIGZpbGw9InJnYigwLCAwLCAwKSIgZm9udC1mYW1pbHk9IiZxdW90O0hlbHZldGljYSZxdW90OyIgZm9udC1zaXplPSIxMnB4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5nUlBDLi4uPC90ZXh0Pjwvc3dpdGNoPjwvZz48L2c+PC9nPjxnIGRhdGEtY2VsbC1pZD0ibmdCMWxpMTV3aGY4UTRudW5zeUQtMTEiPjxnPjxwYXRoIGQ9Ik0gMjUwIDEwOS41IEwgMjgzLjYzIDEwOS41IiBmaWxsPSJub25lIiBzdHJva2U9InJnYigwLCAwLCAwKSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBwb2ludGVyLWV2ZW50cz0ic3Ryb2tlIi8+PHBhdGggZD0iTSAyODguODggMTA5LjUgTCAyODEuODggMTEzIEwgMjgzLjYzIDEwOS41IEwgMjgxLjg4IDEwNiBaIiBmaWxsPSJyZ2IoMCwgMCwgMCkiIHN0cm9rZT0icmdiKDAsIDAsIDApIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHBvaW50ZXItZXZlbnRzPSJhbGwiLz48L2c+PC9nPjwvZz48L2c+PC9nPjwvc3ZnPg=="},849:(e,i,n)=>{n.d(i,{A:()=>l});const l="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSI0MjFweCIgaGVpZ2h0PSIxNDFweCIgdmlld0JveD0iLTAuNSAtMC41IDQyMSAxNDEiIGNsYXNzPSJnZS1leHBvcnQtc3ZnLWF1dG8iPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+QG1lZGlhIChwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyaykgeyYjeGE7c3ZnLmdlLWV4cG9ydC1zdmctYXV0bzpub3QobWp4LWNvbnRhaW5lciAmZ3Q7IHN2ZykgeyBmaWx0ZXI6IGludmVydCgxMDAlKSBodWUtcm90YXRlKDE4MGRlZyk7IH0mI3hhO3N2Zy5nZS1leHBvcnQtc3ZnLWF1dG8gZm9yZWlnbk9iamVjdCBpbWcsJiN4YTtzdmcuZ2UtZXhwb3J0LXN2Zy1hdXRvIGltYWdlOm5vdChzdmcuZ2UtZXhwb3J0LXN2Zy1hdXRvIHN3aXRjaCBpbWFnZSksJiN4YTtzdmcuZ2UtZXhwb3J0LXN2Zy1hdXRvIHN2Zzpub3QobWp4LWNvbnRhaW5lciAmZ3Q7IHN2ZykmI3hhO3sgZmlsdGVyOiBpbnZlcnQoMTAwJSkgaHVlLXJvdGF0ZSgxODBkZWcpIH0mI3hhO308L3N0eWxlPjwvZGVmcz48Zz48ZyBkYXRhLWNlbGwtaWQ9IjAiPjxnIGRhdGEtY2VsbC1pZD0iMSI+PGcgZGF0YS1jZWxsLWlkPSJuZ0IxbGkxNXdoZjhRNG51bnN5RC0xMiI+PGc+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjQyMCIgaGVpZ2h0PSIxNDAiIGZpbGw9InJnYigyNTUsIDI1NSwgMjU1KSIgc3Ryb2tlPSIjZmZmZmZmIiBwb2ludGVyLWV2ZW50cz0iYWxsIi8+PC9nPjwvZz48ZyBkYXRhLWNlbGwtaWQ9Im5nQjFsaTE1d2hmOFE0bnVuc3lELTEiPjxnPjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxMjAiIGZpbGw9InJnYigyNTUsIDI1NSwgMjU1KSIgc3Ryb2tlPSJyZ2IoMCwgMCwgMCkiIHBvaW50ZXItZXZlbnRzPSJhbGwiLz48L2c+PGc+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuNSAtMC41KSI+PHN3aXRjaD48Zm9yZWlnbk9iamVjdCBwb2ludGVyLWV2ZW50cz0ibm9uZSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgcmVxdWlyZWRGZWF0dXJlcz0iaHR0cDovL3d3dy53My5vcmcvVFIvU1ZHMTEvZmVhdHVyZSNFeHRlbnNpYmlsaXR5IiBzdHlsZT0ib3ZlcmZsb3c6IHZpc2libGU7IHRleHQtYWxpZ246IGxlZnQ7Ij48ZGl2IHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sIiBzdHlsZT0iZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IHVuc2FmZSBjZW50ZXI7IGp1c3RpZnktY29udGVudDogdW5zYWZlIGNlbnRlcjsgd2lkdGg6IDExOHB4OyBoZWlnaHQ6IDFweDsgcGFkZGluZy10b3A6IDcwcHg7IG1hcmdpbi1sZWZ0OiAxMXB4OyI+PGRpdiBkYXRhLWRyYXdpby1jb2xvcnM9ImNvbG9yOiByZ2IoMCwgMCwgMCk7ICIgc3R5bGU9ImJveC1zaXppbmc6IGJvcmRlci1ib3g7IGZvbnQtc2l6ZTogMHB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7Ij48ZGl2IHN0eWxlPSJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IGZvbnQtc2l6ZTogMTJweDsgZm9udC1mYW1pbHk6IEhlbHZldGljYTsgY29sb3I6IHJnYigwLCAwLCAwKTsgbGluZS1oZWlnaHQ6IDEuMjsgcG9pbnRlci1ldmVudHM6IGFsbDsgd2hpdGUtc3BhY2U6IG5vcm1hbDsgb3ZlcmZsb3ctd3JhcDogbm9ybWFsOyI+QXBwbGljYXRpb248L2Rpdj48L2Rpdj48L2Rpdj48L2ZvcmVpZ25PYmplY3Q+PHRleHQgeD0iNzAiIHk9Ijc0IiBmaWxsPSJyZ2IoMCwgMCwgMCkiIGZvbnQtZmFtaWx5PSImcXVvdDtIZWx2ZXRpY2EmcXVvdDsiIGZvbnQtc2l6ZT0iMTJweCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QXBwbGljYXRpb248L3RleHQ+PC9zd2l0Y2g+PC9nPjwvZz48L2c+PGcgZGF0YS1jZWxsLWlkPSJuZ0IxbGkxNXdoZjhRNG51bnN5RC0yIj48Zz48cmVjdCB4PSI3MCIgeT0iOTAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI0MCIgZmlsbD0icmdiKDI1NSwgMjU1LCAyNTUpIiBzdHJva2U9InJnYigwLCAwLCAwKSIgcG9pbnRlci1ldmVudHM9ImFsbCIvPjwvZz48Zz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMC41IC0wLjUpIj48c3dpdGNoPjxmb3JlaWduT2JqZWN0IHBvaW50ZXItZXZlbnRzPSJub25lIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiByZXF1aXJlZEZlYXR1cmVzPSJodHRwOi8vd3d3LnczLm9yZy9UUi9TVkcxMS9mZWF0dXJlI0V4dGVuc2liaWxpdHkiIHN0eWxlPSJvdmVyZmxvdzogdmlzaWJsZTsgdGV4dC1hbGlnbjogbGVmdDsiPjxkaXYgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwiIHN0eWxlPSJkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogdW5zYWZlIGNlbnRlcjsganVzdGlmeS1jb250ZW50OiB1bnNhZmUgY2VudGVyOyB3aWR0aDogNThweDsgaGVpZ2h0OiAxcHg7IHBhZGRpbmctdG9wOiAxMTBweDsgbWFyZ2luLWxlZnQ6IDcxcHg7Ij48ZGl2IGRhdGEtZHJhd2lvLWNvbG9ycz0iY29sb3I6IHJnYigwLCAwLCAwKTsgIiBzdHlsZT0iYm94LXNpemluZzogYm9yZGVyLWJveDsgZm9udC1zaXplOiAwcHg7IHRleHQtYWxpZ246IGNlbnRlcjsiPjxkaXYgc3R5bGU9ImRpc3BsYXk6IGlubGluZS1ibG9jazsgZm9udC1zaXplOiAxMnB4OyBmb250LWZhbWlseTogSGVsdmV0aWNhOyBjb2xvcjogcmdiKDAsIDAsIDApOyBsaW5lLWhlaWdodDogMS4yOyBwb2ludGVyLWV2ZW50czogYWxsOyB3aGl0ZS1zcGFjZTogbm9ybWFsOyBvdmVyZmxvdy13cmFwOiBub3JtYWw7Ij5OZXcgUmVsaWM8YnIgLz5BZ2VudDwvZGl2PjwvZGl2PjwvZGl2PjwvZm9yZWlnbk9iamVjdD48dGV4dCB4PSIxMDAiIHk9IjExNCIgZmlsbD0icmdiKDAsIDAsIDApIiBmb250LWZhbWlseT0iJnF1b3Q7SGVsdmV0aWNhJnF1b3Q7IiBmb250LXNpemU9IjEycHgiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5ldyBSZWxpYy4uLjwvdGV4dD48L3N3aXRjaD48L2c+PC9nPjwvZz48ZyBkYXRhLWNlbGwtaWQ9Im5nQjFsaTE1d2hmOFE0bnVuc3lELTQiPjxnPjxyZWN0IHg9IjE3MCIgeT0iMTAiIHdpZHRoPSI4MCIgaGVpZ2h0PSIxMjAiIGZpbGw9InJnYigyNTUsIDI1NSwgMjU1KSIgc3Ryb2tlPSJyZ2IoMCwgMCwgMCkiIHBvaW50ZXItZXZlbnRzPSJhbGwiLz48L2c+PGc+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuNSAtMC41KSI+PHN3aXRjaD48Zm9yZWlnbk9iamVjdCBwb2ludGVyLWV2ZW50cz0ibm9uZSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgcmVxdWlyZWRGZWF0dXJlcz0iaHR0cDovL3d3dy53My5vcmcvVFIvU1ZHMTEvZmVhdHVyZSNFeHRlbnNpYmlsaXR5IiBzdHlsZT0ib3ZlcmZsb3c6IHZpc2libGU7IHRleHQtYWxpZ246IGxlZnQ7Ij48ZGl2IHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sIiBzdHlsZT0iZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IHVuc2FmZSBjZW50ZXI7IGp1c3RpZnktY29udGVudDogdW5zYWZlIGNlbnRlcjsgd2lkdGg6IDc4cHg7IGhlaWdodDogMXB4OyBwYWRkaW5nLXRvcDogNzBweDsgbWFyZ2luLWxlZnQ6IDE3MXB4OyI+PGRpdiBkYXRhLWRyYXdpby1jb2xvcnM9ImNvbG9yOiByZ2IoMCwgMCwgMCk7ICIgc3R5bGU9ImJveC1zaXppbmc6IGJvcmRlci1ib3g7IGZvbnQtc2l6ZTogMHB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7Ij48ZGl2IHN0eWxlPSJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IGZvbnQtc2l6ZTogMTJweDsgZm9udC1mYW1pbHk6IEhlbHZldGljYTsgY29sb3I6IHJnYigwLCAwLCAwKTsgbGluZS1oZWlnaHQ6IDEuMjsgcG9pbnRlci1ldmVudHM6IGFsbDsgd2hpdGUtc3BhY2U6IG5vcm1hbDsgb3ZlcmZsb3ctd3JhcDogbm9ybWFsOyI+TG9hZDxiciAvPkJhbGFuY2VyPC9kaXY+PC9kaXY+PC9kaXY+PC9mb3JlaWduT2JqZWN0Pjx0ZXh0IHg9IjIxMCIgeT0iNzQiIGZpbGw9InJnYigwLCAwLCAwKSIgZm9udC1mYW1pbHk9IiZxdW90O0hlbHZldGljYSZxdW90OyIgZm9udC1zaXplPSIxMnB4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Mb2FkLi4uPC90ZXh0Pjwvc3dpdGNoPjwvZz48L2c+PC9nPjxnIGRhdGEtY2VsbC1pZD0ibmdCMWxpMTV3aGY4UTRudW5zeUQtNSI+PGc+PHJlY3QgeD0iMjkwIiB5PSIxMCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxMjAiIGZpbGw9InJnYigyNTUsIDI1NSwgMjU1KSIgc3Ryb2tlPSJyZ2IoMCwgMCwgMCkiIHBvaW50ZXItZXZlbnRzPSJhbGwiLz48L2c+PGc+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuNSAtMC41KSI+PHN3aXRjaD48Zm9yZWlnbk9iamVjdCBwb2ludGVyLWV2ZW50cz0ibm9uZSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgcmVxdWlyZWRGZWF0dXJlcz0iaHR0cDovL3d3dy53My5vcmcvVFIvU1ZHMTEvZmVhdHVyZSNFeHRlbnNpYmlsaXR5IiBzdHlsZT0ib3ZlcmZsb3c6IHZpc2libGU7IHRleHQtYWxpZ246IGxlZnQ7Ij48ZGl2IHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sIiBzdHlsZT0iZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IHVuc2FmZSBjZW50ZXI7IGp1c3RpZnktY29udGVudDogdW5zYWZlIGNlbnRlcjsgd2lkdGg6IDExOHB4OyBoZWlnaHQ6IDFweDsgcGFkZGluZy10b3A6IDcwcHg7IG1hcmdpbi1sZWZ0OiAyOTFweDsiPjxkaXYgZGF0YS1kcmF3aW8tY29sb3JzPSJjb2xvcjogcmdiKDAsIDAsIDApOyAiIHN0eWxlPSJib3gtc2l6aW5nOiBib3JkZXItYm94OyBmb250LXNpemU6IDBweDsgdGV4dC1hbGlnbjogY2VudGVyOyI+PGRpdiBzdHlsZT0iZGlzcGxheTogaW5saW5lLWJsb2NrOyBmb250LXNpemU6IDEycHg7IGZvbnQtZmFtaWx5OiBIZWx2ZXRpY2E7IGNvbG9yOiByZ2IoMCwgMCwgMCk7IGxpbmUtaGVpZ2h0OiAxLjI7IHBvaW50ZXItZXZlbnRzOiBhbGw7IHdoaXRlLXNwYWNlOiBub3JtYWw7IG92ZXJmbG93LXdyYXA6IG5vcm1hbDsiPkN1YmVBUE08L2Rpdj48L2Rpdj48L2Rpdj48L2ZvcmVpZ25PYmplY3Q+PHRleHQgeD0iMzUwIiB5PSI3NCIgZmlsbD0icmdiKDAsIDAsIDApIiBmb250LWZhbWlseT0iJnF1b3Q7SGVsdmV0aWNhJnF1b3Q7IiBmb250LXNpemU9IjEycHgiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkN1YmVBUE08L3RleHQ+PC9zd2l0Y2g+PC9nPjwvZz48L2c+PGcgZGF0YS1jZWxsLWlkPSJuZ0IxbGkxNXdoZjhRNG51bnN5RC02Ij48Zz48cGF0aCBkPSJNIDEzMCAxMTAgTCAxNjMuNjMgMTEwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYigwLCAwLCAwKSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBwb2ludGVyLWV2ZW50cz0ic3Ryb2tlIi8+PHBhdGggZD0iTSAxNjguODggMTEwIEwgMTYxLjg4IDExMy41IEwgMTYzLjYzIDExMCBMIDE2MS44OCAxMDYuNSBaIiBmaWxsPSJyZ2IoMCwgMCwgMCkiIHN0cm9rZT0icmdiKDAsIDAsIDApIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHBvaW50ZXItZXZlbnRzPSJhbGwiLz48L2c+PC9nPjxnIGRhdGEtY2VsbC1pZD0ibmdCMWxpMTV3aGY4UTRudW5zeUQtOSI+PGc+PHJlY3QgeD0iMTcwIiB5PSI5MCIgd2lkdGg9IjUwIiBoZWlnaHQ9IjQwIiBmaWxsPSJyZ2IoMjU1LCAyNTUsIDI1NSkiIHN0cm9rZT0icmdiKDAsIDAsIDApIiBwb2ludGVyLWV2ZW50cz0iYWxsIi8+PC9nPjxnPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjUgLTAuNSkiPjxzd2l0Y2g+PGZvcmVpZ25PYmplY3QgcG9pbnRlci1ldmVudHM9Im5vbmUiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHJlcXVpcmVkRmVhdHVyZXM9Imh0dHA6Ly93d3cudzMub3JnL1RSL1NWRzExL2ZlYXR1cmUjRXh0ZW5zaWJpbGl0eSIgc3R5bGU9Im92ZXJmbG93OiB2aXNpYmxlOyB0ZXh0LWFsaWduOiBsZWZ0OyI+PGRpdiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCIgc3R5bGU9ImRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiB1bnNhZmUgY2VudGVyOyBqdXN0aWZ5LWNvbnRlbnQ6IHVuc2FmZSBjZW50ZXI7IHdpZHRoOiA0OHB4OyBoZWlnaHQ6IDFweDsgcGFkZGluZy10b3A6IDExMHB4OyBtYXJnaW4tbGVmdDogMTcxcHg7Ij48ZGl2IGRhdGEtZHJhd2lvLWNvbG9ycz0iY29sb3I6IHJnYigwLCAwLCAwKTsgIiBzdHlsZT0iYm94LXNpemluZzogYm9yZGVyLWJveDsgZm9udC1zaXplOiAwcHg7IHRleHQtYWxpZ246IGNlbnRlcjsiPjxkaXYgc3R5bGU9ImRpc3BsYXk6IGlubGluZS1ibG9jazsgZm9udC1zaXplOiAxMnB4OyBmb250LWZhbWlseTogSGVsdmV0aWNhOyBjb2xvcjogcmdiKDAsIDAsIDApOyBsaW5lLWhlaWdodDogMS4yOyBwb2ludGVyLWV2ZW50czogYWxsOyB3aGl0ZS1zcGFjZTogbm9ybWFsOyBvdmVyZmxvdy13cmFwOiBub3JtYWw7Ij5IVFRQUzxiciAvPjQ0MzwvZGl2PjwvZGl2PjwvZGl2PjwvZm9yZWlnbk9iamVjdD48dGV4dCB4PSIxOTUiIHk9IjExNCIgZmlsbD0icmdiKDAsIDAsIDApIiBmb250LWZhbWlseT0iJnF1b3Q7SGVsdmV0aWNhJnF1b3Q7IiBmb250LXNpemU9IjEycHgiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkhUVFBTLi4uPC90ZXh0Pjwvc3dpdGNoPjwvZz48L2c+PC9nPjxnIGRhdGEtY2VsbC1pZD0ibmdCMWxpMTV3aGY4UTRudW5zeUQtMTAiPjxnPjxyZWN0IHg9IjI5MCIgeT0iOTAiIHdpZHRoPSI1MCIgaGVpZ2h0PSI0MCIgZmlsbD0icmdiKDI1NSwgMjU1LCAyNTUpIiBzdHJva2U9InJnYigwLCAwLCAwKSIgcG9pbnRlci1ldmVudHM9ImFsbCIvPjwvZz48Zz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMC41IC0wLjUpIj48c3dpdGNoPjxmb3JlaWduT2JqZWN0IHBvaW50ZXItZXZlbnRzPSJub25lIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiByZXF1aXJlZEZlYXR1cmVzPSJodHRwOi8vd3d3LnczLm9yZy9UUi9TVkcxMS9mZWF0dXJlI0V4dGVuc2liaWxpdHkiIHN0eWxlPSJvdmVyZmxvdzogdmlzaWJsZTsgdGV4dC1hbGlnbjogbGVmdDsiPjxkaXYgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwiIHN0eWxlPSJkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogdW5zYWZlIGNlbnRlcjsganVzdGlmeS1jb250ZW50OiB1bnNhZmUgY2VudGVyOyB3aWR0aDogNDhweDsgaGVpZ2h0OiAxcHg7IHBhZGRpbmctdG9wOiAxMTBweDsgbWFyZ2luLWxlZnQ6IDI5MXB4OyI+PGRpdiBkYXRhLWRyYXdpby1jb2xvcnM9ImNvbG9yOiByZ2IoMCwgMCwgMCk7ICIgc3R5bGU9ImJveC1zaXppbmc6IGJvcmRlci1ib3g7IGZvbnQtc2l6ZTogMHB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7Ij48ZGl2IHN0eWxlPSJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IGZvbnQtc2l6ZTogMTJweDsgZm9udC1mYW1pbHk6IEhlbHZldGljYTsgY29sb3I6IHJnYigwLCAwLCAwKTsgbGluZS1oZWlnaHQ6IDEuMjsgcG9pbnRlci1ldmVudHM6IGFsbDsgd2hpdGUtc3BhY2U6IG5vcm1hbDsgb3ZlcmZsb3ctd3JhcDogbm9ybWFsOyI+SFRUUDxiciAvPjMxMzA8L2Rpdj48L2Rpdj48L2Rpdj48L2ZvcmVpZ25PYmplY3Q+PHRleHQgeD0iMzE1IiB5PSIxMTQiIGZpbGw9InJnYigwLCAwLCAwKSIgZm9udC1mYW1pbHk9IiZxdW90O0hlbHZldGljYSZxdW90OyIgZm9udC1zaXplPSIxMnB4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5IVFRQLi4uPC90ZXh0Pjwvc3dpdGNoPjwvZz48L2c+PC9nPjxnIGRhdGEtY2VsbC1pZD0ibmdCMWxpMTV3aGY4UTRudW5zeUQtMTEiPjxnPjxwYXRoIGQ9Ik0gMjUwIDEwOS41IEwgMjgzLjYzIDEwOS41IiBmaWxsPSJub25lIiBzdHJva2U9InJnYigwLCAwLCAwKSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBwb2ludGVyLWV2ZW50cz0ic3Ryb2tlIi8+PHBhdGggZD0iTSAyODguODggMTA5LjUgTCAyODEuODggMTEzIEwgMjgzLjYzIDEwOS41IEwgMjgxLjg4IDEwNiBaIiBmaWxsPSJyZ2IoMCwgMCwgMCkiIHN0cm9rZT0icmdiKDAsIDAsIDApIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHBvaW50ZXItZXZlbnRzPSJhbGwiLz48L2c+PC9nPjwvZz48L2c+PC9nPjwvc3ZnPg=="},8453:(e,i,n)=>{n.d(i,{R:()=>t,x:()=>c});var l=n(6540);const d={},a=l.createContext(d);function t(e){const i=l.useContext(a);return l.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function c(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:t(e.components),l.createElement(a.Provider,{value:i},e.children)}}}]);