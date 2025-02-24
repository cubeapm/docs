"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[375],{3428:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>u,frontMatter:()=>c,metadata:()=>t,toc:()=>a});const t=JSON.parse('{"id":"Installation/configure/oauth_github","title":"Sign in with GitHub","description":"To enable Sign in with GitHub, you need to create a GitHub app in your GitHub organization. The following steps guide you through the process:","source":"@site/docs/Installation/02_configure/3_oauth_github.md","sourceDirName":"Installation/02_configure","slug":"/install/configure-cubeapm/sign-in-with-github","permalink":"/install/configure-cubeapm/sign-in-with-github","draft":false,"unlisted":false,"editUrl":"https://github.com/cubeapm/docs/docs/docs/Installation/02_configure/3_oauth_github.md","tags":[],"version":"current","sidebarPosition":3,"frontMatter":{"sidebar_position":3,"slug":"/install/configure-cubeapm/sign-in-with-github"},"sidebar":"tutorialSidebar","previous":{"title":"Sign in with Google","permalink":"/install/configure-cubeapm/sign-in-with-google"},"next":{"title":"Connect with Slack for alerting","permalink":"/install/configure-cubeapm/connect-with-slack-for-alerting"}}');var s=i(4848),o=i(8453);const c={sidebar_position:3,slug:"/install/configure-cubeapm/sign-in-with-github"},r="Sign in with GitHub",l={},a=[];function h(e){const n={a:"a",code:"code",h1:"h1",header:"header",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"sign-in-with-github",children:"Sign in with GitHub"})}),"\n",(0,s.jsx)(n.p,{children:"To enable Sign in with GitHub, you need to create a GitHub app in your GitHub organization. The following steps guide you through the process:"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["Go to Create GitHub app page for your organization (",(0,s.jsx)(n.a,{href:"https://github.com/organizations/",children:"https://github.com/organizations/"}),(0,s.jsx)("code",{children:"<org_name>"}),"/settings/apps/new).\nFill in the following:","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"GitHub App name"}),": CubeAPM"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Homepage URL"}),": Address at which CubeAPM is accessible in your environment, e.g., ",(0,s.jsx)(n.a,{href:"https://cubeapm.yourdomain.com/",children:"https://cubeapm.yourdomain.com/"})]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Callback URL"}),": ",(0,s.jsx)(n.code,{children:"<cube_apm_address>/api/auth/self-service/methods/oidc/callback/github"}),", e.g., ",(0,s.jsx)(n.a,{href:"https://cubeapm.yourdomain.com/api/auth/self-service/methods/oidc/callback/github",children:"https://cubeapm.yourdomain.com/api/auth/self-service/methods/oidc/callback/github"})]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["Uncheck ",(0,s.jsx)(n.strong,{children:"Webhook"})," \u2192 ",(0,s.jsx)(n.strong,{children:"Active"})," (CubeAPM does not need WebHook access)."]}),"\n",(0,s.jsxs)(n.li,{children:["Change ",(0,s.jsx)(n.strong,{children:"Permissions"})," \u2192 ",(0,s.jsx)(n.strong,{children:"Account permissions"})," \u2192 ",(0,s.jsx)(n.strong,{children:"Email addresses"})," from ",(0,s.jsx)(n.code,{children:"Access: No access"})," to ",(0,s.jsx)(n.code,{children:"Access: Read-only"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:["Set ",(0,s.jsx)(n.strong,{children:"Where can this GitHub App be installed?"})," to ",(0,s.jsx)(n.strong,{children:"Only on this account"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:["Click ",(0,s.jsx)(n.strong,{children:"Create GitHub App"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:["Click ",(0,s.jsx)(n.strong,{children:"Generate a new client secret"}),". Copy the Client ID and Client secret."]}),"\n",(0,s.jsx)(n.li,{children:"The above Client ID and Client Secret can be provided to CubeAPM to enable Sign in with GitHub."}),"\n"]})]})}function u(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>c,x:()=>r});var t=i(6540);const s={},o=t.createContext(s);function c(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:c(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);