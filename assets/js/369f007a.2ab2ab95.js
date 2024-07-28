"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[418],{5003:(i,e,n)=>{n.r(e),n.d(e,{assets:()=>Z,contentTitle:()=>c,default:()=>b,frontMatter:()=>t,metadata:()=>s,toc:()=>o});var I=n(4848),a=n(8453),l=n(9489),d=n(7227);const t={slug:"/instrumentation",sidebar_position:3},c="Instrumentation",s={id:"instrumentation/instrumentation",title:"Instrumentation",description:"CubeAPM understands Open Telemetry Protocol (OTLP) natively. So it can be used to monitor applications written in a wide variety of programming languages/frameworks. We have documentation for connecting applications written in some of the most popular languages/frameworks in this section (see left sidebar). Documentation for a wider range of languages/frameworks is available on the official Open Telemetry website.",source:"@site/docs/instrumentation/instrumentation.md",sourceDirName:"instrumentation",slug:"/instrumentation",permalink:"/instrumentation",draft:!1,unlisted:!1,editUrl:"https://github.com/cubeapm/docs/docs/docs/instrumentation/instrumentation.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{slug:"/instrumentation",sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Webhook for alerting",permalink:"/install/configure-cubeapm/webhook-for-alerting"},next:{title:"JavaScript (browser)",permalink:"/instrumentation/javascript-browser"}},Z={},o=[{value:"Using CubeAPM with New Relic agents",id:"using-cubeapm-with-new-relic-agents",level:2},{value:"Multi-environment setup",id:"multi-environment-setup",level:3},{value:"Troubleshooting",id:"troubleshooting",level:3},{value:"AWS Lambda",id:"aws-lambda",level:3},{value:"Infinite Tracing",id:"infinite-tracing",level:3}];function m(i){const e={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",img:"img",p:"p",pre:"pre",...(0,a.R)(),...i.components};return(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(e.h1,{id:"instrumentation",children:"Instrumentation"}),"\n",(0,I.jsxs)(e.p,{children:["CubeAPM understands Open Telemetry Protocol (OTLP) natively. So it can be used to monitor applications written in a wide variety of programming languages/frameworks. We have documentation for connecting applications written in some of the most popular languages/frameworks in this section (see left sidebar). Documentation for a wider range of languages/frameworks is available on the official ",(0,I.jsx)(e.a,{href:"https://opentelemetry.io/docs/instrumentation/",children:"Open Telemetry website"}),"."]}),"\n",(0,I.jsx)(e.h2,{id:"using-cubeapm-with-new-relic-agents",children:"Using CubeAPM with New Relic agents"}),"\n",(0,I.jsx)(e.p,{children:"CubeAPM natively supports New Relic agents as well, i.e., CubeAPM can be used to monitor applications instrumented with New Relic agents as well. Here's how to use New Relic agents with CubeAPM:"}),"\n",(0,I.jsxs)(e.p,{children:["By default, New Relic agents send data to New Relic servers. However, if an environment variable ",(0,I.jsx)(e.code,{children:"NEW_RELIC_HOST"})," is found, the agents send data to the domain mentioned in this environment variable's value instead of sending to New Relic servers. Thus, by adding the environment variable ",(0,I.jsx)(e.code,{children:"NEW_RELIC_HOST=<domain_of_cubeapm_server>"})," to the application deployment setup, New Relic agent will send data to your CubeAPM servers instead of New Relic servers."]}),"\n",(0,I.jsx)(e.p,{children:"However, there is one more thing that needs to be taken care of. New Relic agents send data using HTTPS on port 443. However, CubeAPM expects data on port 3130 over HTTP. So, a load balancer (or HTTP reverse proxy) is needed to accept data on HTTPS/443 and forward to CubeAPM on HTTP/3130."}),"\n",(0,I.jsx)(e.p,{children:"That's it! New Relic agents can now be used to send data to CubeAPM."}),"\n",(0,I.jsx)(e.p,{children:(0,I.jsx)(e.img,{alt:"CubeAPM with New Relic",src:n(849).A+"",width:"421",height:"141"})}),"\n",(0,I.jsx)(e.admonition,{type:"info",children:(0,I.jsxs)(e.p,{children:["New Relic PHP agent does not support the NEW_RELIC_HOST environment variable. It needs setting the ",(0,I.jsx)(e.code,{children:"newrelic.daemon.collector_host"})," value in newrelic.ini instead."]})}),"\n",(0,I.jsx)(e.h3,{id:"multi-environment-setup",children:"Multi-environment setup"}),"\n",(0,I.jsx)(e.p,{children:"If you are using multi-environment feature of CubeAPM, you can set your application\u2019s environment name by setting the app name as per the below format:"}),"\n",(0,I.jsx)(e.pre,{children:(0,I.jsx)(e.code,{className:"language-shell",children:"# environment variable\nNEW_RELIC_APP_NAME=<application_name>[semicolon]<environment_name>\n\n# If the agent config file sets app_name as an array, then\n# set the app name as:\n# app_name: ['<application_name>', '<environment_name>']\n"})}),"\n",(0,I.jsx)(e.p,{children:"For example:"}),"\n",(0,I.jsx)(e.pre,{children:(0,I.jsx)(e.code,{className:"language-shell",children:"# environment variable\nNEW_RELIC_APP_NAME=order-service;sandbox\n\n# config file\n# app_name: ['order-service', 'sandbox']\n"})}),"\n",(0,I.jsx)(e.h3,{id:"troubleshooting",children:"Troubleshooting"}),"\n",(0,I.jsx)(e.p,{children:"The following command can be tried on the application host server to check connectivity to CubeAPM server(s):"}),"\n",(0,I.jsxs)(l.A,{groupId:"shells",children:[(0,I.jsx)(d.A,{value:"bash",label:"bash",children:(0,I.jsx)(e.pre,{children:(0,I.jsx)(e.code,{className:"language-shell",children:"curl -X POST -v -d '[]' 'https://<domain_of_cubeapm_server>/agent_listener/invoke_raw_method?marshal_format=json&protocol_version=17&method=preconnect' -H 'content-type: application/json'\n"})})}),(0,I.jsx)(d.A,{value:"powershell",label:"powershell",children:(0,I.jsx)(e.pre,{children:(0,I.jsx)(e.code,{className:"language-shell",children:"$uri = 'https://<domain_of_cubeapm_server>/agent_listener/invoke_raw_method?marshal_format=json&protocol_version=17&method=preconnect'\n$headers = @{\n    'content-type' = 'application/json'\n}\nInvoke-RestMethod -Uri $uri -Method Post -Headers $headers -Body '[]'\n"})})})]}),"\n",(0,I.jsxs)(e.p,{children:["Expected response: ",(0,I.jsx)(e.code,{children:"200 OK"})," with response message ",(0,I.jsx)(e.code,{children:'{"return_value":{"redirect_host":"<domain_of_cubeapm_server>"}}'})]}),"\n",(0,I.jsx)(e.h3,{id:"aws-lambda",children:"AWS Lambda"}),"\n",(0,I.jsxs)(e.p,{children:["For AWS Lambda, instead of setting ",(0,I.jsx)(e.code,{children:"NEW_RELIC_HOST"}),", set ",(0,I.jsx)(e.code,{children:"NEW_RELIC_TELEMETRY_ENDPOINT"})," as below in your Lambda environment variables."]}),"\n",(0,I.jsx)(e.pre,{children:(0,I.jsx)(e.code,{className:"language-shell",children:"NEW_RELIC_TELEMETRY_ENDPOINT=https://<domain_of_cubeapm_server>/newrelic/aws/lambda/v1\n\n# For multi-environment setup\nNEW_RELIC_TELEMETRY_ENDPOINT=https://<domain_of_cubeapm_server>/newrelic/aws/lambda/v1/env/<environment_name>\n"})}),"\n",(0,I.jsx)(e.h3,{id:"infinite-tracing",children:"Infinite Tracing"}),"\n",(0,I.jsxs)(e.p,{children:["Using New Relic's infinite tracing with CubeAPM is also easy. By adding the environment variable ",(0,I.jsx)(e.code,{children:"NEW_RELIC_INFINITE_TRACING_TRACE_OBSERVER_HOST=<domain_of_cubeapm_server>"})," (and optionally ",(0,I.jsx)(e.code,{children:"NEW_RELIC_INFINITE_TRACING_TRACE_OBSERVER_PORT=<desired_port>"}),") to the application deployment setup, New Relic agent will send infinite tracing data to your CubeAPM servers instead of New Relic servers. Note that NEW_RELIC_HOST is still required."]}),"\n",(0,I.jsx)(e.p,{children:"In case of infinite tracing, New Relic agents send data using gRPCS on port 443. However, CubeAPM expects data on port 3124 over gRPC. So, a load balancer (or gRPC reverse proxy) is needed to accept data on gRPCS/443 and forward to CubeAPM on gRPC/3124."}),"\n",(0,I.jsx)(e.p,{children:(0,I.jsx)(e.img,{alt:"CubeAPM with New Relic infinite tracing",src:n(5026).A+"",width:"421",height:"141"})}),"\n",(0,I.jsx)(e.admonition,{type:"info",children:(0,I.jsxs)(e.p,{children:["New Relic PHP agent does not support the NEW_RELIC_INFINITE_TRACING_TRACE_OBSERVER_HOST environment variable. It needs setting the ",(0,I.jsx)(e.code,{children:"newrelic.infinite_tracing.trace_observer.host"})," value in newrelic.ini instead. Similarly, set ",(0,I.jsx)(e.code,{children:"newrelic.infinite_tracing.trace_observer.port"})," if needed."]})}),"\n",(0,I.jsxs)(e.admonition,{type:"info",children:[(0,I.jsx)(e.p,{children:"In case of Python language, the following package also needs to be installed."}),(0,I.jsx)(e.p,{children:'pip install "newrelic[infinite-tracing]"'})]})]})}function b(i={}){const{wrapper:e}={...(0,a.R)(),...i.components};return e?(0,I.jsx)(e,{...i,children:(0,I.jsx)(m,{...i})}):m(i)}},7227:(i,e,n)=>{n.d(e,{A:()=>d});n(6540);var I=n(8215);const a={tabItem:"tabItem_Ymn6"};var l=n(4848);function d(i){let{children:e,hidden:n,className:d}=i;return(0,l.jsx)("div",{role:"tabpanel",className:(0,I.A)(a.tabItem,d),hidden:n,children:e})}},9489:(i,e,n)=>{n.d(e,{A:()=>y});var I=n(6540),a=n(8215),l=n(4245),d=n(6347),t=n(6494),c=n(2814),s=n(5167),Z=n(1269);function o(i){return I.Children.toArray(i).filter((i=>"\n"!==i)).map((i=>{if(!i||(0,I.isValidElement)(i)&&function(i){const{props:e}=i;return!!e&&"object"==typeof e&&"value"in e}(i))return i;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof i.type?i.type:i.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function m(i){const{values:e,children:n}=i;return(0,I.useMemo)((()=>{const i=e??function(i){return o(i).map((i=>{let{props:{value:e,label:n,attributes:I,default:a}}=i;return{value:e,label:n,attributes:I,default:a}}))}(n);return function(i){const e=(0,s.X)(i,((i,e)=>i.value===e.value));if(e.length>0)throw new Error(`Docusaurus error: Duplicate values "${e.map((i=>i.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(i),i}),[e,n])}function b(i){let{value:e,tabValues:n}=i;return n.some((i=>i.value===e))}function g(i){let{queryString:e=!1,groupId:n}=i;const a=(0,d.W6)(),l=function(i){let{queryString:e=!1,groupId:n}=i;if("string"==typeof e)return e;if(!1===e)return null;if(!0===e&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:e,groupId:n});return[(0,c.aZ)(l),(0,I.useCallback)((i=>{if(!l)return;const e=new URLSearchParams(a.location.search);e.set(l,i),a.replace({...a.location,search:e.toString()})}),[l,a])]}function r(i){const{defaultValue:e,queryString:n=!1,groupId:a}=i,l=m(i),[d,c]=(0,I.useState)((()=>function(i){let{defaultValue:e,tabValues:n}=i;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(e){if(!b({value:e,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${e}" but none of its children has the corresponding value. Available values are: ${n.map((i=>i.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return e}const I=n.find((i=>i.default))??n[0];if(!I)throw new Error("Unexpected error: 0 tabValues");return I.value}({defaultValue:e,tabValues:l}))),[s,o]=g({queryString:n,groupId:a}),[r,u]=function(i){let{groupId:e}=i;const n=function(i){return i?`docusaurus.tab.${i}`:null}(e),[a,l]=(0,Z.Dv)(n);return[a,(0,I.useCallback)((i=>{n&&l.set(i)}),[n,l])]}({groupId:a}),G=(()=>{const i=s??r;return b({value:i,tabValues:l})?i:null})();(0,t.A)((()=>{G&&c(G)}),[G]);return{selectedValue:d,selectValue:(0,I.useCallback)((i=>{if(!b({value:i,tabValues:l}))throw new Error(`Can't select invalid tab value=${i}`);c(i),o(i),u(i)}),[o,u,l]),tabValues:l}}var u=n(1062);const G={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var p=n(4848);function W(i){let{className:e,block:n,selectedValue:I,selectValue:d,tabValues:t}=i;const c=[],{blockElementScrollPositionUntilNextRender:s}=(0,l.a_)(),Z=i=>{const e=i.currentTarget,n=c.indexOf(e),a=t[n].value;a!==I&&(s(e),d(a))},o=i=>{let e=null;switch(i.key){case"Enter":Z(i);break;case"ArrowRight":{const n=c.indexOf(i.currentTarget)+1;e=c[n]??c[0];break}case"ArrowLeft":{const n=c.indexOf(i.currentTarget)-1;e=c[n]??c[c.length-1];break}}e?.focus()};return(0,p.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.A)("tabs",{"tabs--block":n},e),children:t.map((i=>{let{value:e,label:n,attributes:l}=i;return(0,p.jsx)("li",{role:"tab",tabIndex:I===e?0:-1,"aria-selected":I===e,ref:i=>c.push(i),onKeyDown:o,onClick:Z,...l,className:(0,a.A)("tabs__item",G.tabItem,l?.className,{"tabs__item--active":I===e}),children:n??e},e)}))})}function h(i){let{lazy:e,children:n,selectedValue:a}=i;const l=(Array.isArray(n)?n:[n]).filter(Boolean);if(e){const i=l.find((i=>i.props.value===a));return i?(0,I.cloneElement)(i,{className:"margin-top--md"}):null}return(0,p.jsx)("div",{className:"margin-top--md",children:l.map(((i,e)=>(0,I.cloneElement)(i,{key:e,hidden:i.props.value!==a})))})}function w(i){const e=r(i);return(0,p.jsxs)("div",{className:(0,a.A)("tabs-container",G.tabList),children:[(0,p.jsx)(W,{...i,...e}),(0,p.jsx)(h,{...i,...e})]})}function y(i){const e=(0,u.A)();return(0,p.jsx)(w,{...i,children:o(i.children)},String(e))}},5026:(i,e,n)=>{n.d(e,{A:()=>I});const I="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSI0MjFweCIgaGVpZ2h0PSIxNDFweCIgdmlld0JveD0iLTAuNSAtMC41IDQyMSAxNDEiIHN0eWxlPSJiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjU1LCAyNTUsIDI1NSk7Ij48ZGVmcy8+PGc+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjQyMCIgaGVpZ2h0PSIxNDAiIGZpbGw9InJnYigyNTUsIDI1NSwgMjU1KSIgc3Ryb2tlPSIjZmZmZmZmIiBwb2ludGVyLWV2ZW50cz0iYWxsIi8+PHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgZmlsbD0icmdiKDI1NSwgMjU1LCAyNTUpIiBzdHJva2U9InJnYigwLCAwLCAwKSIgcG9pbnRlci1ldmVudHM9ImFsbCIvPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjUgLTAuNSkiPjxzd2l0Y2g+PGZvcmVpZ25PYmplY3QgcG9pbnRlci1ldmVudHM9Im5vbmUiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHJlcXVpcmVkRmVhdHVyZXM9Imh0dHA6Ly93d3cudzMub3JnL1RSL1NWRzExL2ZlYXR1cmUjRXh0ZW5zaWJpbGl0eSIgc3R5bGU9Im92ZXJmbG93OiB2aXNpYmxlOyB0ZXh0LWFsaWduOiBsZWZ0OyI+PGRpdiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCIgc3R5bGU9ImRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiB1bnNhZmUgY2VudGVyOyBqdXN0aWZ5LWNvbnRlbnQ6IHVuc2FmZSBjZW50ZXI7IHdpZHRoOiAxMThweDsgaGVpZ2h0OiAxcHg7IHBhZGRpbmctdG9wOiA3MHB4OyBtYXJnaW4tbGVmdDogMTFweDsiPjxkaXYgZGF0YS1kcmF3aW8tY29sb3JzPSJjb2xvcjogcmdiKDAsIDAsIDApOyAiIHN0eWxlPSJib3gtc2l6aW5nOiBib3JkZXItYm94OyBmb250LXNpemU6IDBweDsgdGV4dC1hbGlnbjogY2VudGVyOyI+PGRpdiBzdHlsZT0iZGlzcGxheTogaW5saW5lLWJsb2NrOyBmb250LXNpemU6IDEycHg7IGZvbnQtZmFtaWx5OiBIZWx2ZXRpY2E7IGNvbG9yOiByZ2IoMCwgMCwgMCk7IGxpbmUtaGVpZ2h0OiAxLjI7IHBvaW50ZXItZXZlbnRzOiBhbGw7IHdoaXRlLXNwYWNlOiBub3JtYWw7IG92ZXJmbG93LXdyYXA6IG5vcm1hbDsiPkFwcGxpY2F0aW9uPC9kaXY+PC9kaXY+PC9kaXY+PC9mb3JlaWduT2JqZWN0Pjx0ZXh0IHg9IjcwIiB5PSI3NCIgZmlsbD0icmdiKDAsIDAsIDApIiBmb250LWZhbWlseT0iSGVsdmV0aWNhIiBmb250LXNpemU9IjEycHgiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkFwcGxpY2F0aW9uPC90ZXh0Pjwvc3dpdGNoPjwvZz48cmVjdCB4PSI3MCIgeT0iOTAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI0MCIgZmlsbD0icmdiKDI1NSwgMjU1LCAyNTUpIiBzdHJva2U9InJnYigwLCAwLCAwKSIgcG9pbnRlci1ldmVudHM9ImFsbCIvPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjUgLTAuNSkiPjxzd2l0Y2g+PGZvcmVpZ25PYmplY3QgcG9pbnRlci1ldmVudHM9Im5vbmUiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHJlcXVpcmVkRmVhdHVyZXM9Imh0dHA6Ly93d3cudzMub3JnL1RSL1NWRzExL2ZlYXR1cmUjRXh0ZW5zaWJpbGl0eSIgc3R5bGU9Im92ZXJmbG93OiB2aXNpYmxlOyB0ZXh0LWFsaWduOiBsZWZ0OyI+PGRpdiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCIgc3R5bGU9ImRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiB1bnNhZmUgY2VudGVyOyBqdXN0aWZ5LWNvbnRlbnQ6IHVuc2FmZSBjZW50ZXI7IHdpZHRoOiA1OHB4OyBoZWlnaHQ6IDFweDsgcGFkZGluZy10b3A6IDExMHB4OyBtYXJnaW4tbGVmdDogNzFweDsiPjxkaXYgZGF0YS1kcmF3aW8tY29sb3JzPSJjb2xvcjogcmdiKDAsIDAsIDApOyAiIHN0eWxlPSJib3gtc2l6aW5nOiBib3JkZXItYm94OyBmb250LXNpemU6IDBweDsgdGV4dC1hbGlnbjogY2VudGVyOyI+PGRpdiBzdHlsZT0iZGlzcGxheTogaW5saW5lLWJsb2NrOyBmb250LXNpemU6IDEycHg7IGZvbnQtZmFtaWx5OiBIZWx2ZXRpY2E7IGNvbG9yOiByZ2IoMCwgMCwgMCk7IGxpbmUtaGVpZ2h0OiAxLjI7IHBvaW50ZXItZXZlbnRzOiBhbGw7IHdoaXRlLXNwYWNlOiBub3JtYWw7IG92ZXJmbG93LXdyYXA6IG5vcm1hbDsiPk5ldyBSZWxpYzxiciAvPkFnZW50PC9kaXY+PC9kaXY+PC9kaXY+PC9mb3JlaWduT2JqZWN0Pjx0ZXh0IHg9IjEwMCIgeT0iMTE0IiBmaWxsPSJyZ2IoMCwgMCwgMCkiIGZvbnQtZmFtaWx5PSJIZWx2ZXRpY2EiIGZvbnQtc2l6ZT0iMTJweCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TmV3IFJlbGljLi4uPC90ZXh0Pjwvc3dpdGNoPjwvZz48cmVjdCB4PSIxNzAiIHk9IjEwIiB3aWR0aD0iODAiIGhlaWdodD0iMTIwIiBmaWxsPSJyZ2IoMjU1LCAyNTUsIDI1NSkiIHN0cm9rZT0icmdiKDAsIDAsIDApIiBwb2ludGVyLWV2ZW50cz0iYWxsIi8+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuNSAtMC41KSI+PHN3aXRjaD48Zm9yZWlnbk9iamVjdCBwb2ludGVyLWV2ZW50cz0ibm9uZSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgcmVxdWlyZWRGZWF0dXJlcz0iaHR0cDovL3d3dy53My5vcmcvVFIvU1ZHMTEvZmVhdHVyZSNFeHRlbnNpYmlsaXR5IiBzdHlsZT0ib3ZlcmZsb3c6IHZpc2libGU7IHRleHQtYWxpZ246IGxlZnQ7Ij48ZGl2IHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sIiBzdHlsZT0iZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IHVuc2FmZSBjZW50ZXI7IGp1c3RpZnktY29udGVudDogdW5zYWZlIGNlbnRlcjsgd2lkdGg6IDc4cHg7IGhlaWdodDogMXB4OyBwYWRkaW5nLXRvcDogNzBweDsgbWFyZ2luLWxlZnQ6IDE3MXB4OyI+PGRpdiBkYXRhLWRyYXdpby1jb2xvcnM9ImNvbG9yOiByZ2IoMCwgMCwgMCk7ICIgc3R5bGU9ImJveC1zaXppbmc6IGJvcmRlci1ib3g7IGZvbnQtc2l6ZTogMHB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7Ij48ZGl2IHN0eWxlPSJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IGZvbnQtc2l6ZTogMTJweDsgZm9udC1mYW1pbHk6IEhlbHZldGljYTsgY29sb3I6IHJnYigwLCAwLCAwKTsgbGluZS1oZWlnaHQ6IDEuMjsgcG9pbnRlci1ldmVudHM6IGFsbDsgd2hpdGUtc3BhY2U6IG5vcm1hbDsgb3ZlcmZsb3ctd3JhcDogbm9ybWFsOyI+TG9hZDxiciAvPkJhbGFuY2VyPC9kaXY+PC9kaXY+PC9kaXY+PC9mb3JlaWduT2JqZWN0Pjx0ZXh0IHg9IjIxMCIgeT0iNzQiIGZpbGw9InJnYigwLCAwLCAwKSIgZm9udC1mYW1pbHk9IkhlbHZldGljYSIgZm9udC1zaXplPSIxMnB4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Mb2FkLi4uPC90ZXh0Pjwvc3dpdGNoPjwvZz48cmVjdCB4PSIyOTAiIHk9IjEwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgZmlsbD0icmdiKDI1NSwgMjU1LCAyNTUpIiBzdHJva2U9InJnYigwLCAwLCAwKSIgcG9pbnRlci1ldmVudHM9ImFsbCIvPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjUgLTAuNSkiPjxzd2l0Y2g+PGZvcmVpZ25PYmplY3QgcG9pbnRlci1ldmVudHM9Im5vbmUiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHJlcXVpcmVkRmVhdHVyZXM9Imh0dHA6Ly93d3cudzMub3JnL1RSL1NWRzExL2ZlYXR1cmUjRXh0ZW5zaWJpbGl0eSIgc3R5bGU9Im92ZXJmbG93OiB2aXNpYmxlOyB0ZXh0LWFsaWduOiBsZWZ0OyI+PGRpdiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCIgc3R5bGU9ImRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiB1bnNhZmUgY2VudGVyOyBqdXN0aWZ5LWNvbnRlbnQ6IHVuc2FmZSBjZW50ZXI7IHdpZHRoOiAxMThweDsgaGVpZ2h0OiAxcHg7IHBhZGRpbmctdG9wOiA3MHB4OyBtYXJnaW4tbGVmdDogMjkxcHg7Ij48ZGl2IGRhdGEtZHJhd2lvLWNvbG9ycz0iY29sb3I6IHJnYigwLCAwLCAwKTsgIiBzdHlsZT0iYm94LXNpemluZzogYm9yZGVyLWJveDsgZm9udC1zaXplOiAwcHg7IHRleHQtYWxpZ246IGNlbnRlcjsiPjxkaXYgc3R5bGU9ImRpc3BsYXk6IGlubGluZS1ibG9jazsgZm9udC1zaXplOiAxMnB4OyBmb250LWZhbWlseTogSGVsdmV0aWNhOyBjb2xvcjogcmdiKDAsIDAsIDApOyBsaW5lLWhlaWdodDogMS4yOyBwb2ludGVyLWV2ZW50czogYWxsOyB3aGl0ZS1zcGFjZTogbm9ybWFsOyBvdmVyZmxvdy13cmFwOiBub3JtYWw7Ij5DdWJlQVBNPC9kaXY+PC9kaXY+PC9kaXY+PC9mb3JlaWduT2JqZWN0Pjx0ZXh0IHg9IjM1MCIgeT0iNzQiIGZpbGw9InJnYigwLCAwLCAwKSIgZm9udC1mYW1pbHk9IkhlbHZldGljYSIgZm9udC1zaXplPSIxMnB4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5DdWJlQVBNPC90ZXh0Pjwvc3dpdGNoPjwvZz48cGF0aCBkPSJNIDEzMCAxMTAgTCAxNjMuNjMgMTEwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYigwLCAwLCAwKSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBwb2ludGVyLWV2ZW50cz0ic3Ryb2tlIi8+PHBhdGggZD0iTSAxNjguODggMTEwIEwgMTYxLjg4IDExMy41IEwgMTYzLjYzIDExMCBMIDE2MS44OCAxMDYuNSBaIiBmaWxsPSJyZ2IoMCwgMCwgMCkiIHN0cm9rZT0icmdiKDAsIDAsIDApIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHBvaW50ZXItZXZlbnRzPSJhbGwiLz48cmVjdCB4PSIxNzAiIHk9IjkwIiB3aWR0aD0iNTAiIGhlaWdodD0iNDAiIGZpbGw9InJnYigyNTUsIDI1NSwgMjU1KSIgc3Ryb2tlPSJyZ2IoMCwgMCwgMCkiIHBvaW50ZXItZXZlbnRzPSJhbGwiLz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMC41IC0wLjUpIj48c3dpdGNoPjxmb3JlaWduT2JqZWN0IHBvaW50ZXItZXZlbnRzPSJub25lIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiByZXF1aXJlZEZlYXR1cmVzPSJodHRwOi8vd3d3LnczLm9yZy9UUi9TVkcxMS9mZWF0dXJlI0V4dGVuc2liaWxpdHkiIHN0eWxlPSJvdmVyZmxvdzogdmlzaWJsZTsgdGV4dC1hbGlnbjogbGVmdDsiPjxkaXYgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwiIHN0eWxlPSJkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogdW5zYWZlIGNlbnRlcjsganVzdGlmeS1jb250ZW50OiB1bnNhZmUgY2VudGVyOyB3aWR0aDogNDhweDsgaGVpZ2h0OiAxcHg7IHBhZGRpbmctdG9wOiAxMTBweDsgbWFyZ2luLWxlZnQ6IDE3MXB4OyI+PGRpdiBkYXRhLWRyYXdpby1jb2xvcnM9ImNvbG9yOiByZ2IoMCwgMCwgMCk7ICIgc3R5bGU9ImJveC1zaXppbmc6IGJvcmRlci1ib3g7IGZvbnQtc2l6ZTogMHB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7Ij48ZGl2IHN0eWxlPSJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IGZvbnQtc2l6ZTogMTJweDsgZm9udC1mYW1pbHk6IEhlbHZldGljYTsgY29sb3I6IHJnYigwLCAwLCAwKTsgbGluZS1oZWlnaHQ6IDEuMjsgcG9pbnRlci1ldmVudHM6IGFsbDsgd2hpdGUtc3BhY2U6IG5vcm1hbDsgb3ZlcmZsb3ctd3JhcDogbm9ybWFsOyI+Z1JQQ1M8YnIgLz40NDM8L2Rpdj48L2Rpdj48L2Rpdj48L2ZvcmVpZ25PYmplY3Q+PHRleHQgeD0iMTk1IiB5PSIxMTQiIGZpbGw9InJnYigwLCAwLCAwKSIgZm9udC1mYW1pbHk9IkhlbHZldGljYSIgZm9udC1zaXplPSIxMnB4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5IVFRQUy4uLjwvdGV4dD48L3N3aXRjaD48L2c+PHJlY3QgeD0iMjkwIiB5PSI5MCIgd2lkdGg9IjUwIiBoZWlnaHQ9IjQwIiBmaWxsPSJyZ2IoMjU1LCAyNTUsIDI1NSkiIHN0cm9rZT0icmdiKDAsIDAsIDApIiBwb2ludGVyLWV2ZW50cz0iYWxsIi8+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuNSAtMC41KSI+PHN3aXRjaD48Zm9yZWlnbk9iamVjdCBwb2ludGVyLWV2ZW50cz0ibm9uZSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgcmVxdWlyZWRGZWF0dXJlcz0iaHR0cDovL3d3dy53My5vcmcvVFIvU1ZHMTEvZmVhdHVyZSNFeHRlbnNpYmlsaXR5IiBzdHlsZT0ib3ZlcmZsb3c6IHZpc2libGU7IHRleHQtYWxpZ246IGxlZnQ7Ij48ZGl2IHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sIiBzdHlsZT0iZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IHVuc2FmZSBjZW50ZXI7IGp1c3RpZnktY29udGVudDogdW5zYWZlIGNlbnRlcjsgd2lkdGg6IDQ4cHg7IGhlaWdodDogMXB4OyBwYWRkaW5nLXRvcDogMTEwcHg7IG1hcmdpbi1sZWZ0OiAyOTFweDsiPjxkaXYgZGF0YS1kcmF3aW8tY29sb3JzPSJjb2xvcjogcmdiKDAsIDAsIDApOyAiIHN0eWxlPSJib3gtc2l6aW5nOiBib3JkZXItYm94OyBmb250LXNpemU6IDBweDsgdGV4dC1hbGlnbjogY2VudGVyOyI+PGRpdiBzdHlsZT0iZGlzcGxheTogaW5saW5lLWJsb2NrOyBmb250LXNpemU6IDEycHg7IGZvbnQtZmFtaWx5OiBIZWx2ZXRpY2E7IGNvbG9yOiByZ2IoMCwgMCwgMCk7IGxpbmUtaGVpZ2h0OiAxLjI7IHBvaW50ZXItZXZlbnRzOiBhbGw7IHdoaXRlLXNwYWNlOiBub3JtYWw7IG92ZXJmbG93LXdyYXA6IG5vcm1hbDsiPmdSUEM8YnIgLz4zMTI0PC9kaXY+PC9kaXY+PC9kaXY+PC9mb3JlaWduT2JqZWN0Pjx0ZXh0IHg9IjMxNSIgeT0iMTE0IiBmaWxsPSJyZ2IoMCwgMCwgMCkiIGZvbnQtZmFtaWx5PSJIZWx2ZXRpY2EiIGZvbnQtc2l6ZT0iMTJweCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SFRUUC4uLjwvdGV4dD48L3N3aXRjaD48L2c+PHBhdGggZD0iTSAyNTAgMTA5LjUgTCAyODMuNjMgMTA5LjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiKDAsIDAsIDApIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHBvaW50ZXItZXZlbnRzPSJzdHJva2UiLz48cGF0aCBkPSJNIDI4OC44OCAxMDkuNSBMIDI4MS44OCAxMTMgTCAyODMuNjMgMTA5LjUgTCAyODEuODggMTA2IFoiIGZpbGw9InJnYigwLCAwLCAwKSIgc3Ryb2tlPSJyZ2IoMCwgMCwgMCkiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcG9pbnRlci1ldmVudHM9ImFsbCIvPjwvZz48c3dpdGNoPjxnIHJlcXVpcmVkRmVhdHVyZXM9Imh0dHA6Ly93d3cudzMub3JnL1RSL1NWRzExL2ZlYXR1cmUjRXh0ZW5zaWJpbGl0eSIvPjxhIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTUpIiB4bGluazpocmVmPSJodHRwczovL3d3dy5kcmF3aW8uY29tL2RvYy9mYXEvc3ZnLWV4cG9ydC10ZXh0LXByb2JsZW1zIiB0YXJnZXQ9Il9ibGFuayI+PHRleHQgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMHB4IiB4PSI1MCUiIHk9IjEwMCUiPlRleHQgaXMgbm90IFNWRyAtIGNhbm5vdCBkaXNwbGF5PC90ZXh0PjwvYT48L3N3aXRjaD48L3N2Zz4="},849:(i,e,n)=>{n.d(e,{A:()=>I});const I="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSI0MjFweCIgaGVpZ2h0PSIxNDFweCIgdmlld0JveD0iLTAuNSAtMC41IDQyMSAxNDEiIHN0eWxlPSJiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjU1LCAyNTUsIDI1NSk7Ij48ZGVmcy8+PGc+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjQyMCIgaGVpZ2h0PSIxNDAiIGZpbGw9InJnYigyNTUsIDI1NSwgMjU1KSIgc3Ryb2tlPSIjZmZmZmZmIiBwb2ludGVyLWV2ZW50cz0iYWxsIi8+PHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgZmlsbD0icmdiKDI1NSwgMjU1LCAyNTUpIiBzdHJva2U9InJnYigwLCAwLCAwKSIgcG9pbnRlci1ldmVudHM9ImFsbCIvPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjUgLTAuNSkiPjxzd2l0Y2g+PGZvcmVpZ25PYmplY3QgcG9pbnRlci1ldmVudHM9Im5vbmUiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHJlcXVpcmVkRmVhdHVyZXM9Imh0dHA6Ly93d3cudzMub3JnL1RSL1NWRzExL2ZlYXR1cmUjRXh0ZW5zaWJpbGl0eSIgc3R5bGU9Im92ZXJmbG93OiB2aXNpYmxlOyB0ZXh0LWFsaWduOiBsZWZ0OyI+PGRpdiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCIgc3R5bGU9ImRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiB1bnNhZmUgY2VudGVyOyBqdXN0aWZ5LWNvbnRlbnQ6IHVuc2FmZSBjZW50ZXI7IHdpZHRoOiAxMThweDsgaGVpZ2h0OiAxcHg7IHBhZGRpbmctdG9wOiA3MHB4OyBtYXJnaW4tbGVmdDogMTFweDsiPjxkaXYgZGF0YS1kcmF3aW8tY29sb3JzPSJjb2xvcjogcmdiKDAsIDAsIDApOyAiIHN0eWxlPSJib3gtc2l6aW5nOiBib3JkZXItYm94OyBmb250LXNpemU6IDBweDsgdGV4dC1hbGlnbjogY2VudGVyOyI+PGRpdiBzdHlsZT0iZGlzcGxheTogaW5saW5lLWJsb2NrOyBmb250LXNpemU6IDEycHg7IGZvbnQtZmFtaWx5OiBIZWx2ZXRpY2E7IGNvbG9yOiByZ2IoMCwgMCwgMCk7IGxpbmUtaGVpZ2h0OiAxLjI7IHBvaW50ZXItZXZlbnRzOiBhbGw7IHdoaXRlLXNwYWNlOiBub3JtYWw7IG92ZXJmbG93LXdyYXA6IG5vcm1hbDsiPkFwcGxpY2F0aW9uPC9kaXY+PC9kaXY+PC9kaXY+PC9mb3JlaWduT2JqZWN0Pjx0ZXh0IHg9IjcwIiB5PSI3NCIgZmlsbD0icmdiKDAsIDAsIDApIiBmb250LWZhbWlseT0iSGVsdmV0aWNhIiBmb250LXNpemU9IjEycHgiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkFwcGxpY2F0aW9uPC90ZXh0Pjwvc3dpdGNoPjwvZz48cmVjdCB4PSI3MCIgeT0iOTAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI0MCIgZmlsbD0icmdiKDI1NSwgMjU1LCAyNTUpIiBzdHJva2U9InJnYigwLCAwLCAwKSIgcG9pbnRlci1ldmVudHM9ImFsbCIvPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjUgLTAuNSkiPjxzd2l0Y2g+PGZvcmVpZ25PYmplY3QgcG9pbnRlci1ldmVudHM9Im5vbmUiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHJlcXVpcmVkRmVhdHVyZXM9Imh0dHA6Ly93d3cudzMub3JnL1RSL1NWRzExL2ZlYXR1cmUjRXh0ZW5zaWJpbGl0eSIgc3R5bGU9Im92ZXJmbG93OiB2aXNpYmxlOyB0ZXh0LWFsaWduOiBsZWZ0OyI+PGRpdiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCIgc3R5bGU9ImRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiB1bnNhZmUgY2VudGVyOyBqdXN0aWZ5LWNvbnRlbnQ6IHVuc2FmZSBjZW50ZXI7IHdpZHRoOiA1OHB4OyBoZWlnaHQ6IDFweDsgcGFkZGluZy10b3A6IDExMHB4OyBtYXJnaW4tbGVmdDogNzFweDsiPjxkaXYgZGF0YS1kcmF3aW8tY29sb3JzPSJjb2xvcjogcmdiKDAsIDAsIDApOyAiIHN0eWxlPSJib3gtc2l6aW5nOiBib3JkZXItYm94OyBmb250LXNpemU6IDBweDsgdGV4dC1hbGlnbjogY2VudGVyOyI+PGRpdiBzdHlsZT0iZGlzcGxheTogaW5saW5lLWJsb2NrOyBmb250LXNpemU6IDEycHg7IGZvbnQtZmFtaWx5OiBIZWx2ZXRpY2E7IGNvbG9yOiByZ2IoMCwgMCwgMCk7IGxpbmUtaGVpZ2h0OiAxLjI7IHBvaW50ZXItZXZlbnRzOiBhbGw7IHdoaXRlLXNwYWNlOiBub3JtYWw7IG92ZXJmbG93LXdyYXA6IG5vcm1hbDsiPk5ldyBSZWxpYzxiciAvPkFnZW50PC9kaXY+PC9kaXY+PC9kaXY+PC9mb3JlaWduT2JqZWN0Pjx0ZXh0IHg9IjEwMCIgeT0iMTE0IiBmaWxsPSJyZ2IoMCwgMCwgMCkiIGZvbnQtZmFtaWx5PSJIZWx2ZXRpY2EiIGZvbnQtc2l6ZT0iMTJweCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TmV3IFJlbGljLi4uPC90ZXh0Pjwvc3dpdGNoPjwvZz48cmVjdCB4PSIxNzAiIHk9IjEwIiB3aWR0aD0iODAiIGhlaWdodD0iMTIwIiBmaWxsPSJyZ2IoMjU1LCAyNTUsIDI1NSkiIHN0cm9rZT0icmdiKDAsIDAsIDApIiBwb2ludGVyLWV2ZW50cz0iYWxsIi8+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuNSAtMC41KSI+PHN3aXRjaD48Zm9yZWlnbk9iamVjdCBwb2ludGVyLWV2ZW50cz0ibm9uZSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgcmVxdWlyZWRGZWF0dXJlcz0iaHR0cDovL3d3dy53My5vcmcvVFIvU1ZHMTEvZmVhdHVyZSNFeHRlbnNpYmlsaXR5IiBzdHlsZT0ib3ZlcmZsb3c6IHZpc2libGU7IHRleHQtYWxpZ246IGxlZnQ7Ij48ZGl2IHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sIiBzdHlsZT0iZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IHVuc2FmZSBjZW50ZXI7IGp1c3RpZnktY29udGVudDogdW5zYWZlIGNlbnRlcjsgd2lkdGg6IDc4cHg7IGhlaWdodDogMXB4OyBwYWRkaW5nLXRvcDogNzBweDsgbWFyZ2luLWxlZnQ6IDE3MXB4OyI+PGRpdiBkYXRhLWRyYXdpby1jb2xvcnM9ImNvbG9yOiByZ2IoMCwgMCwgMCk7ICIgc3R5bGU9ImJveC1zaXppbmc6IGJvcmRlci1ib3g7IGZvbnQtc2l6ZTogMHB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7Ij48ZGl2IHN0eWxlPSJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IGZvbnQtc2l6ZTogMTJweDsgZm9udC1mYW1pbHk6IEhlbHZldGljYTsgY29sb3I6IHJnYigwLCAwLCAwKTsgbGluZS1oZWlnaHQ6IDEuMjsgcG9pbnRlci1ldmVudHM6IGFsbDsgd2hpdGUtc3BhY2U6IG5vcm1hbDsgb3ZlcmZsb3ctd3JhcDogbm9ybWFsOyI+TG9hZDxiciAvPkJhbGFuY2VyPC9kaXY+PC9kaXY+PC9kaXY+PC9mb3JlaWduT2JqZWN0Pjx0ZXh0IHg9IjIxMCIgeT0iNzQiIGZpbGw9InJnYigwLCAwLCAwKSIgZm9udC1mYW1pbHk9IkhlbHZldGljYSIgZm9udC1zaXplPSIxMnB4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Mb2FkLi4uPC90ZXh0Pjwvc3dpdGNoPjwvZz48cmVjdCB4PSIyOTAiIHk9IjEwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgZmlsbD0icmdiKDI1NSwgMjU1LCAyNTUpIiBzdHJva2U9InJnYigwLCAwLCAwKSIgcG9pbnRlci1ldmVudHM9ImFsbCIvPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjUgLTAuNSkiPjxzd2l0Y2g+PGZvcmVpZ25PYmplY3QgcG9pbnRlci1ldmVudHM9Im5vbmUiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHJlcXVpcmVkRmVhdHVyZXM9Imh0dHA6Ly93d3cudzMub3JnL1RSL1NWRzExL2ZlYXR1cmUjRXh0ZW5zaWJpbGl0eSIgc3R5bGU9Im92ZXJmbG93OiB2aXNpYmxlOyB0ZXh0LWFsaWduOiBsZWZ0OyI+PGRpdiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCIgc3R5bGU9ImRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiB1bnNhZmUgY2VudGVyOyBqdXN0aWZ5LWNvbnRlbnQ6IHVuc2FmZSBjZW50ZXI7IHdpZHRoOiAxMThweDsgaGVpZ2h0OiAxcHg7IHBhZGRpbmctdG9wOiA3MHB4OyBtYXJnaW4tbGVmdDogMjkxcHg7Ij48ZGl2IGRhdGEtZHJhd2lvLWNvbG9ycz0iY29sb3I6IHJnYigwLCAwLCAwKTsgIiBzdHlsZT0iYm94LXNpemluZzogYm9yZGVyLWJveDsgZm9udC1zaXplOiAwcHg7IHRleHQtYWxpZ246IGNlbnRlcjsiPjxkaXYgc3R5bGU9ImRpc3BsYXk6IGlubGluZS1ibG9jazsgZm9udC1zaXplOiAxMnB4OyBmb250LWZhbWlseTogSGVsdmV0aWNhOyBjb2xvcjogcmdiKDAsIDAsIDApOyBsaW5lLWhlaWdodDogMS4yOyBwb2ludGVyLWV2ZW50czogYWxsOyB3aGl0ZS1zcGFjZTogbm9ybWFsOyBvdmVyZmxvdy13cmFwOiBub3JtYWw7Ij5DdWJlQVBNPC9kaXY+PC9kaXY+PC9kaXY+PC9mb3JlaWduT2JqZWN0Pjx0ZXh0IHg9IjM1MCIgeT0iNzQiIGZpbGw9InJnYigwLCAwLCAwKSIgZm9udC1mYW1pbHk9IkhlbHZldGljYSIgZm9udC1zaXplPSIxMnB4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5DdWJlQVBNPC90ZXh0Pjwvc3dpdGNoPjwvZz48cGF0aCBkPSJNIDEzMCAxMTAgTCAxNjMuNjMgMTEwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYigwLCAwLCAwKSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBwb2ludGVyLWV2ZW50cz0ic3Ryb2tlIi8+PHBhdGggZD0iTSAxNjguODggMTEwIEwgMTYxLjg4IDExMy41IEwgMTYzLjYzIDExMCBMIDE2MS44OCAxMDYuNSBaIiBmaWxsPSJyZ2IoMCwgMCwgMCkiIHN0cm9rZT0icmdiKDAsIDAsIDApIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHBvaW50ZXItZXZlbnRzPSJhbGwiLz48cmVjdCB4PSIxNzAiIHk9IjkwIiB3aWR0aD0iNTAiIGhlaWdodD0iNDAiIGZpbGw9InJnYigyNTUsIDI1NSwgMjU1KSIgc3Ryb2tlPSJyZ2IoMCwgMCwgMCkiIHBvaW50ZXItZXZlbnRzPSJhbGwiLz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMC41IC0wLjUpIj48c3dpdGNoPjxmb3JlaWduT2JqZWN0IHBvaW50ZXItZXZlbnRzPSJub25lIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiByZXF1aXJlZEZlYXR1cmVzPSJodHRwOi8vd3d3LnczLm9yZy9UUi9TVkcxMS9mZWF0dXJlI0V4dGVuc2liaWxpdHkiIHN0eWxlPSJvdmVyZmxvdzogdmlzaWJsZTsgdGV4dC1hbGlnbjogbGVmdDsiPjxkaXYgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwiIHN0eWxlPSJkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogdW5zYWZlIGNlbnRlcjsganVzdGlmeS1jb250ZW50OiB1bnNhZmUgY2VudGVyOyB3aWR0aDogNDhweDsgaGVpZ2h0OiAxcHg7IHBhZGRpbmctdG9wOiAxMTBweDsgbWFyZ2luLWxlZnQ6IDE3MXB4OyI+PGRpdiBkYXRhLWRyYXdpby1jb2xvcnM9ImNvbG9yOiByZ2IoMCwgMCwgMCk7ICIgc3R5bGU9ImJveC1zaXppbmc6IGJvcmRlci1ib3g7IGZvbnQtc2l6ZTogMHB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7Ij48ZGl2IHN0eWxlPSJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IGZvbnQtc2l6ZTogMTJweDsgZm9udC1mYW1pbHk6IEhlbHZldGljYTsgY29sb3I6IHJnYigwLCAwLCAwKTsgbGluZS1oZWlnaHQ6IDEuMjsgcG9pbnRlci1ldmVudHM6IGFsbDsgd2hpdGUtc3BhY2U6IG5vcm1hbDsgb3ZlcmZsb3ctd3JhcDogbm9ybWFsOyI+SFRUUFM8YnIgLz40NDM8L2Rpdj48L2Rpdj48L2Rpdj48L2ZvcmVpZ25PYmplY3Q+PHRleHQgeD0iMTk1IiB5PSIxMTQiIGZpbGw9InJnYigwLCAwLCAwKSIgZm9udC1mYW1pbHk9IkhlbHZldGljYSIgZm9udC1zaXplPSIxMnB4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5IVFRQUy4uLjwvdGV4dD48L3N3aXRjaD48L2c+PHJlY3QgeD0iMjkwIiB5PSI5MCIgd2lkdGg9IjUwIiBoZWlnaHQ9IjQwIiBmaWxsPSJyZ2IoMjU1LCAyNTUsIDI1NSkiIHN0cm9rZT0icmdiKDAsIDAsIDApIiBwb2ludGVyLWV2ZW50cz0iYWxsIi8+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuNSAtMC41KSI+PHN3aXRjaD48Zm9yZWlnbk9iamVjdCBwb2ludGVyLWV2ZW50cz0ibm9uZSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgcmVxdWlyZWRGZWF0dXJlcz0iaHR0cDovL3d3dy53My5vcmcvVFIvU1ZHMTEvZmVhdHVyZSNFeHRlbnNpYmlsaXR5IiBzdHlsZT0ib3ZlcmZsb3c6IHZpc2libGU7IHRleHQtYWxpZ246IGxlZnQ7Ij48ZGl2IHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sIiBzdHlsZT0iZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IHVuc2FmZSBjZW50ZXI7IGp1c3RpZnktY29udGVudDogdW5zYWZlIGNlbnRlcjsgd2lkdGg6IDQ4cHg7IGhlaWdodDogMXB4OyBwYWRkaW5nLXRvcDogMTEwcHg7IG1hcmdpbi1sZWZ0OiAyOTFweDsiPjxkaXYgZGF0YS1kcmF3aW8tY29sb3JzPSJjb2xvcjogcmdiKDAsIDAsIDApOyAiIHN0eWxlPSJib3gtc2l6aW5nOiBib3JkZXItYm94OyBmb250LXNpemU6IDBweDsgdGV4dC1hbGlnbjogY2VudGVyOyI+PGRpdiBzdHlsZT0iZGlzcGxheTogaW5saW5lLWJsb2NrOyBmb250LXNpemU6IDEycHg7IGZvbnQtZmFtaWx5OiBIZWx2ZXRpY2E7IGNvbG9yOiByZ2IoMCwgMCwgMCk7IGxpbmUtaGVpZ2h0OiAxLjI7IHBvaW50ZXItZXZlbnRzOiBhbGw7IHdoaXRlLXNwYWNlOiBub3JtYWw7IG92ZXJmbG93LXdyYXA6IG5vcm1hbDsiPkhUVFA8YnIgLz4zMTMwPC9kaXY+PC9kaXY+PC9kaXY+PC9mb3JlaWduT2JqZWN0Pjx0ZXh0IHg9IjMxNSIgeT0iMTE0IiBmaWxsPSJyZ2IoMCwgMCwgMCkiIGZvbnQtZmFtaWx5PSJIZWx2ZXRpY2EiIGZvbnQtc2l6ZT0iMTJweCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SFRUUC4uLjwvdGV4dD48L3N3aXRjaD48L2c+PHBhdGggZD0iTSAyNTAgMTA5LjUgTCAyODMuNjMgMTA5LjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiKDAsIDAsIDApIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHBvaW50ZXItZXZlbnRzPSJzdHJva2UiLz48cGF0aCBkPSJNIDI4OC44OCAxMDkuNSBMIDI4MS44OCAxMTMgTCAyODMuNjMgMTA5LjUgTCAyODEuODggMTA2IFoiIGZpbGw9InJnYigwLCAwLCAwKSIgc3Ryb2tlPSJyZ2IoMCwgMCwgMCkiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcG9pbnRlci1ldmVudHM9ImFsbCIvPjwvZz48c3dpdGNoPjxnIHJlcXVpcmVkRmVhdHVyZXM9Imh0dHA6Ly93d3cudzMub3JnL1RSL1NWRzExL2ZlYXR1cmUjRXh0ZW5zaWJpbGl0eSIvPjxhIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTUpIiB4bGluazpocmVmPSJodHRwczovL3d3dy5kcmF3aW8uY29tL2RvYy9mYXEvc3ZnLWV4cG9ydC10ZXh0LXByb2JsZW1zIiB0YXJnZXQ9Il9ibGFuayI+PHRleHQgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMHB4IiB4PSI1MCUiIHk9IjEwMCUiPlRleHQgaXMgbm90IFNWRyAtIGNhbm5vdCBkaXNwbGF5PC90ZXh0PjwvYT48L3N3aXRjaD48L3N2Zz4="},8453:(i,e,n)=>{n.d(e,{R:()=>d,x:()=>t});var I=n(6540);const a={},l=I.createContext(a);function d(i){const e=I.useContext(l);return I.useMemo((function(){return"function"==typeof i?i(e):{...e,...i}}),[e,i])}function t(i){let e;return e=i.disableParentContext?"function"==typeof i.components?i.components(a):i.components||a:d(i.components),I.createElement(l.Provider,{value:e},i.children)}}}]);