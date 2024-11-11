"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[99],{5897:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>a,contentTitle:()=>r,default:()=>d,frontMatter:()=>i,metadata:()=>l,toc:()=>c});var t=s(4848),o=s(8453);const i={slug:"/logs/ingestion",sidebar_position:1},r="Ingestion",l={id:"logs/ingestion/ingestion",title:"Ingestion",description:"CubeAPM receives logs data on the below endpoints. See the left sidebar for configuration using popular log shippers.",source:"@site/docs/logs/ingestion/ingestion.md",sourceDirName:"logs/ingestion",slug:"/logs/ingestion",permalink:"/logs/ingestion",draft:!1,unlisted:!1,editUrl:"https://github.com/cubeapm/docs/docs/docs/logs/ingestion/ingestion.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{slug:"/logs/ingestion",sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Logs",permalink:"/logs"},next:{title:"Filebeat",permalink:"/logs/ingestion/filebeat"}},a={},c=[];function p(e){const n={code:"code",h1:"h1",p:"p",pre:"pre",...(0,o.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"ingestion",children:"Ingestion"}),"\n",(0,t.jsx)(n.p,{children:"CubeAPM receives logs data on the below endpoints. See the left sidebar for configuration using popular log shippers."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"# Elastic\nhttp://<ip_address_of_cubeapm_server>:3130/api/logs/insert/elasticsearch/_bulk\n\n# Loki (Protobuf as well as JSON)\nhttp://<ip_address_of_cubeapm_server>:3130/api/logs/insert/loki/api/v1/push\n\n# OpenTelemetry Logs (Protobuf)\nhttp://<ip_address_of_cubeapm_server>:3130/api/logs/insert/opentelemetry/v1/logs\n\n# JSON (Newline delimited)\nhttp://<ip_address_of_cubeapm_server>:3130/api/logs/insert/jsonline\n"})})]})}function d(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(p,{...e})}):p(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>r,x:()=>l});var t=s(6540);const o={},i=t.createContext(o);function r(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);