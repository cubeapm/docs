"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[174],{4137:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>k});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),s=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=s(e.components);return r.createElement(c.Provider,{value:t},e.children)},u="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},g=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=s(n),g=o,k=u["".concat(c,".").concat(g)]||u[g]||f[g]||a;return n?r.createElement(k,i(i({ref:t},p),{},{components:n})):r.createElement(k,i({ref:t},p))}));function k(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=g;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[u]="string"==typeof e?e:o,i[1]=l;for(var s=2;s<a;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}g.displayName="MDXCreateElement"},5902:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>f,frontMatter:()=>a,metadata:()=>l,toc:()=>s});var r=n(7462),o=(n(7294),n(4137));const a={sidebar_position:4,slug:"/install/configure-cubeapm/connect-with-slack-for-alerting"},i="Connect with Slack for alerting",l={unversionedId:"Installation/configure/alerting_slack",id:"Installation/configure/alerting_slack",title:"Connect with Slack for alerting",description:"To enable sending alert notifications to Slack, you need to create an app in your Slack workspace. The following steps guide you through the process:",source:"@site/docs/Installation/02_configure/4_alerting_slack.md",sourceDirName:"Installation/02_configure",slug:"/install/configure-cubeapm/connect-with-slack-for-alerting",permalink:"/install/configure-cubeapm/connect-with-slack-for-alerting",draft:!1,editUrl:"https://github.com/cubeapm/docs/docs/docs/Installation/02_configure/4_alerting_slack.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4,slug:"/install/configure-cubeapm/connect-with-slack-for-alerting"},sidebar:"tutorialSidebar",previous:{title:"Sign in with GitHub",permalink:"/install/configure-cubeapm/sign-in-with-github"},next:{title:"Connect with PagerDuty for alerting",permalink:"/install/configure-cubeapm/connect-with-pagerduty-for-alerting"}},c={},s=[],p={toc:s},u="wrapper";function f(e){let{components:t,...n}=e;return(0,o.kt)(u,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"connect-with-slack-for-alerting"},"Connect with Slack for alerting"),(0,o.kt)("p",null,"To enable sending alert notifications to Slack, you need to create an app in your Slack workspace. The following steps guide you through the process:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Go to ",(0,o.kt)("a",{parentName:"li",href:"https://api.slack.com/apps/"},"Slack apps page.")),(0,o.kt)("li",{parentName:"ol"},"Click on ",(0,o.kt)("strong",{parentName:"li"},"Create New App")," button, and then click on ",(0,o.kt)("strong",{parentName:"li"},"From scratch")," option in the popup."),(0,o.kt)("li",{parentName:"ol"},"On the next screen, fill ",(0,o.kt)("inlineCode",{parentName:"li"},"CubeAPM")," for App Name, select the desired Slack workspace, and then click on ",(0,o.kt)("strong",{parentName:"li"},"Create App")," button."),(0,o.kt)("li",{parentName:"ol"},"On the next page, look for ",(0,o.kt)("strong",{parentName:"li"},"Add features and functionality")," section, and click on ",(0,o.kt)("strong",{parentName:"li"},"Bots")," button there."),(0,o.kt)("li",{parentName:"ol"},"On the next page, click on ",(0,o.kt)("strong",{parentName:"li"},"Review Scopes to Add")," button."),(0,o.kt)("li",{parentName:"ol"},"On the next page, look for ",(0,o.kt)("strong",{parentName:"li"},"Bot Token Scopes")," sub-section under the ",(0,o.kt)("strong",{parentName:"li"},"Scopes")," section, click on ",(0,o.kt)("strong",{parentName:"li"},"Add an OAuth Scope")," button, and add the following scopes:",(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre"},"channels:read\nchat:write\nchat:write.public\ngroups:read\n"))),(0,o.kt)("li",{parentName:"ol"},"Now look for ",(0,o.kt)("strong",{parentName:"li"},"OAuth Tokens for Your Workspace")," section on the same page, and click on ",(0,o.kt)("strong",{parentName:"li"},"Install to Workspace")," button."),(0,o.kt)("li",{parentName:"ol"},"Click on ",(0,o.kt)("strong",{parentName:"li"},"Allow")," on the next screen. Look for ",(0,o.kt)("strong",{parentName:"li"},"Bot User OAuth Token")," on the subsequent page. The token value starts with ",(0,o.kt)("inlineCode",{parentName:"li"},"xoxb"),". Copy this token value."),(0,o.kt)("li",{parentName:"ol"},"The above token can be provided to CubeAPM to enable sending alert notifications to Slack.")))}f.isMDXComponent=!0}}]);