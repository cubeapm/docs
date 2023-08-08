"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[321],{4137:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>f});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),c=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,s=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),p=c(n),d=r,f=p["".concat(s,".").concat(d)]||p[d]||m[d]||l;return n?a.createElement(f,i(i({ref:t},u),{},{components:n})):a.createElement(f,i({ref:t},u))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,i=new Array(l);i[0]=d;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[p]="string"==typeof e?e:r,i[1]=o;for(var c=2;c<l;c++)i[c]=n[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5668:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>m,frontMatter:()=>l,metadata:()=>o,toc:()=>c});var a=n(7462),r=(n(7294),n(4137));const l={sidebar_position:2,slug:"/install/install-cubeapm/bare-metal-virtual-machine"},i="Bare Metal / Virtual Machine",o={unversionedId:"Installation/install/baremetal",id:"Installation/install/baremetal",title:"Bare Metal / Virtual Machine",description:"Run the following command. It downloads and executes the Cube install script.",source:"@site/docs/Installation/01_install/2_baremetal.md",sourceDirName:"Installation/01_install",slug:"/install/install-cubeapm/bare-metal-virtual-machine",permalink:"/docs/install/install-cubeapm/bare-metal-virtual-machine",draft:!1,editUrl:"https://github.com/cubeapm/docs/docs/docs/Installation/01_install/2_baremetal.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,slug:"/install/install-cubeapm/bare-metal-virtual-machine"},sidebar:"tutorialSidebar",previous:{title:"Install CubeAPM",permalink:"/docs/install/install-cubeapm"},next:{title:"Docker",permalink:"/docs/install/install-cubeapm/docker"}},s={},c=[{value:"Next Steps",id:"next-steps",level:2}],u={toc:c},p="wrapper";function m(e){let{components:t,...n}=e;return(0,r.kt)(p,(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"bare-metal--virtual-machine"},"Bare Metal / Virtual Machine"),(0,r.kt)("p",null,"Run the following command. It downloads and executes the Cube install script."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sh"},'sudo /bin/bash -c "$(curl -fsSL https://downloads.cubeapm.com/latest/install.sh)"\n')),(0,r.kt)("p",null,"The script performs the following tasks:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Detect CPU platform and OS of the host machine and download appropriate Cube binary file."),(0,r.kt)("li",{parentName:"ol"},"Set up Cube as a service if ",(0,r.kt)("inlineCode",{parentName:"li"},"systemctl")," is found on the host. A configuration file is also created at the path ",(0,r.kt)("inlineCode",{parentName:"li"},"/etc/cubeapm/config.properties"),".")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"By default, Cube UI is accessible at http://localhost:3125.")),(0,r.kt)("h2",{id:"next-steps"},"Next Steps"),(0,r.kt)("p",null,"After installing Cube, head over to the ",(0,r.kt)("a",{parentName:"p",href:"/docs/install/configure-cubeapm"},"Configure CubeAPM")," section for guidance on providing essential and other useful configuration to Cube."))}m.isMDXComponent=!0}}]);