"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[209],{6616:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>l,frontMatter:()=>r,metadata:()=>i,toc:()=>h});var o=n(4848),s=n(8453);const r={sidebar_position:5,slug:"/infra-monitoring/aws-cloudwatch"},a="AWS CloudWatch",i={id:"infra-monitoring/cloudwatch",title:"AWS CloudWatch",description:"The recommended setup for monitoring AWS with CubeAPM is to use AWS CloudWatch Metric Streams for collecting the metrics from AWS and sending them to CubeAPM. CubeAPM then provides visualization and alerting on the collected metrics.",source:"@site/docs/infra-monitoring/5_cloudwatch.md",sourceDirName:"infra-monitoring",slug:"/infra-monitoring/aws-cloudwatch",permalink:"/infra-monitoring/aws-cloudwatch",draft:!1,unlisted:!1,editUrl:"https://github.com/cubeapm/docs/docs/docs/infra-monitoring/5_cloudwatch.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5,slug:"/infra-monitoring/aws-cloudwatch"},sidebar:"tutorialSidebar",previous:{title:"Kubernetes",permalink:"/infra-monitoring/kubernetes"}},c={},h=[{value:"Installation",id:"installation",level:2},{value:"Create Amazon Data Firehose Stream",id:"create-amazon-data-firehose-stream",level:3},{value:"Create CloudWatch Metric Stream",id:"create-cloudwatch-metric-stream",level:3},{value:"Troubleshooting",id:"troubleshooting",level:2}];function d(e){const t={admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",strong:"strong",...(0,s.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h1,{id:"aws-cloudwatch",children:"AWS CloudWatch"}),"\n",(0,o.jsx)(t.p,{children:"The recommended setup for monitoring AWS with CubeAPM is to use AWS CloudWatch Metric Streams for collecting the metrics from AWS and sending them to CubeAPM. CubeAPM then provides visualization and alerting on the collected metrics."}),"\n",(0,o.jsx)(t.p,{children:"Various AWS services send monitoring data to AWS CloudWatch. AWS CloudWatch can send this data to Amazon Data Firehose, and Amazon Data Firehose can be configured to send this data to CubeAPM."}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.img,{alt:"CubeAPM with AWS CloudWatch",src:n(8259).A+"",width:"591",height:"141"})}),"\n",(0,o.jsx)(t.h2,{id:"installation",children:"Installation"}),"\n",(0,o.jsx)(t.p,{children:"Various AWS services send monitoring data to AWS CloudWatch. AWS CloudWatch can send this data to Amazon Data Firehose, and Amazon Data Firehose can be configured to send this data to CubeAPM."}),"\n",(0,o.jsx)(t.h3,{id:"create-amazon-data-firehose-stream",children:"Create Amazon Data Firehose Stream"}),"\n",(0,o.jsxs)(t.p,{children:["Go to AWS console. From the Services menu, choose Amazon Data Firehose. Then click on ",(0,o.jsx)(t.strong,{children:"Create Firehose stream"}),"."]}),"\n",(0,o.jsxs)(t.p,{children:["In the ",(0,o.jsx)(t.strong,{children:"Source"})," dropdown, choose ",(0,o.jsx)(t.strong,{children:"Direct PUT"}),". In the ",(0,o.jsx)(t.strong,{children:"Destination"})," dropdown, choose ",(0,o.jsx)(t.strong,{children:"HTTP Endpoint"}),"."]}),"\n",(0,o.jsxs)(t.p,{children:["Give an appropriate name to the Firehose stream, e.g., ",(0,o.jsx)(t.strong,{children:"CubeAPM-CloudWatch-Metric-Stream"}),"."]}),"\n",(0,o.jsxs)(t.p,{children:["In the ",(0,o.jsx)(t.strong,{children:"Transform records"})," section, make sure that the ",(0,o.jsx)(t.strong,{children:"Turn on data transformation"})," checkbox is unchecked (we do not need any data transformation)."]}),"\n",(0,o.jsxs)(t.p,{children:["In the ",(0,o.jsx)(t.strong,{children:"Destination settings"})," section, set ",(0,o.jsx)(t.strong,{children:"HTTP endpoint URL"})," to ",(0,o.jsx)(t.code,{children:"https://<domain_of_cubeapm_server>/api/metrics/v1/save/aws"}),". We also recommend setting ",(0,o.jsx)(t.strong,{children:"Content encoding"})," to ",(0,o.jsx)(t.strong,{children:"GZIP"}),"."]}),"\n",(0,o.jsx)(t.admonition,{type:"info",children:(0,o.jsxs)(t.p,{children:["For multi-environment setup, set ",(0,o.jsx)(t.strong,{children:"HTTP endpoint URL"})," to ",(0,o.jsx)(t.code,{children:"https://<domain_of_cubeapm_server>/api/metrics/v1/save/aws/metrics/job@base64/=/cube.environment/<environment_name>"}),"."]})}),"\n",(0,o.jsx)(t.p,{children:"Choose the other settings as desired and create the Firehose stream."}),"\n",(0,o.jsx)(t.h3,{id:"create-cloudwatch-metric-stream",children:"Create CloudWatch Metric Stream"}),"\n",(0,o.jsxs)(t.p,{children:["Go to AWS console. From the Services menu, choose CloudWatch. Then go to ",(0,o.jsx)(t.strong,{children:"Metrics"})," > ",(0,o.jsx)(t.strong,{children:"Streams"})," and click on ",(0,o.jsx)(t.strong,{children:"Create metric stream"}),"."]}),"\n",(0,o.jsxs)(t.p,{children:["In the ",(0,o.jsx)(t.strong,{children:"Destination"})," section, choose ",(0,o.jsx)(t.strong,{children:"Custom setup with Firehose"})," and then select the Amazon Data Firehose stream we created above."]}),"\n",(0,o.jsxs)(t.p,{children:["In the ",(0,o.jsx)(t.strong,{children:"Change output format"})," section, make sure that the selected output format is ",(0,o.jsx)(t.strong,{children:"OpenTelemetry 1.0"}),"."]}),"\n",(0,o.jsx)(t.p,{children:"Choose the metrics you want to send to CubeAPM."}),"\n",(0,o.jsxs)(t.p,{children:["Give an appropriate name to the metric stream, e.g., ",(0,o.jsx)(t.strong,{children:"CubeAPM-CloudWatch-Metric-Stream"})," and create the metric stream."]}),"\n",(0,o.jsx)(t.p,{children:"It usually takes ~5 minutes for CloudWatch to start streaming data, and another ~5 minutes for CubeAPM to start showing data in the respective Infrastructure Monitoring dashboards."}),"\n",(0,o.jsx)(t.h2,{id:"troubleshooting",children:"Troubleshooting"}),"\n",(0,o.jsxs)(t.ol,{children:["\n",(0,o.jsxs)(t.li,{children:["\n",(0,o.jsx)(t.p,{children:"Check the CloudWatch metric stream page in the AWS console. The page shows some graphs about the number of updates published by CloudWatch. Check these graphs to see if data has been generated. It usually takes ~5 minutes for CloudWatch to start streaming data."}),"\n"]}),"\n",(0,o.jsxs)(t.li,{children:["\n",(0,o.jsx)(t.p,{children:"Check the Amazon Data Firehose stream page in the AWS console. The page shows some graphs about the data received (from CloudWatch) and sent (to CubeAPM). Check these graphs to see if data has been received and sent, and also if there have been any errors. If the graphs show any errors, check out the s3 bucket created by the Data Firehose stream for error logs."}),"\n"]}),"\n"]})]})}function l(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},8259:(e,t,n)=>{n.d(t,{A:()=>o});const o=n.p+"assets/images/cloudwatch-40bc13e511f026ae4756d9f89601ac69.svg"},8453:(e,t,n)=>{n.d(t,{R:()=>a,x:()=>i});var o=n(6540);const s={},r=o.createContext(s);function a(e){const t=o.useContext(r);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),o.createElement(r.Provider,{value:t},e.children)}}}]);