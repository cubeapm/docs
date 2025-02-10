"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[295],{9017:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>r,contentTitle:()=>l,default:()=>u,frontMatter:()=>o,metadata:()=>a,toc:()=>c});var s=n(4848),i=n(8453);const o={id:"filebeat",title:"Filebeat",slug:"/logs/ingestion/filebeat"},l="Filebeat",a={id:"logs/ingestion/filebeat",title:"Filebeat",description:"Configure output.elasticsearch section in filebeat.yml as below:",source:"@site/docs/logs/ingestion/filebeat.md",sourceDirName:"logs/ingestion",slug:"/logs/ingestion/filebeat",permalink:"/logs/ingestion/filebeat",draft:!1,unlisted:!1,editUrl:"https://github.com/cubeapm/docs/docs/docs/logs/ingestion/filebeat.md",tags:[],version:"current",frontMatter:{id:"filebeat",title:"Filebeat",slug:"/logs/ingestion/filebeat"},sidebar:"tutorialSidebar",previous:{title:"AWS Lambda",permalink:"/logs/ingestion/aws-lambda"},next:{title:"Fluentbit",permalink:"/logs/ingestion/fluentbit"}},r={},c=[];function d(e){const t={a:"a",code:"code",h1:"h1",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h1,{id:"filebeat",children:"Filebeat"}),"\n",(0,s.jsxs)(t.p,{children:["Configure ",(0,s.jsx)(t.code,{children:"output.elasticsearch"})," section in ",(0,s.jsx)(t.code,{children:"filebeat.yml"})," as below:"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-yaml",children:'output.elasticsearch:\n  hosts:\n    - "http://<ip_address_of_cubeapm_server>:3130/api/logs/insert/elasticsearch/"\n  parameters:\n    _msg_field: "message"\n    _time_field: "@timestamp"\n    _stream_fields: "host.hostname,log.file.path"\n  #allow_older_versions: true\n  #worker: 8\n  #bulk_max_size: 1000\n  #compression_level: 1\n'})}),"\n",(0,s.jsxs)(t.p,{children:["Reference: ",(0,s.jsx)(t.a,{href:"https://www.elastic.co/guide/en/beats/filebeat/current/elasticsearch-output.html",children:"Filebeat documentation"}),"."]})]})}function u(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>l,x:()=>a});var s=n(6540);const i={},o=s.createContext(i);function l(e){const t=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),s.createElement(o.Provider,{value:t},e.children)}}}]);