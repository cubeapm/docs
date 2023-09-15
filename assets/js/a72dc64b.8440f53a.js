"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[730],{4137:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>y});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),s=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=s(e.components);return a.createElement(p.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=s(n),d=r,y=m["".concat(p,".").concat(d)]||m[d]||u[d]||o;return n?a.createElement(y,i(i({ref:t},c),{},{components:n})):a.createElement(y,i({ref:t},c))}));function y(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=d;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[m]="string"==typeof e?e:r,i[1]=l;for(var s=2;s<o;s++)i[s]=n[s];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},980:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>s});var a=n(7462),r=(n(7294),n(4137));const o={id:"java",title:"Java",slug:"/instrumentation/java"},i=void 0,l={unversionedId:"instrumentation/java",id:"instrumentation/java",title:"Java",description:"Auto Instrumentation",source:"@site/docs/instrumentation/java.md",sourceDirName:"instrumentation",slug:"/instrumentation/java",permalink:"/instrumentation/java",draft:!1,editUrl:"https://github.com/cubeapm/docs/docs/docs/instrumentation/java.md",tags:[],version:"current",frontMatter:{id:"java",title:"Java",slug:"/instrumentation/java"},sidebar:"tutorialSidebar",previous:{title:"Instrumentation",permalink:"/instrumentation"},next:{title:"NodeJS",permalink:"/instrumentation/nodejs"}},p={},s=[{value:"Auto Instrumentation",id:"auto-instrumentation",level:2},{value:"Troubleshooting",id:"troubleshooting",level:2},{value:"Manual Instrumentation",id:"manual-instrumentation",level:2},{value:"Reference",id:"reference",level:2}],c={toc:s},m="wrapper";function u(e){let{components:t,...n}=e;return(0,r.kt)(m,(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"auto-instrumentation"},"Auto Instrumentation"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Download the OpenTelemetry Java Agent jar."),(0,r.kt)("p",{parentName:"li"},(0,r.kt)("a",{parentName:"p",href:"https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar"},"https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Modify the application run command as follows:"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"java -javaagent:</path/opentelemetry-javaagent.jar> \\\n    -Dotel.metrics.exporter=none \\\n    -Dotel.traces.exporter=otlp \\\n    -Dotel.exporter.otlp.traces.endpoint=http://<ip_address_of_cubeapm_server>:4317 \\\n    -Dotel.exporter.otlp.compression=gzip \\\n    -Dotel.service.name=<app_name> \\\n    -jar <myapp>.jar\n")),(0,r.kt)("p",{parentName:"li"},"Alternatively, the following environment variables can be set:"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"JAVA_TOOL_OPTIONS=-javaagent:</path/opentelemetry-javaagent.jar>\nOTEL_METRICS_EXPORTER=none\nOTEL_TRACES_EXPORTER=otlp\nOTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://<ip_address_of_cubeapm_server>:4317\nOTEL_EXPORTER_OTLP_COMPRESSION=gzip\nOTEL_SERVICE_NAME=<app_name>\n")))),(0,r.kt)("h2",{id:"troubleshooting"},"Troubleshooting"),(0,r.kt)("p",null,"The following can be used for debugging:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"-Dotel.javaagent.debug=true\nor\nOTEL_JAVAAGENT_DEBUG=true\n")),(0,r.kt)("p",null,"Also, traces exporter can be changed from ",(0,r.kt)("inlineCode",{parentName:"p"},"otlp")," to ",(0,r.kt)("inlineCode",{parentName:"p"},"logging")," to output traces on console."),(0,r.kt)("p",null,"The following command can be tried on the application host server to check connectivity to CubeAPM server(s):"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"telnet <ip_address_of_cubeapm_server> 4317\n")),(0,r.kt)("h2",{id:"manual-instrumentation"},"Manual Instrumentation"),(0,r.kt)("p",null,"OpenTelemetry captures a lot of information automatically. However, there is sometimes a need to capture\nadditional information that may be specific to your application. Follow the below steps to attach additional\ninformation to traces generated by your application."),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Add the following dependencies to pom.xml"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-xml"},"<project>\n  <dependencyManagement>\n    <dependencies>\n      <dependency>\n        <groupId>io.opentelemetry</groupId>\n        <artifactId>opentelemetry-bom</artifactId>\n        <version>1.28.0</version>\n        <type>pom</type>\n        <scope>import</scope>\n      </dependency>\n    </dependencies>\n  </dependencyManagement>\n  <dependencies>\n    <dependency>\n      <groupId>io.opentelemetry</groupId>\n      <artifactId>opentelemetry-api</artifactId>\n    </dependency>\n  </dependencies>\n</project>\n")),(0,r.kt)("p",{parentName:"li"},"If you use Gradle, add the following:"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"dependencies {\n    implementation 'io.opentelemetry:opentelemetry-api:1.28.0'\n}\n"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Go to the place in your code where you want to add additional information, and do the following:"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-java"},'import io.opentelemetry.api.trace.Span;\n\n@GetMapping\npublic String controllerMethod() {\n    Span span = Span.current();\n    if (span != null) {\n        span.setAttribute("custom.any.name.you.want", "any_value_you_want");\n    }\n}\n')))),(0,r.kt)("h2",{id:"reference"},"Reference"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://opentelemetry.io/docs/instrumentation/java/manual/"},"https://opentelemetry.io/docs/instrumentation/java/manual/")))}u.isMDXComponent=!0}}]);