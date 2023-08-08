"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[574],{4137:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>m});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=n.createContext({}),s=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=s(e.components);return n.createElement(l.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),p=s(r),f=o,m=p["".concat(l,".").concat(f)]||p[f]||d[f]||a;return r?n.createElement(m,i(i({ref:t},u),{},{components:r})):n.createElement(m,i({ref:t},u))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=f;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c[p]="string"==typeof e?e:o,i[1]=c;for(var s=2;s<a;s++)i[s]=r[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},3126:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>d,frontMatter:()=>a,metadata:()=>c,toc:()=>s});var n=r(7462),o=(r(7294),r(4137));const a={slug:"/"},i="Introduction",c={unversionedId:"introduction",id:"introduction",title:"Introduction",description:"CubeAPM is an Application Performance Monitoring (APM) platform. It collects telemetry data from applications and infrastructure, and provides a UI for users to visualize and query the data. It also provides the ability to set up alerts based on the telemetry data, and sending notifications to users over various channels like Email, Slack, PagerDuty, etc.",source:"@site/docs/1_introduction.md",sourceDirName:".",slug:"/",permalink:"/docs/",draft:!1,editUrl:"https://github.com/cubeapm/docs/docs/docs/1_introduction.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{slug:"/"},sidebar:"tutorialSidebar",next:{title:"Install CubeAPM",permalink:"/docs/install/install-cubeapm"}},l={},s=[],u={toc:s},p="wrapper";function d(e){let{components:t,...a}=e;return(0,o.kt)(p,(0,n.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"introduction"},"Introduction"),(0,o.kt)("p",null,"CubeAPM is an Application Performance Monitoring (APM) platform. It collects telemetry data from applications and infrastructure, and provides a UI for users to visualize and query the data. It also provides the ability to set up alerts based on the telemetry data, and sending notifications to users over various channels like Email, Slack, PagerDuty, etc."),(0,o.kt)("p",null,"Following is a high-level architecture diagram of how CubeAPM works."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"CubeAPM Architecture",src:r(1516).Z,width:"640",height:"440"})),(0,o.kt)("p",null,"There are two main parts to setting up CubeAPM: ",(0,o.kt)("a",{parentName:"p",href:"/docs/install/install-cubeapm"},"installing CubeAPM")," itself, and ",(0,o.kt)("a",{parentName:"p",href:"/docs/instrumentation"},"integrating OpenTelemetry (OTel) Agents with your applications")," so that they send telemetry data to CubeAPM."))}d.isMDXComponent=!0},1516:(e,t,r)=>{r.d(t,{Z:()=>n});const n=r.p+"assets/images/architecture-604cb8f2c27c8d27642cc967e4d04731.svg"}}]);