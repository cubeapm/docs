"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[386],{4137:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>b});var i=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,i,r=function(e,t){if(null==e)return{};var n,i,r={},a=Object.keys(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=i.createContext({}),s=function(e){var t=i.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=s(e.components);return i.createElement(c.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},g=i.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,c=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=s(n),g=r,b=p["".concat(c,".").concat(g)]||p[g]||m[g]||a;return n?i.createElement(b,o(o({ref:t},u),{},{components:n})):i.createElement(b,o({ref:t},u))}));function b(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,o=new Array(a);o[0]=g;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[p]="string"==typeof e?e:r,o[1]=l;for(var s=2;s<a;s++)o[s]=n[s];return i.createElement.apply(null,o)}return i.createElement.apply(null,n)}g.displayName="MDXCreateElement"},6256:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>m,frontMatter:()=>a,metadata:()=>l,toc:()=>s});var i=n(7462),r=(n(7294),n(4137));const a={sidebar_position:3,slug:"/install/configure-cubeapm/sign-in-with-github"},o="Sign in with GitHub",l={unversionedId:"Installation/configure/oauth_github",id:"Installation/configure/oauth_github",title:"Sign in with GitHub",description:"To enable Sign in with GitHub, you need to create a GitHub app in your GitHub organization. The following steps guide you through the process:",source:"@site/docs/Installation/02_configure/3_oauth_github.md",sourceDirName:"Installation/02_configure",slug:"/install/configure-cubeapm/sign-in-with-github",permalink:"/install/configure-cubeapm/sign-in-with-github",draft:!1,editUrl:"https://github.com/cubeapm/docs/docs/docs/Installation/02_configure/3_oauth_github.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,slug:"/install/configure-cubeapm/sign-in-with-github"},sidebar:"tutorialSidebar",previous:{title:"Sign in with Google",permalink:"/install/configure-cubeapm/sign-in-with-google"},next:{title:"Connect with Slack for alerting",permalink:"/install/configure-cubeapm/connect-with-slack-for-alerting"}},c={},s=[],u={toc:s},p="wrapper";function m(e){let{components:t,...n}=e;return(0,r.kt)(p,(0,i.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"sign-in-with-github"},"Sign in with GitHub"),(0,r.kt)("p",null,"To enable Sign in with GitHub, you need to create a GitHub app in your GitHub organization. The following steps guide you through the process:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Go to Create GitHub app page for your organization (",(0,r.kt)("a",{parentName:"li",href:"https://github.com/organizations/"},"https://github.com/organizations/"),"<org_name>/settings/apps/new). Fill in the following:",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"GitHub App name"),": CubeAPM"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Homepage URL"),": Address at which CubeAPM is accessible in your environment, e.g., ",(0,r.kt)("a",{parentName:"li",href:"https://cubeapm.yourdomain.com/"},"https://cubeapm.yourdomain.com/")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Callback URL"),": ",(0,r.kt)("inlineCode",{parentName:"li"},"<cube_apm_address>/api/auth/self-service/methods/oidc/callback/github"),", e.g., ",(0,r.kt)("a",{parentName:"li",href:"https://cubeapm.yourdomain.com/api/auth/self-service/methods/oidc/callback/github"},"https://cubeapm.yourdomain.com/api/auth/self-service/methods/oidc/callback/github")))),(0,r.kt)("li",{parentName:"ol"},"Uncheck ",(0,r.kt)("strong",{parentName:"li"},"Webhook")," \u2192 ",(0,r.kt)("strong",{parentName:"li"},"Active")," (CubeAPM does not need WebHook access)."),(0,r.kt)("li",{parentName:"ol"},"Change ",(0,r.kt)("strong",{parentName:"li"},"Permissions")," \u2192 ",(0,r.kt)("strong",{parentName:"li"},"Account permissions")," \u2192 ",(0,r.kt)("strong",{parentName:"li"},"Email addresses")," from ",(0,r.kt)("inlineCode",{parentName:"li"},"Access: No access")," to ",(0,r.kt)("inlineCode",{parentName:"li"},"Access: Read-only"),"."),(0,r.kt)("li",{parentName:"ol"},"Set ",(0,r.kt)("strong",{parentName:"li"},"Where can this GitHub App be installed?")," to ",(0,r.kt)("strong",{parentName:"li"},"Only on this account"),"."),(0,r.kt)("li",{parentName:"ol"},"Click ",(0,r.kt)("strong",{parentName:"li"},"Create GitHub App"),"."),(0,r.kt)("li",{parentName:"ol"},"Click ",(0,r.kt)("strong",{parentName:"li"},"Generate a new client secret"),". Copy the Client ID and Client secret."),(0,r.kt)("li",{parentName:"ol"},"The above Client ID and Client Secret can be provided to CubeAPM to enable Sign in with GitHub.")))}m.isMDXComponent=!0}}]);