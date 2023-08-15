"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[356],{4137:(e,n,t)=>{t.d(n,{Zo:()=>p,kt:()=>d});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=r.createContext({}),u=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},p=function(e){var n=u(e.components);return r.createElement(s.Provider,{value:n},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},f=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),c=u(t),f=a,d=c["".concat(s,".").concat(f)]||c[f]||m[f]||i;return t?r.createElement(d,o(o({ref:n},p),{},{components:t})):r.createElement(d,o({ref:n},p))}));function d(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,o=new Array(i);o[0]=f;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l[c]="string"==typeof e?e:a,o[1]=l;for(var u=2;u<i;u++)o[u]=t[u];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}f.displayName="MDXCreateElement"},6402:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>o,default:()=>m,frontMatter:()=>i,metadata:()=>l,toc:()=>u});var r=t(7462),a=(t(7294),t(4137));const i={slug:"/install/configure-cubeapm"},o="Configure CubeAPM",l={unversionedId:"Installation/configure/configure",id:"Installation/configure/configure",title:"Configure CubeAPM",description:"Run cube --help to see a list of available configuration parameters, along with description and examples. Cube can be configured through command line arguments, configuration file, or environment variables. In case of environment variables, please prefix (CUBE) and replace dots (.) and dashes (-) with underscores (``) in variable names. For example:",source:"@site/docs/Installation/02_configure/02_configure.md",sourceDirName:"Installation/02_configure",slug:"/install/configure-cubeapm",permalink:"/install/configure-cubeapm",draft:!1,editUrl:"https://github.com/cubeapm/docs/docs/docs/Installation/02_configure/02_configure.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{slug:"/install/configure-cubeapm"},sidebar:"tutorialSidebar",previous:{title:"Kubernetes",permalink:"/install/install-cubeapm/kubernetes"},next:{title:"Sign in with Google",permalink:"/install/configure-cubeapm/sign-in-with-google"}},s={},u=[{value:"Essential Configuration",id:"essential-configuration",level:2}],p={toc:u},c="wrapper";function m(e){let{components:n,...t}=e;return(0,a.kt)(c,(0,r.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"configure-cubeapm"},"Configure CubeAPM"),(0,a.kt)("p",null,"Run ",(0,a.kt)("inlineCode",{parentName:"p"},"cube --help")," to see a list of available configuration parameters, along with description and examples. Cube can be configured through command line arguments, configuration file, or environment variables. In case of environment variables, please prefix (",(0,a.kt)("inlineCode",{parentName:"p"},"CUBE_"),") and replace dots (",(0,a.kt)("inlineCode",{parentName:"p"},"."),") and dashes (",(0,a.kt)("inlineCode",{parentName:"p"},"-"),") with underscores (",(0,a.kt)("inlineCode",{parentName:"p"},"_"),") in variable names. For example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"# command line parameter\n--metrics.update-interval 30s\n\n# configuration file\nmetrics.update-interval=30s\n\n# environment variable\nCUBE_METRICS_UPDATE_INTERVAL=30s\n")),(0,a.kt)("p",null,"If a parameter if specified through multiple means, the following order of preference applies (highest at top):"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"Command line arguments"),(0,a.kt)("li",{parentName:"ol"},"Environment variables"),(0,a.kt)("li",{parentName:"ol"},"Configuration file"),(0,a.kt)("li",{parentName:"ol"},"Default values set in code")),(0,a.kt)("h2",{id:"essential-configuration"},"Essential Configuration"),(0,a.kt)("p",null,"Cube provides reasonable defaults to configuration parameters wherever possible. However, some parameters do not have reasonable default values and therefore their values must be provided at the time of setup for Cube to start up. Following is a list of such parameters:"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"token")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"database.url")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"smtp.url")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"auth.database.url")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"auth.key.session")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"auth.key.tokens"))),(0,a.kt)("p",null,"In addition, the following configuration parameters have some default value, but it is quite likely that you may need to override them as per your environment for Cube to work properly."),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"base-url")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"data-dir")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"smtp.from")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"auth.sys-admins"))))}m.isMDXComponent=!0}}]);