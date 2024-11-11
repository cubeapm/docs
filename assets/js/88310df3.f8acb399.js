"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[434],{5150:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>a,frontMatter:()=>o,metadata:()=>r,toc:()=>u});var i=n(4848),s=n(8453);const o={id:"fluentbit",title:"Fluentbit",slug:"/logs/ingestion/fluentbit"},l="Fluentbit",r={id:"logs/ingestion/fluentbit",title:"Fluentbit",description:"Loki",source:"@site/docs/logs/ingestion/fluentbit.md",sourceDirName:"logs/ingestion",slug:"/logs/ingestion/fluentbit",permalink:"/logs/ingestion/fluentbit",draft:!1,unlisted:!1,editUrl:"https://github.com/cubeapm/docs/docs/docs/logs/ingestion/fluentbit.md",tags:[],version:"current",frontMatter:{id:"fluentbit",title:"Fluentbit",slug:"/logs/ingestion/fluentbit"},sidebar:"tutorialSidebar",previous:{title:"Filebeat",permalink:"/logs/ingestion/filebeat"},next:{title:"Fluentd",permalink:"/logs/ingestion/fluentd"}},c={},u=[{value:"Loki",id:"loki",level:2},{value:"HTTP",id:"http",level:2}];function d(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h1,{id:"fluentbit",children:"Fluentbit"}),"\n",(0,i.jsx)(t.h2,{id:"loki",children:"Loki"}),"\n",(0,i.jsxs)(t.p,{children:["Specify ",(0,i.jsx)(t.code,{children:"loki"})," output section in ",(0,i.jsx)(t.code,{children:"fluentbit.conf"})," as below:"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{children:"[OUTPUT]\n    name loki\n    match *\n    host <ip_address_of_cubeapm_server>\n    port 3130\n    uri /api/logs/insert/loki/api/v1/push\n    label_keys $path,$log,$time\n    header Cube-Msg-Field log\n    header Cube-Time-Field time\n    header Cube-Stream-Fields path\n    #compress gzip\n    #auto_kubernetes_labels on\n"})}),"\n",(0,i.jsxs)(t.p,{children:["Reference: ",(0,i.jsx)(t.a,{href:"https://docs.fluentbit.io/manual/pipeline/outputs/loki",children:"Fluentbit Loki documentation"}),"."]}),"\n",(0,i.jsx)(t.h2,{id:"http",children:"HTTP"}),"\n",(0,i.jsxs)(t.p,{children:["Specify ",(0,i.jsx)(t.code,{children:"http"})," output section in ",(0,i.jsx)(t.code,{children:"fluentbit.conf"})," as below:"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{children:"[Output]\n    Name http\n    Match *\n    host <ip_address_of_cubeapm_server>\n    port 3130\n    uri /api/logs/insert/jsonline?_stream_fields=stream&_msg_field=log&_time_field=date\n    format json_lines\n    json_date_format iso8601\n    #compress gzip\n    #auto_kubernetes_labels on\n"})}),"\n",(0,i.jsxs)(t.p,{children:["Reference: ",(0,i.jsx)(t.a,{href:"https://docs.fluentbit.io/manual/pipeline/outputs/http",children:"Fluentbit HTTP documentation"}),"."]})]})}function a(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>l,x:()=>r});var i=n(6540);const s={},o=i.createContext(s);function l(e){const t=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),i.createElement(o.Provider,{value:t},e.children)}}}]);