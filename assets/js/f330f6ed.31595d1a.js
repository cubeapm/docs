"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[699],{4137:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>f});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},p="mdxType",b={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),p=c(n),m=a,f=p["".concat(s,".").concat(m)]||p[m]||b[m]||o;return n?r.createElement(f,l(l({ref:t},u),{},{components:n})):r.createElement(f,l({ref:t},u))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,l=new Array(o);l[0]=m;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[p]="string"==typeof e?e:a,l[1]=i;for(var c=2;c<o;c++)l[c]=n[c];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},6536:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>b,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var r=n(7462),a=(n(7294),n(4137));const o={sidebar_position:4,slug:"/install/install-cubeapm/kubernetes"},l="Kubernetes",i={unversionedId:"Installation/install/kubernetes",id:"Installation/install/kubernetes",title:"Kubernetes",description:"Cube can be deployed on Kubernetes using the official Helm charts.",source:"@site/docs/Installation/01_install/4_kubernetes.md",sourceDirName:"Installation/01_install",slug:"/install/install-cubeapm/kubernetes",permalink:"/docs/install/install-cubeapm/kubernetes",draft:!1,editUrl:"https://github.com/cubeapm/docs/docs/docs/Installation/01_install/4_kubernetes.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4,slug:"/install/install-cubeapm/kubernetes"},sidebar:"tutorialSidebar",previous:{title:"Docker",permalink:"/docs/install/install-cubeapm/docker"},next:{title:"Configure CubeAPM",permalink:"/docs/install/configure-cubeapm"}},s={},c=[],u={toc:c},p="wrapper";function b(e){let{components:t,...n}=e;return(0,a.kt)(p,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"kubernetes"},"Kubernetes"),(0,a.kt)("p",null,"Cube can be deployed on Kubernetes using the official Helm charts."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"helm repo add cubeapm https://charts.cubeapm.com\nhelm repo update\nhelm install cubeapm cubeapm/cubeapm\n")),(0,a.kt)("p",null,"Please refer to ",(0,a.kt)("a",{parentName:"p",href:"https://charts.cubeapm.com/charts/cubeapm/"},"CubeAPM Helm Chart documentation")," for details of various configuration parameters available."))}b.isMDXComponent=!0}}]);