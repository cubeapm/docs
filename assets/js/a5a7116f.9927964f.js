"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[784],{4137:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>d});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=o.createContext({}),p=function(e){var t=o.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=p(e.components);return o.createElement(c.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},g=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,c=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),u=p(n),g=r,d=u["".concat(c,".").concat(g)]||u[g]||m[g]||a;return n?o.createElement(d,i(i({ref:t},s),{},{components:n})):o.createElement(d,i({ref:t},s))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=g;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[u]="string"==typeof e?e:r,i[1]=l;for(var p=2;p<a;p++)i[p]=n[p];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}g.displayName="MDXCreateElement"},7198:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>m,frontMatter:()=>a,metadata:()=>l,toc:()=>p});var o=n(7462),r=(n(7294),n(4137));const a={sidebar_position:2,slug:"/install/configure-cubeapm/sign-in-with-google"},i="Sign in with Google",l={unversionedId:"Installation/configure/oauth_google",id:"Installation/configure/oauth_google",title:"Sign in with Google",description:"To enable Sign in with Google, you need to create an OAuth app in your Google Workspace account. The following steps guide you through the process:",source:"@site/docs/Installation/02_configure/2_oauth_google.md",sourceDirName:"Installation/02_configure",slug:"/install/configure-cubeapm/sign-in-with-google",permalink:"/install/configure-cubeapm/sign-in-with-google",draft:!1,editUrl:"https://github.com/cubeapm/docs/docs/docs/Installation/02_configure/2_oauth_google.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,slug:"/install/configure-cubeapm/sign-in-with-google"},sidebar:"tutorialSidebar",previous:{title:"Configure CubeAPM",permalink:"/install/configure-cubeapm"},next:{title:"Sign in with GitHub",permalink:"/install/configure-cubeapm/sign-in-with-github"}},c={},p=[],s={toc:p},u="wrapper";function m(e){let{components:t,...n}=e;return(0,r.kt)(u,(0,o.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"sign-in-with-google"},"Sign in with Google"),(0,r.kt)("p",null,"To enable Sign in with Google, you need to create an OAuth app in your Google Workspace account. The following steps guide you through the process:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Go to ",(0,r.kt)("a",{parentName:"li",href:"https://console.cloud.google.com/"},"Google Cloud Console")," \u2192 ",(0,r.kt)("a",{parentName:"li",href:"https://console.cloud.google.com/apis/"},"APIs & Services"),"."),(0,r.kt)("li",{parentName:"ol"},"Using the project dropdown menu, create a new project with the name ",(0,r.kt)("strong",{parentName:"li"},"CubeAPM"),"."),(0,r.kt)("li",{parentName:"ol"},"Go to ",(0,r.kt)("a",{parentName:"li",href:"https://console.cloud.google.com/apis/credentials/consent"},"OAuth consent screen"),", and fill the following:",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Application type"),": Internal"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Application name"),": CubeAPM"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"User support email"),": Your email address"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Application home page"),": Address at which CubeAPM is accessible in your environment, e.g., ",(0,r.kt)("a",{parentName:"li",href:"https://cubeapm.yourdomain.com/"},"https://cubeapm.yourdomain.com/")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Authorised domains"),": Your primary domain, e.g., yourdomain.com"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Developer email addresses"),": Your email address"))),(0,r.kt)("li",{parentName:"ol"},"Go to next screen (Scopes), click on ",(0,r.kt)("strong",{parentName:"li"},"Add or Remove Scopes"),", and add the following scopes:",(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},".../auth/userinfo.email\n.../auth/userinfo.profile\n"))),(0,r.kt)("li",{parentName:"ol"},"Go to next screen, and review the information provided."),(0,r.kt)("li",{parentName:"ol"},"Go to ",(0,r.kt)("a",{parentName:"li",href:"https://console.cloud.google.com/apis/credentials"},"Credentials"),", and click on ",(0,r.kt)("strong",{parentName:"li"},"Create Credentials")," \u2192 ",(0,r.kt)("strong",{parentName:"li"},"OAuth client ID"),". Fill the following:",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Application type"),": Web application"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Name"),": CubeAPM"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Authorised redirect URIs"),": ",(0,r.kt)("inlineCode",{parentName:"li"},"<cube_apm_address>/api/auth/self-service/methods/oidc/callback/google"),", e.g., ",(0,r.kt)("a",{parentName:"li",href:"https://cubeapm.yourdomain.com/api/auth/self-service/methods/oidc/callback/google"},"https://cubeapm.yourdomain.com/api/auth/self-service/methods/oidc/callback/google")))),(0,r.kt)("li",{parentName:"ol"},"Save the configuration and copy the Client ID and Client secret."),(0,r.kt)("li",{parentName:"ol"},"The above Client ID and Client Secret can be provided to CubeAPM to enable Sign in with Google.")))}m.isMDXComponent=!0}}]);