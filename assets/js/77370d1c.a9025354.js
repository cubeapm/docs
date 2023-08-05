"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[785],{4137:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>f});var l=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,l)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,l,r=function(e,t){if(null==e)return{};var n,l,r={},a=Object.keys(e);for(l=0;l<a.length;l++)n=a[l],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(l=0;l<a.length;l++)n=a[l],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=l.createContext({}),c=function(e){var t=l.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=c(e.components);return l.createElement(s.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return l.createElement(l.Fragment,{},t)}},m=l.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,s=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),u=c(n),m=r,f=u["".concat(s,".").concat(m)]||u[m]||d[m]||a;return n?l.createElement(f,o(o({ref:t},p),{},{components:n})):l.createElement(f,o({ref:t},p))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,o=new Array(a);o[0]=m;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[u]="string"==typeof e?e:r,o[1]=i;for(var c=2;c<a;c++)o[c]=n[c];return l.createElement.apply(null,o)}return l.createElement.apply(null,n)}m.displayName="MDXCreateElement"},7646:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>d,frontMatter:()=>a,metadata:()=>i,toc:()=>c});var l=n(7462),r=(n(7294),n(4137));const a={slug:"/install/install-cubeapm"},o="Install CubeAPM",i={unversionedId:"Installation/install/install",id:"Installation/install/install",title:"Install CubeAPM",description:"Supported Platforms",source:"@site/docs/Installation/01_install/01_install.md",sourceDirName:"Installation/01_install",slug:"/install/install-cubeapm",permalink:"/docs/docs/install/install-cubeapm",draft:!1,editUrl:"https://github.com/cubeapm/docs/docs/docs/Installation/01_install/01_install.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{slug:"/install/install-cubeapm"},sidebar:"tutorialSidebar",previous:{title:"Introduction",permalink:"/docs/docs/introduction"},next:{title:"Bare Metal / Virtual Machine",permalink:"/docs/docs/install/install-cubeapm/bare-metal-virtual-machine"}},s={},c=[{value:"Supported Platforms",id:"supported-platforms",level:2},{value:"Installation Steps",id:"installation-steps",level:2}],p={toc:c},u="wrapper";function d(e){let{components:t,...n}=e;return(0,r.kt)(u,(0,l.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"install-cubeapm"},"Install CubeAPM"),(0,r.kt)("h2",{id:"supported-platforms"},"Supported Platforms"),(0,r.kt)("p",null,"All the code of Cube is compiled and packaged in a single binary with no external dependency. It can be installed on Linux and Mac platforms with 64-bit Intel/AMD/ARM processors."),(0,r.kt)("h2",{id:"installation-steps"},"Installation Steps"),(0,r.kt)("p",null,"Please follow the links below for installation steps according to deployment environment."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/docs/install/install-cubeapm/bare-metal-virtual-machine"},"Bare Metal / Virtual Machine")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/docs/install/install-cubeapm/docker"},"Docker")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/docs/install/install-cubeapm/kubernetes"},"Kubernetes")," (via Helm)")))}d.isMDXComponent=!0}}]);