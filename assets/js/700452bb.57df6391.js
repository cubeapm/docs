"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[803],{5392:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>h,contentTitle:()=>a,default:()=>d,frontMatter:()=>s,metadata:()=>t,toc:()=>c});const t=JSON.parse('{"id":"infra-monitoring/varnish-cache","title":"Varnish Cache","description":"CubeAPM provides built-in dashboards for monitoring Varnish Cache. Since OpenTelemetry collector does not provide support for Varnish yet, CubeAPM Varnish dashboards are based on metrics generated by the Prometheus Varnish Exporter.","source":"@site/docs/infra-monitoring/7_varnish-cache.md","sourceDirName":"infra-monitoring","slug":"/infra-monitoring/varnish-cache","permalink":"/infra-monitoring/varnish-cache","draft":false,"unlisted":false,"editUrl":"https://github.com/cubeapm/docs/docs/docs/infra-monitoring/7_varnish-cache.md","tags":[],"version":"current","sidebarPosition":7,"frontMatter":{"sidebar_position":7,"slug":"/infra-monitoring/varnish-cache"},"sidebar":"tutorialSidebar","previous":{"title":"Prometheus Metrics","permalink":"/infra-monitoring/prometheus-metrics"},"next":{"title":"Logs","permalink":"/logs"}}');var o=r(4848),i=r(8453);const s={sidebar_position:7,slug:"/infra-monitoring/varnish-cache"},a="Varnish Cache",h={},c=[{value:"Troubleshooting",id:"troubleshooting",level:2}];function l(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"varnish-cache",children:"Varnish Cache"})}),"\n",(0,o.jsxs)(n.p,{children:["CubeAPM provides built-in dashboards for monitoring Varnish Cache. Since OpenTelemetry collector does not provide support for Varnish yet, CubeAPM Varnish dashboards are based on metrics generated by the ",(0,o.jsx)(n.a,{href:"https://github.com/jonnenauha/prometheus_varnish_exporter/",children:"Prometheus Varnish Exporter"}),"."]}),"\n",(0,o.jsx)(n.p,{children:"To inetgrate Varnish with CubeAPM, we need to follow the below steps:"}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:["Install Prometheus Varnish Exporter, following the documentation provided in the ",(0,o.jsx)(n.a,{href:"https://github.com/jonnenauha/prometheus_varnish_exporter/blob/master/README.md",children:"README"}),". This exporter will create a HTTP listener on port ",(0,o.jsx)(n.code,{children:"9131"}),", which will expose metrics at ",(0,o.jsx)(n.code,{children:"/metrics"})," path."]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:["Install and configure OpenTelemetry Collector to scrape these metrics and send them to CubeAPM. The guide is available ",(0,o.jsx)(n.a,{href:"/infra-monitoring/prometheus-metrics",children:"here"}),"."]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"troubleshooting",children:"Troubleshooting"}),"\n",(0,o.jsx)(n.p,{children:"Run the following command on the server running Prometheus Varnish Exporter to check if metrics are getting generated:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-shell",children:"curl -v 'http://localhost:9131/metrics'\n"})}),"\n",(0,o.jsx)(n.p,{children:"If metrics are getting generated but not showing up in CubeAPM, check the logs of OTel Collector."})]})}function d(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}},8453:(e,n,r)=>{r.d(n,{R:()=>s,x:()=>a});var t=r(6540);const o={},i=t.createContext(o);function s(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);