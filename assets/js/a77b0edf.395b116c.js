"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1167],{5617:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>a,default:()=>d,frontMatter:()=>i,metadata:()=>c,toc:()=>l});var o=t(4848),r=t(8453);const i={sidebar_position:5,slug:"/install/configure-cubeapm/connect-with-pagerduty-for-alerting"},a="Connect with PagerDuty for alerting",c={id:"Installation/configure/alerting_pagerduty",title:"Connect with PagerDuty for alerting",description:"To enable sending alert notifications to PagerDuty, you need to create an app in your PagerDuty account. The following steps guide you through the process:",source:"@site/docs/Installation/02_configure/5_alerting_pagerduty.md",sourceDirName:"Installation/02_configure",slug:"/install/configure-cubeapm/connect-with-pagerduty-for-alerting",permalink:"/install/configure-cubeapm/connect-with-pagerduty-for-alerting",draft:!1,unlisted:!1,editUrl:"https://github.com/cubeapm/docs/docs/docs/Installation/02_configure/5_alerting_pagerduty.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5,slug:"/install/configure-cubeapm/connect-with-pagerduty-for-alerting"},sidebar:"tutorialSidebar",previous:{title:"Connect with Slack for alerting",permalink:"/install/configure-cubeapm/connect-with-slack-for-alerting"},next:{title:"Connect with Google Chat for alerting",permalink:"/install/configure-cubeapm/connect-with-google-chat-for-alerting"}},s={},l=[];function u(e){const n={a:"a",code:"code",h1:"h1",li:"li",ol:"ol",p:"p",strong:"strong",...(0,r.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{id:"connect-with-pagerduty-for-alerting",children:"Connect with PagerDuty for alerting"}),"\n",(0,o.jsx)(n.p,{children:"To enable sending alert notifications to PagerDuty, you need to create an app in your PagerDuty account. The following steps guide you through the process:"}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:["Login to your PagerDuty account and go to ",(0,o.jsx)(n.strong,{children:"Integrations \u2192 App Registration"}),"."]}),"\n",(0,o.jsxs)(n.li,{children:["Click on ",(0,o.jsx)(n.strong,{children:"Create New App"})," button."]}),"\n",(0,o.jsxs)(n.li,{children:["On the next screen, fill ",(0,o.jsx)(n.code,{children:"CubeAPM"})," for App Name, ",(0,o.jsx)(n.code,{children:"PagerDuty integration for CubeAPM"})," for Description, and then click on ",(0,o.jsx)(n.strong,{children:"Save"})," button."]}),"\n",(0,o.jsxs)(n.li,{children:["On the next page, look for ",(0,o.jsx)(n.strong,{children:"Events Integration"})," section, and click on ",(0,o.jsx)(n.strong,{children:"Add"})," button there."]}),"\n",(0,o.jsxs)(n.li,{children:["On the next page, look for ",(0,o.jsx)(n.strong,{children:"Simple Install Flow"}),", and input ",(0,o.jsx)(n.code,{children:"<cube_apm_address>/"})," (e.g. ",(0,o.jsx)(n.a,{href:"https://cubeapm.yourdomain.com/",children:"https://cubeapm.yourdomain.com/"}),") for ",(0,o.jsx)(n.strong,{children:"Redirect URLs"}),"."]}),"\n",(0,o.jsxs)(n.li,{children:["Upon filling ",(0,o.jsx)(n.strong,{children:"Redirect URLs"})," as above, ",(0,o.jsx)(n.strong,{children:"Integration Setup URL"})," will appear below it."]}),"\n",(0,o.jsxs)(n.li,{children:["The value of ",(0,o.jsx)(n.strong,{children:"Integration Setup URL"})," will contain a URL parameter named ",(0,o.jsx)(n.strong,{children:"app_id"}),". Copy the value of app_id (something like AB12XYZ)."]}),"\n",(0,o.jsxs)(n.li,{children:["Click on ",(0,o.jsx)(n.strong,{children:"Save"})," button at the bottom of the page."]}),"\n",(0,o.jsx)(n.li,{children:"The above app_id can be provided to CubeAPM to enable sending alert notifications to PagerDuty."}),"\n"]})]})}function d(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(u,{...e})}):u(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>c});var o=t(6540);const r={},i=o.createContext(r);function a(e){const n=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),o.createElement(i.Provider,{value:n},e.children)}}}]);