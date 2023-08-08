"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[747],{4137:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),p=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=p(e.components);return r.createElement(c.Provider,{value:t},e.children)},s="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),s=p(n),f=o,m=s["".concat(c,".").concat(f)]||s[f]||g[f]||a;return n?r.createElement(m,i(i({ref:t},u),{},{components:n})):r.createElement(m,i({ref:t},u))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=f;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[s]="string"==typeof e?e:o,i[1]=l;for(var p=2;p<a;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},1098:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>g,frontMatter:()=>a,metadata:()=>l,toc:()=>p});var r=n(7462),o=(n(7294),n(4137));const a={sidebar_position:5,slug:"/install/configure-cubeapm/connect-with-pagerduty-for-alerting"},i="Connect with PagerDuty for alerting",l={unversionedId:"Installation/configure/alerting_pagerduty",id:"Installation/configure/alerting_pagerduty",title:"Connect with PagerDuty for alerting",description:"To enable sending alert notifications to PagerDuty, you need to create an app in your PagerDuty account. The following steps guide you through the process:",source:"@site/docs/Installation/02_configure/5_alerting_pagerduty.md",sourceDirName:"Installation/02_configure",slug:"/install/configure-cubeapm/connect-with-pagerduty-for-alerting",permalink:"/docs/install/configure-cubeapm/connect-with-pagerduty-for-alerting",draft:!1,editUrl:"https://github.com/cubeapm/docs/docs/docs/Installation/02_configure/5_alerting_pagerduty.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5,slug:"/install/configure-cubeapm/connect-with-pagerduty-for-alerting"},sidebar:"tutorialSidebar",previous:{title:"Connect with Slack for alerting",permalink:"/docs/install/configure-cubeapm/connect-with-slack-for-alerting"},next:{title:"Instrumentation",permalink:"/docs/instrumentation"}},c={},p=[],u={toc:p},s="wrapper";function g(e){let{components:t,...n}=e;return(0,o.kt)(s,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"connect-with-pagerduty-for-alerting"},"Connect with PagerDuty for alerting"),(0,o.kt)("p",null,"To enable sending alert notifications to PagerDuty, you need to create an app in your PagerDuty account. The following steps guide you through the process:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Login to your PagerDuty account and go to ",(0,o.kt)("strong",{parentName:"li"},"Integrations \u2192 App Registration"),"."),(0,o.kt)("li",{parentName:"ol"},"Click on ",(0,o.kt)("strong",{parentName:"li"},"Create New App")," button."),(0,o.kt)("li",{parentName:"ol"},"On the next screen, fill ",(0,o.kt)("inlineCode",{parentName:"li"},"CubeAPM")," for App Name, ",(0,o.kt)("inlineCode",{parentName:"li"},"PagerDuty integration for CubeAPM")," for Description, and then click on ",(0,o.kt)("strong",{parentName:"li"},"Save")," button."),(0,o.kt)("li",{parentName:"ol"},"On the next page, look for ",(0,o.kt)("strong",{parentName:"li"},"Events Integration")," section, and click on ",(0,o.kt)("strong",{parentName:"li"},"Add")," button there."),(0,o.kt)("li",{parentName:"ol"},"On the next page, look for Simple Install Flow, and input ",(0,o.kt)("inlineCode",{parentName:"li"},"<cube_apm_address>"),"/ (e.g. ",(0,o.kt)("a",{parentName:"li",href:"https://cubeapm.yourdomain.com/"},"https://cubeapm.yourdomain.com/"),") for ",(0,o.kt)("strong",{parentName:"li"},"Redirect URLs"),"."),(0,o.kt)("li",{parentName:"ol"},"Upon filling ",(0,o.kt)("strong",{parentName:"li"},"Redirect URLs")," as above, ",(0,o.kt)("strong",{parentName:"li"},"Integration Setup URL")," will appear below it."),(0,o.kt)("li",{parentName:"ol"},"The value of ",(0,o.kt)("strong",{parentName:"li"},"Integration Setup URL")," will contain a URL parameter named ",(0,o.kt)("strong",{parentName:"li"},"app_id"),". Copy the value of app_id (something like AB12XYZ)."),(0,o.kt)("li",{parentName:"ol"},"Click on ",(0,o.kt)("strong",{parentName:"li"},"Save")," button at the bottom of the page."),(0,o.kt)("li",{parentName:"ol"},"The above app_id can be provided to CubeAPM to enable sending alert notifications to PagerDuty.")))}g.isMDXComponent=!0}}]);