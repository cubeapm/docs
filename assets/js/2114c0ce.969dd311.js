"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[398],{3593:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>r,contentTitle:()=>l,default:()=>p,frontMatter:()=>i,metadata:()=>d,toc:()=>c});var s=n(4848),o=n(8453);const i={id:"fluentd",title:"Fluentd",slug:"/logs/ingestion/fluentd"},l="Fluentd",d={id:"logs/ingestion/fluentd",title:"Fluentd",description:"HTTP",source:"@site/docs/logs/ingestion/fluentd.md",sourceDirName:"logs/ingestion",slug:"/logs/ingestion/fluentd",permalink:"/logs/ingestion/fluentd",draft:!1,unlisted:!1,editUrl:"https://github.com/cubeapm/docs/docs/docs/logs/ingestion/fluentd.md",tags:[],version:"current",frontMatter:{id:"fluentd",title:"Fluentd",slug:"/logs/ingestion/fluentd"},sidebar:"tutorialSidebar",previous:{title:"Fluentbit",permalink:"/logs/ingestion/fluentbit"},next:{title:"Kubernetes",permalink:"/logs/ingestion/kubernetes"}},r={},c=[{value:"HTTP",id:"http",level:2}];function u(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...(0,o.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h1,{id:"fluentd",children:"Fluentd"}),"\n",(0,s.jsx)(t.h2,{id:"http",children:"HTTP"}),"\n",(0,s.jsxs)(t.p,{children:["Specify ",(0,s.jsx)(t.code,{children:"http"})," output section in ",(0,s.jsx)(t.code,{children:"fluentd.conf"})," as below:"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{children:'<match **>\n  @type http\n  endpoint "http://<ip_address_of_cubeapm_server>:3130/api/logs/insert/jsonline"\n  headers {"Cube-Msg-Field": "log", "Cube-Time-Field": "time", "Cube-Stream-Fields": "path"}\n</match>\n'})}),"\n",(0,s.jsxs)(t.p,{children:["Reference: ",(0,s.jsx)(t.a,{href:"https://docs.fluentd.org/output/http",children:"Fluentd HTTP documentation"}),"."]})]})}function p(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(u,{...e})}):u(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>l,x:()=>d});var s=n(6540);const o={},i=s.createContext(o);function l(e){const t=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function d(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:l(e.components),s.createElement(i.Provider,{value:t},e.children)}}}]);