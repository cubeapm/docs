"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[906],{4137:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>f});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),s=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=s(e.components);return r.createElement(c.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=s(n),d=a,f=p["".concat(c,".").concat(d)]||p[d]||m[d]||o;return n?r.createElement(f,i(i({ref:t},u),{},{components:n})):r.createElement(f,i({ref:t},u))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[p]="string"==typeof e?e:a,i[1]=l;for(var s=2;s<o;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},8322:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>l,toc:()=>s});var r=n(7462),a=(n(7294),n(4137));const o={sidebar_position:3,slug:"/install/install-cubeapm/docker"},i="Docker",l={unversionedId:"Installation/install/docker",id:"Installation/install/docker",title:"Docker",description:"Cube is also available as a Docker image. Run the following command to start Cube in a Docker container.",source:"@site/docs/Installation/01_install/3_docker.md",sourceDirName:"Installation/01_install",slug:"/install/install-cubeapm/docker",permalink:"/install/install-cubeapm/docker",draft:!1,editUrl:"https://github.com/cubeapm/docs/docs/docs/Installation/01_install/3_docker.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,slug:"/install/install-cubeapm/docker"},sidebar:"tutorialSidebar",previous:{title:"Bare Metal / Virtual Machine",permalink:"/install/install-cubeapm/bare-metal-virtual-machine"},next:{title:"Kubernetes",permalink:"/install/install-cubeapm/kubernetes"}},c={},s=[],u={toc:s},p="wrapper";function m(e){let{components:t,...n}=e;return(0,a.kt)(p,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"docker"},"Docker"),(0,a.kt)("p",null,"Cube is also available as a Docker image. Run the following command to start Cube in a Docker container."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"docker run -d --name cubeapm \\\n-p 3125:3125 -p 4317:4317 -p 4318:4318 \\\n-v cube_data:/root/data \\\n-v ./config.properties:/etc/cubeapm/config.properties \\\ncubeapm/cubeapm:v1.4.0 \\\n--config-file /etc/cubeapm/config.properties\n")),(0,a.kt)("p",null,"The above command assumes you have a file ",(0,a.kt)("inlineCode",{parentName:"p"},"config.properties")," in your current working directory. See ",(0,a.kt)("a",{parentName:"p",href:"/install/configure-cubeapm"},"Configure CubeAPM")," section for guidance on providing essential and other useful configuration to Cube."))}m.isMDXComponent=!0}}]);