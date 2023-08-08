"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[108],{4137:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>y});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),s=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(l.Provider,{value:t},e.children)},m="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),m=s(n),u=o,y=m["".concat(l,".").concat(u)]||m[u]||d[u]||a;return n?r.createElement(y,i(i({ref:t},c),{},{components:n})):r.createElement(y,i({ref:t},c))}));function y(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=u;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p[m]="string"==typeof e?e:o,i[1]=p;for(var s=2;s<a;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},4388:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>d,frontMatter:()=>a,metadata:()=>p,toc:()=>s});var r=n(7462),o=(n(7294),n(4137));const a={id:"nodeJs",title:"NodeJS",slug:"/instrumentation/nodejs"},i=void 0,p={unversionedId:"Instrumentation/nodeJs",id:"Instrumentation/nodeJs",title:"NodeJS",description:"Steps to configure CubeAPM",source:"@site/docs/Instrumentation/nodeJS.md",sourceDirName:"Instrumentation",slug:"/instrumentation/nodejs",permalink:"/docs/instrumentation/nodejs",draft:!1,editUrl:"https://github.com/cubeapm/docs/docs/docs/Instrumentation/nodeJS.md",tags:[],version:"current",frontMatter:{id:"nodeJs",title:"NodeJS",slug:"/instrumentation/nodejs"},sidebar:"tutorialSidebar",previous:{title:"Java",permalink:"/docs/instrumentation/java"},next:{title:"PHP Slim",permalink:"/docs/instrumentation/php-slim"}},l={},s=[{value:"Steps to configure CubeAPM",id:"steps-to-configure-cubeapm",level:2},{value:"Installation",id:"installation",level:3}],c={toc:s},m="wrapper";function d(e){let{components:t,...n}=e;return(0,o.kt)(m,(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"steps-to-configure-cubeapm"},"Steps to configure CubeAPM"),(0,o.kt)("h3",{id:"installation"},"Installation"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Create a new project directory"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre"}," mkdir <project_name>\n cd <project_name>\n"))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Install dependencies"),(0,o.kt)("p",{parentName:"li"},"First create an empty ",(0,o.kt)("inlineCode",{parentName:"p"},"package.json")," file in the current directory:"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre"},"npm init -y\n")),(0,o.kt)("p",{parentName:"li"},"Then install ",(0,o.kt)("inlineCode",{parentName:"p"},"Express")," framework in Node.js project:"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre"},"npm install express\n")),(0,o.kt)("p",{parentName:"li"},"Run the following commands to install the appropriate packages:"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre"},"npm install --save @opentelemetry/api\nnpm install --save @opentelemetry/sdk-node\nnpm install --save @opentelemetry/auto-instrumentations-node\nnpm install --save @opentelemetry/exporter-trace-otlp-grpc\n"))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Download tracing.js.txt attachment from the email, rename it to tracing.js, and place it at\nthe root of your project directory.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Add the following environment variables:"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre"},"SPYK_APPNAME: <appname_to_identify_the_app_on_spyk_dashboard>\nSPYK_TOKEN: <spyk_token>\n")),(0,o.kt)("p",{parentName:"li"},"Here's an example of how you can modify the script:"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre"},'export OTEL_TRACES_EXPORTER="otlp"\nexport OTEL_METRICS_EXPORTER="otlp"\nexport OTEL_EXPORTER_OTLP_ENDPOINT="your-endpoint" # Replace with your desired endpoint URL\nexport OTEL_EXPORTER_OTLP_HEADERS="authorization=Bearer your-token" # Replace \'your-token\' with your actual token value\nexport OTEL_NODE_RESOURCE_DETECTORS="env,host,os"\nexport OTEL_SERVICE_NAME="your-service-name"\nexport NODE_OPTIONS="--require @opentelemetry/auto-instrumentations-node/register"\nnode index.js\n')),(0,o.kt)("p",{parentName:"li"},"Alternatively, the following environment variables can be set:"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre"},'env OTEL_TRACES_EXPORTER=otlp \\\n    OTEL_EXPORTER_OTLP_ENDPOINT=your-endpoint \\\n    OTEL_EXPORTER_OTLP_HEADERS="authorization=Bearer your-token" \\\n    OTEL_NODE_RESOURCE_DETECTORS="env,host,os" \\\n    OTEL_SERVICE_NAME=your-service-name \\\n    NODE_OPTIONS="--require @opentelemetry/auto-instrumentations-node/register" \\\n    node index.js\n'))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Modify the application run command to include the argument ",(0,o.kt)("inlineCode",{parentName:"p"},"-r\npath/to/tracing.js"),". For example, if the run command is ",(0,o.kt)("inlineCode",{parentName:"p"},"node index.js"),", then\nchange it to ",(0,o.kt)("inlineCode",{parentName:"p"},"node -r path/to/tracing.js index.js"),". If you use pm2, you can add\nthis to ",(0,o.kt)("inlineCode",{parentName:"p"},"node_args")," in pm2 config. For example:\n",(0,o.kt)("inlineCode",{parentName:"p"},'node_args: "-r path/to/tracing.js <any_other_args>"')))))}d.isMDXComponent=!0}}]);