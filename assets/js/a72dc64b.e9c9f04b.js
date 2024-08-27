"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[116],{4213:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>d,frontMatter:()=>r,metadata:()=>s,toc:()=>c});var o=t(4848),a=t(8453);const r={id:"java",title:"Java",slug:"/instrumentation/java"},i=void 0,s={id:"instrumentation/java",title:"Java",description:"Auto Instrumentation",source:"@site/docs/instrumentation/java.md",sourceDirName:"instrumentation",slug:"/instrumentation/java",permalink:"/instrumentation/java",draft:!1,unlisted:!1,editUrl:"https://github.com/cubeapm/docs/docs/docs/instrumentation/java.md",tags:[],version:"current",frontMatter:{id:"java",title:"Java",slug:"/instrumentation/java"},sidebar:"tutorialSidebar",previous:{title:"JavaScript (browser)",permalink:"/instrumentation/javascript-browser"},next:{title:"NodeJS Express",permalink:"/instrumentation/nodejs-express"}},l={},c=[{value:"Auto Instrumentation",id:"auto-instrumentation",level:2},{value:"Troubleshooting",id:"troubleshooting",level:2},{value:"Manual Instrumentation",id:"manual-instrumentation",level:2},{value:"Reference",id:"reference",level:2}];function p(e){const n={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",...(0,a.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h2,{id:"auto-instrumentation",children:"Auto Instrumentation"}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Download the OpenTelemetry Java Agent jar."}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.a,{href:"https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar",children:"https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar"})}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Modify the application run command as follows:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-shell",children:"java -javaagent:</path/opentelemetry-javaagent.jar> \\\n    -Dotel.metrics.exporter=none \\\n    -Dotel.logs.exporter=none \\\n    -Dotel.traces.exporter=otlp \\\n    -Dotel.exporter.otlp.protocol=http/protobuf \\\n    -Dotel.exporter.otlp.traces.endpoint=http://<ip_address_of_cubeapm_server>:4318/v1/traces \\\n    -Dotel.exporter.otlp.compression=gzip \\\n    -Dotel.service.name=<app_name> \\\n    -jar <myapp>.jar\n"})}),"\n",(0,o.jsx)(n.p,{children:"Alternatively, the following environment variables can be set:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-shell",children:"JAVA_TOOL_OPTIONS=-javaagent:</path/opentelemetry-javaagent.jar>\nOTEL_METRICS_EXPORTER=none\nOTEL_LOGS_EXPORTER=none\nOTEL_TRACES_EXPORTER=otlp\nOTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf\nOTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://<ip_address_of_cubeapm_server>:4318/v1/traces\nOTEL_EXPORTER_OTLP_COMPRESSION=gzip\nOTEL_SERVICE_NAME=<app_name>\n"})}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"troubleshooting",children:"Troubleshooting"}),"\n",(0,o.jsx)(n.p,{children:"The following can be used for debugging:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"-Dotel.javaagent.debug=true\nor\nOTEL_JAVAAGENT_DEBUG=true\n"})}),"\n",(0,o.jsxs)(n.p,{children:["Also, traces exporter can be changed from ",(0,o.jsx)(n.code,{children:"otlp"})," to ",(0,o.jsx)(n.code,{children:"logging"})," to output traces on console."]}),"\n",(0,o.jsx)(n.p,{children:"The following command can be tried on the application host server to check connectivity to CubeAPM server(s):"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-shell",children:"telnet <ip_address_of_cubeapm_server> 4318\n"})}),"\n",(0,o.jsx)(n.h2,{id:"manual-instrumentation",children:"Manual Instrumentation"}),"\n",(0,o.jsx)(n.p,{children:"OpenTelemetry captures a lot of information automatically. However, there is sometimes a need to capture\nadditional information that may be specific to your application. Follow the below steps to attach additional\ninformation to traces generated by your application."}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Add the following dependencies to pom.xml"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-xml",children:"<project>\n  <dependencyManagement>\n    <dependencies>\n      <dependency>\n        <groupId>io.opentelemetry</groupId>\n        <artifactId>opentelemetry-bom</artifactId>\n        <version>1.37.0</version>\n        <type>pom</type>\n        <scope>import</scope>\n      </dependency>\n    </dependencies>\n  </dependencyManagement>\n  <dependencies>\n    <dependency>\n      <groupId>io.opentelemetry</groupId>\n      <artifactId>opentelemetry-api</artifactId>\n    </dependency>\n  </dependencies>\n</project>\n"})}),"\n",(0,o.jsx)(n.p,{children:"If you use Gradle, add the following:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:'dependencies {\n   implementation(platform("io.opentelemetry:opentelemetry-bom:1.37.0"));\n   implementation("io.opentelemetry:opentelemetry-api");\n}\n'})}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Go to the place in your code where you want to add additional information, and do the following:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-java",children:'import io.opentelemetry.api.trace.Span;\n\n@GetMapping\npublic String controllerMethod() {\n    Span span = Span.current();\n    if (span != null) {\n        span.setAttribute("custom.any.name.you.want", "any_value_you_want");\n    }\n}\n'})}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"reference",children:"Reference"}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.a,{href:"https://opentelemetry.io/docs/instrumentation/java/manual/",children:"https://opentelemetry.io/docs/instrumentation/java/manual/"})})]})}function d(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(p,{...e})}):p(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>i,x:()=>s});var o=t(6540);const a={},r=o.createContext(a);function i(e){const n=o.useContext(r);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),o.createElement(r.Provider,{value:n},e.children)}}}]);