"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[356],{4137:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>f});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=r.createContext({}),u=function(e){var n=r.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},c=function(e){var n=u(e.components);return r.createElement(l.Provider,{value:n},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),p=u(t),m=a,f=p["".concat(l,".").concat(m)]||p[m]||d[m]||o;return t?r.createElement(f,i(i({ref:n},c),{},{components:t})):r.createElement(f,i({ref:n},c))}));function f(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,i=new Array(o);i[0]=m;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s[p]="string"==typeof e?e:a,i[1]=s;for(var u=2;u<o;u++)i[u]=t[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},6402:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>u});var r=t(7462),a=(t(7294),t(4137));const o={slug:"/install/configure-cubeapm"},i="Configure CubeAPM",s={unversionedId:"Installation/configure/configure",id:"Installation/configure/configure",title:"Configure CubeAPM",description:"Cube can be configured through command line arguments, configuration file, or environment variables. In case of environment variables, please prefix (CUBE) and replace dots (.) and dashes (-) with underscores (``) in variable names. For example:",source:"@site/docs/Installation/02_configure/02_configure.md",sourceDirName:"Installation/02_configure",slug:"/install/configure-cubeapm",permalink:"/install/configure-cubeapm",draft:!1,editUrl:"https://github.com/cubeapm/docs/docs/docs/Installation/02_configure/02_configure.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{slug:"/install/configure-cubeapm"},sidebar:"tutorialSidebar",previous:{title:"Kubernetes",permalink:"/install/install-cubeapm/kubernetes"},next:{title:"Sign in with Google",permalink:"/install/configure-cubeapm/sign-in-with-google"}},l={},u=[{value:"Essential Configuration",id:"essential-configuration",level:2},{value:"Configuration Reference",id:"configuration-reference",level:2}],c={toc:u},p="wrapper";function d(e){let{components:n,...t}=e;return(0,a.kt)(p,(0,r.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"configure-cubeapm"},"Configure CubeAPM"),(0,a.kt)("p",null,"Cube can be configured through command line arguments, configuration file, or environment variables. In case of environment variables, please prefix (",(0,a.kt)("inlineCode",{parentName:"p"},"CUBE_"),") and replace dots (",(0,a.kt)("inlineCode",{parentName:"p"},"."),") and dashes (",(0,a.kt)("inlineCode",{parentName:"p"},"-"),") with underscores (",(0,a.kt)("inlineCode",{parentName:"p"},"_"),") in variable names. For example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"# command line parameter\n--metrics.update-interval 30s\n\n# configuration file\nmetrics.update-interval=30s\n\n# environment variable\nCUBE_METRICS_UPDATE_INTERVAL=30s\n")),(0,a.kt)("p",null,"If a parameter if specified through multiple means, the following order of preference applies (highest at top):"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"Command line arguments"),(0,a.kt)("li",{parentName:"ol"},"Environment variables"),(0,a.kt)("li",{parentName:"ol"},"Configuration file"),(0,a.kt)("li",{parentName:"ol"},"Default values set in code")),(0,a.kt)("h2",{id:"essential-configuration"},"Essential Configuration"),(0,a.kt)("p",null,"Cube provides reasonable defaults to configuration parameters wherever possible. However, some parameters do not have reasonable default values and therefore their values must be provided at the time of setup for Cube to start up. Following is a list of such parameters:"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"token")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"smtp.url")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"database.url")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"auth.database.url")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"auth.key.session")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"auth.key.tokens"))),(0,a.kt)("p",null,"In addition, the following configuration parameters have some default value, but it is quite likely that you may need to override them as per your environment for Cube to work properly."),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"base-url")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"auth.sys-admins")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"cluster.peers")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"smtp.from")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"time-zone"))),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},"For security reasons, CubeAPM requires HTTPS. Hence, it needs to be deployed behind a load balancer or reverse proxy with SSL termination capability."),(0,a.kt)("p",{parentName:"admonition"},"However, for ease of initial exploration, HTTP can be used with ",(0,a.kt)("inlineCode",{parentName:"p"},"localhost"),"/",(0,a.kt)("inlineCode",{parentName:"p"},"127.0.0.1")," only.")),(0,a.kt)("h2",{id:"configuration-reference"},"Configuration Reference"),(0,a.kt)("p",null,"Below is the list of all configuration parameters supported by CubeAPM, along with documentation and default values."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'## CubeAPM configuration parameters\n\n\n## Mandatory Parameters: CubeAPM will not start if any of these is not provided\n\n# Account token obtained from CubeAPM. This token is used for authentication with CubeAPM.\ntoken=\n\n# URL of SMTP server for sending emails, e.g., reset password email, alert notifications.\n# Example:\n#  smtp.url=smtp://<username>:<password>@<mailserver>:25/?disable_starttls=false\nsmtp.url=\n\n# URL of database for storing config data (settings, dashboards, etc.).\n# Example:\n#  database.url=mysql://<username>:<password>@tcp(<host>:3306)/<db_name>\n#  database.url=postgres://<username>:<password>@<host>:5432/<db_name>?sslmode=disable\ndatabase.url=\n\n# URL of database for storing user accounts data.\n# Example:\n#  auth.database.url=mysql://<username>:<password>@tcp(<host>:3306)/<db_name>\n#  auth.database.url=postgres://<username>:<password>@<host>:5432/<db_name>?sslmode=disable\nauth.database.url=\n\n# Encryption key for session data. Must be 32 characters long. Can use hex encoded UUID without dashes.\nauth.key.session=\n\n# Encryption key for tokens. Must be 32 characters long. Can use hex encoded UUID without dashes.\nauth.key.tokens=\n\n\n\n## Important Parameters: You will quite likely need to set these as per your environment for CubeAPM to work properly.\n\n# URL used by users to access Cube APM. This is used to generate URLs in emails and alerts.\n# If you use reverse proxy and sub path specify full url (with sub path).\n# Examples: http://cube.yourdomain.com, https://yourdomain.com/cube, http://10.0.0.1:3125\nbase-url=http://localhost:3125\n\n# Comma separated list of email ids of users to be given sysadmin privilege.\nauth.sys-admins=\n\n# Comma separated list of all nodes in the cluster, e.g., 10.0.0.1,10.0.0.2,10.0.0.3. Leave empty for single node operation.\ncluster.peers=\n\n# Email address of sender. Your SMTP server must be configured to allow sending emails from this address.\nsmtp.from=no-reply@cubeapm.com\n\n# Timezone of CubeAPM users. While most of the timezone related operations are done on the browser using browser\'s time zone setting, a few operations need to be performed on the server and they use this setting.\n# Examples: America/Los_Angeles, Asia/Kolkata, UTC\ntime-zone=UTC\n\n\n\n## Optional Parameters\n\n# Client ID for Sign in with GitHub\nauth.oidc.github.client-id=\n\n# Client secret for Sign in with GitHub\nauth.oidc.github.client-secret=\n\n# Client ID for Sign in with Google\nauth.oidc.google.client-id=\n\n# Client secret for Sign in with Google\nauth.oidc.google.client-secret=\n\n# App ID for sending alert notifications on PagerDuty.\nalertmanager.oauth.pagerduty.app-id=\n\n# Bot user OAuth token for sending alert notifications on Slack. Slack bot tokens start with \'xoxb\'.\nalertmanager.oauth.slack.token=\n\n# Disable the built-in demo trace generator\ntracegen.disable=false\n\n# Minimal allowed log Level. Supported values are debug, info, warn, and error.\nlog-level=warn\n\n\n\n## Tuning Parameters\n\n# Static files (e.g. graph images for alerts) retention period\nfiles.retention=720h\n\n# Metrics retention period. Must be between 24h0m0s and 1440h0m0s.\nmetrics.retention=720h\n\n# Traces retention period. Must be between 1h0m0s and 720h0m0s.\ntraces.retention=72h\n\n\n\n## Default values are generally good for the following parameters\n\n# Host to bind http server on\nhttp-host=0.0.0.0\n\n# Port to bind http server on\nhttp-port=3125\n\n# Port to use for internal distribution of incoming traces data\ncluster.port.distributor=3126\n\n# Port to use for internal exchange of data between nodes for serving read requests\ncluster.port.read=3127\n\n# Port to use for internal exchange of data between nodes for maintaining cluster state\ncluster.port.state=3129\n\n# Port to use for internal exchange of data between nodes for serving write requests\ncluster.port.write=3128\n\n# Disable OTLP grpc receiver\ncollector.otlp.grpc-disable=false\n\n# Host to bind OTLP grpc receiver on\ncollector.otlp.grpc-host=0.0.0.0\n\n# Port to bind OTLP grpc receiver on\ncollector.otlp.grpc-port=4317\n\n# Disable OTLP http receiver\ncollector.otlp.http-disable=false\n\n# Host to bind OTLP http receiver on\ncollector.otlp.http-host=0.0.0.0\n\n# Port to bind OTLP http receiver on\ncollector.otlp.http-port=4318\n\n# Disable charts in alert notifications\nalertmanager.charts.disable=false\n\n\n\n## Advanced Parameters: Changing values of these parameters can impact CubeAPM performance adversely, hence these should not be changed without consultation with CubeAPM support team\n\n# Directory to store data in (default "./data")\ndata-dir=\n\n# Explicit address to advertise in cluster, e.g. 10.0.0.1. If not specified, CubeAPM will try to detect the address automatically.\ncluster.advertise-address=\n\n# By default, CubeAPM only uses private IP address as the advertise address. Set this flag to true to allow public IP addresses to be used.\ncluster.allow-insecure-advertise=false\n\n# Replication factor for the ingested data. Default is size_of_cluster/2 + 1\ncluster.replication-factor=\n\n# Tag name for environment.\n# If set, the value of this tag in traces will be used as the value of env label in metrics. (default "")\ncollector.env-tag=cube.environment\n\n# Comma separated list of allowed origins for CORS requests.\n# Examples: "http://*.domain.com", "*"\ncollector.otlp.http.cors.origins=\n\n# Path to config file for extending CubeAPM metrics with custom labels.\nmetrics.custom-labels-config-file=\n\n# Metrics update interval. Must be between 500ms and 1m0s.\nmetrics.update-interval=15s\n\n# Delay before shutdown. During this delay, health check returns non-OK responses so load balancers can route new requests to other servers.\nshutdown-delay=0s\n\n# Path to config file for creating custom indexes on traces.\ntraces.custom-indexes-config-file=\n\n\n## End of CubeAPM configuration parameters\n')))}d.isMDXComponent=!0}}]);