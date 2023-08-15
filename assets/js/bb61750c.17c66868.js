"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[696],{4137:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>f});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=o.createContext({}),s=function(e){var t=o.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=s(e.components);return o.createElement(c.Provider,{value:t},e.children)},u="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},h=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=s(n),h=r,f=u["".concat(c,".").concat(h)]||u[h]||g[h]||a;return n?o.createElement(f,i(i({ref:t},p),{},{components:n})):o.createElement(f,i({ref:t},p))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=h;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[u]="string"==typeof e?e:r,i[1]=l;for(var s=2;s<a;s++)i[s]=n[s];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}h.displayName="MDXCreateElement"},6748:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>g,frontMatter:()=>a,metadata:()=>l,toc:()=>s});var o=n(7462),r=(n(7294),n(4137));const a={sidebar_position:6,slug:"/install/configure-cubeapm/connect-with-google-chat-for-alerting"},i="Connect with Google Chat for alerting",l={unversionedId:"Installation/configure/alerting_googlechat",id:"Installation/configure/alerting_googlechat",title:"Connect with Google Chat for alerting",description:"To send alert notifications to Google Chat, you need to create a Webhook in the Google Chat Space in which you want to receive notifications. The following steps guide you through the process:",source:"@site/docs/Installation/02_configure/6_alerting_googlechat.md",sourceDirName:"Installation/02_configure",slug:"/install/configure-cubeapm/connect-with-google-chat-for-alerting",permalink:"/install/configure-cubeapm/connect-with-google-chat-for-alerting",draft:!1,editUrl:"https://github.com/cubeapm/docs/docs/docs/Installation/02_configure/6_alerting_googlechat.md",tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6,slug:"/install/configure-cubeapm/connect-with-google-chat-for-alerting"},sidebar:"tutorialSidebar",previous:{title:"Connect with PagerDuty for alerting",permalink:"/install/configure-cubeapm/connect-with-pagerduty-for-alerting"},next:{title:"Instrumentation",permalink:"/instrumentation"}},c={},s=[],p={toc:s},u="wrapper";function g(e){let{components:t,...n}=e;return(0,r.kt)(u,(0,o.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"connect-with-google-chat-for-alerting"},"Connect with Google Chat for alerting"),(0,r.kt)("p",null,"To send alert notifications to Google Chat, you need to create a Webhook in the Google Chat Space in which you want to receive notifications. The following steps guide you through the process:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Login to your Gmail web interface (the following steps steps do not work on the app), and click on the ",(0,r.kt)("strong",{parentName:"li"},"Spaces")," icon in the left sidebar."),(0,r.kt)("li",{parentName:"ol"},"Select the Space in which you want to receive notifications. Then click on the space name at the top of the page. This will open a menu. Click on ",(0,r.kt)("strong",{parentName:"li"},"Apps and integrations")," in the menu."),(0,r.kt)("li",{parentName:"ol"},"On the popup that appears, click on ",(0,r.kt)("strong",{parentName:"li"},"Manage webhooks")," button at the bottom. Then click on ",(0,r.kt)("strong",{parentName:"li"},"Add another")," button at the bottom."),(0,r.kt)("li",{parentName:"ol"},"On the next screen, fill ",(0,r.kt)("inlineCode",{parentName:"li"},"CubeAPM")," for Name, and then click on ",(0,r.kt)("strong",{parentName:"li"},"Save")," button."),(0,r.kt)("li",{parentName:"ol"},"On the next screen, look for the ",(0,r.kt)("inlineCode",{parentName:"li"},"CubeAPM")," entry we just added, and click on ",(0,r.kt)("strong",{parentName:"li"},"Copy")," icon next to it."),(0,r.kt)("li",{parentName:"ol"},"When creating and alert, the above url can be provided to CubeAPM to send alert notifications to Google Chat.")))}g.isMDXComponent=!0}}]);