"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7],{5641:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>u,frontMatter:()=>r,metadata:()=>o,toc:()=>l});const o=JSON.parse('{"id":"Installation/install/docker","title":"Docker","description":"CubeAPM is also available as a Docker image. Run the following command to start CubeAPM in a Docker container.","source":"@site/docs/Installation/01_install/3_docker.md","sourceDirName":"Installation/01_install","slug":"/install/install-cubeapm/docker","permalink":"/install/install-cubeapm/docker","draft":false,"unlisted":false,"editUrl":"https://github.com/cubeapm/docs/docs/docs/Installation/01_install/3_docker.md","tags":[],"version":"current","sidebarPosition":3,"frontMatter":{"sidebar_position":3,"slug":"/install/install-cubeapm/docker"},"sidebar":"tutorialSidebar","previous":{"title":"Bare Metal / Virtual Machine","permalink":"/install/install-cubeapm/bare-metal-virtual-machine"},"next":{"title":"Kubernetes","permalink":"/install/install-cubeapm/kubernetes"}}');var a=t(4848),s=t(8453);const r={sidebar_position:3,slug:"/install/install-cubeapm/docker"},i="Docker",c={},l=[{value:"Docker Compose",id:"docker-compose",level:2}];function p(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.header,{children:(0,a.jsx)(n.h1,{id:"docker",children:"Docker"})}),"\n",(0,a.jsx)(n.p,{children:"CubeAPM is also available as a Docker image. Run the following command to start CubeAPM in a Docker container."}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-shell",children:"docker run -d --name cubeapm \\\n-p 3125:3125 -p 3130:3130 -p 4317:4317 -p 4318:4318 \\\n-v cube_data:/root/data \\\n-v ./config.properties:/etc/cubeapm/config.properties \\\ncubeapm/cubeapm:v1.11.0 \\\n--config-file /etc/cubeapm/config.properties\n"})}),"\n",(0,a.jsxs)(n.p,{children:["The above command assumes you have a file ",(0,a.jsx)(n.code,{children:"config.properties"})," in your current working directory. See ",(0,a.jsx)(n.a,{href:"/install/configure-cubeapm",children:"Configure CubeAPM"})," section for details of all available configuration parameters."]}),"\n",(0,a.jsx)(n.h2,{id:"docker-compose",children:"Docker Compose"}),"\n",(0,a.jsxs)(n.p,{children:["The following docker compose config installs a fully working three-node cluster of CubeAPM. After running ",(0,a.jsx)(n.code,{children:"docker compose up"}),", CubeAPM will be availabe on ",(0,a.jsx)(n.a,{href:"http://localhost:3125",children:"http://localhost:3125"}),". Also, a webmail UI will be available at ",(0,a.jsx)(n.a,{href:"http://localhost:4436",children:"http://localhost:4436"}),". Any emails sent by CubeAPM will be available on this webmail UI."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-yaml",metastring:'title="docker-compose.yml"',children:'version: "3"\nservices:\n  cubeapm1:\n    image: cubeapm/cubeapm:v1.11.0\n    volumes:\n      - ./data_volume/cubeapm/cubeapm1:/root/data\n      # - ./config.properties:/root/config.properties\n    # Use volume mount above if inline config is not supported\n    configs:\n      - source: cubeapm\n        target: /root/config.properties\n    environment:\n      - CUBE_CONFIG_FILE=/root/config.properties\n    healthcheck:\n      test: "netstat -ltn | grep -c \':3125\'"\n    depends_on:\n      mysql:\n        condition: service_healthy\n      mysql_auth:\n        condition: service_healthy\n    restart: always\n  cubeapm2:\n    image: cubeapm/cubeapm:v1.11.0\n    volumes:\n      - ./data_volume/cubeapm/cubeapm2:/root/data\n      # - ./config.properties:/root/config.properties\n    # Use volume mount above if inline config is not supported\n    configs:\n      - source: cubeapm\n        target: /root/config.properties\n    environment:\n      - CUBE_CONFIG_FILE=/root/config.properties\n    healthcheck:\n      test: "netstat -ltn | grep -c \':3125\'"\n    depends_on:\n      mysql:\n        condition: service_healthy\n      mysql_auth:\n        condition: service_healthy\n      # let cubeapm1 start first and run db migrations\n      cubeapm1:\n        condition: service_healthy\n    restart: always\n  cubeapm3:\n    image: cubeapm/cubeapm:v1.11.0\n    volumes:\n      - ./data_volume/cubeapm/cubeapm3:/root/data\n      # - ./config.properties:/root/config.properties\n    # Use volume mount above if inline config is not supported\n    configs:\n      - source: cubeapm\n        target: /root/config.properties\n    environment:\n      - CUBE_CONFIG_FILE=/root/config.properties\n    healthcheck:\n      test: "netstat -ltn | grep -c \':3125\'"\n    depends_on:\n      mysql:\n        condition: service_healthy\n      mysql_auth:\n        condition: service_healthy\n      # let cubeapm1 start first and run db migrations\n      cubeapm1:\n        condition: service_healthy\n    restart: always\n\n  mysql:\n    image: mysql:8.0\n    environment:\n      - MYSQL_ROOT_PASSWORD=root\n      - MYSQL_DATABASE=cubeapm\n    volumes:\n      - ./data_volume/mysql/cubeapm:/var/lib/mysql\n    healthcheck:\n      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]\n    # ports:\n    #   - 3306:3306\n\n  mysql_auth:\n    image: mysql:8.0\n    environment:\n      - MYSQL_ROOT_PASSWORD=root\n      - MYSQL_DATABASE=cubeapm_auth\n    volumes:\n      - ./data_volume/mysql/cubeapm_auth:/var/lib/mysql\n    healthcheck:\n      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]\n    # ports:\n    #   - 3306:3306\n\n  # nginx is used here as load balancer to distribute incoming traffic across\n  # cubeapm containers. In a production environment, all cubeapm containers\n  # should run on different physical nodes, and any load balancer can be used\n  # to distribute traffic across them.\n  nginx:\n    image: nginx:1.24.0\n    # volumes:\n    #   - ./nginx.conf:/etc/nginx/nginx.conf\n    # Use volume mount above if inline config is not supported\n    configs:\n      - source: nginx\n        target: /etc/nginx/nginx.conf\n    ports:\n      - 3125:3125\n      - 3130:3130\n      - 4317:4317\n      - 4318:4318\n    depends_on:\n      - cubeapm1\n      - cubeapm2\n      - cubeapm3\n    restart: always\n\n  # mailslurper is an SMTP server for delivering emails.\n  # Its UI will be availale at http://localhost:4436.\n  mailslurper:\n    image: oryd/mailslurper:latest-smtps\n    ports:\n      - 4436:4436\n      - 4437:4437\n\n# Inline content in configs is supported starting docker compose 2.23.1\n# (released on Nov 15th, 2023). On older versions, you will get an error\n# "Additional property content is not allowed". In that case, create a regular\n# file with the respective content and mount it in the respective containers.\nconfigs:\n  # See https://docs.cubeapm.com/install/configure-cubeapm#configuration-reference\n  # for cubeapm configuration file reference documentation.\n  cubeapm:\n    content: |\n      # Mandatory Parameters\n      token=<your_cubeapm_token>\n      smtp.url=smtps://test:test@mailslurper:1025/?skip_ssl_verify=true\n      database.url=mysql://root:root@tcp(mysql:3306)/cubeapm\n      auth.database.url=mysql://root:root@tcp(mysql_auth:3306)/cubeapm_auth\n      auth.key.session=ce8b866cedd54b9a893ffd74be689e9d\n      auth.key.tokens=67e49fe8b82546d1a055e5d1f5b43cbf\n\n      # Important Parameters\n      # base-url=http://localhost:3125\n      # auth.sys-admins=you@yourdomain.com\n      cluster.peers=cubeapm1,cubeapm2,cubeapm3\n      # smtp.from=no-reply@cubeapm.com\n      # time-zone=UTC\n\n  nginx:\n    content: |\n      worker_processes auto;\n      events {\n          worker_connections 1024;\n      }\n      http {\n          upstream cubeapm-3125 {\n              server cubeapm1:3125;\n              server cubeapm2:3125;\n              server cubeapm3:3125;\n          }\n          server {\n              listen 3125;\n              listen [::]:3125;\n              # client_max_body_size 50M;\n              location / {\n                  proxy_pass http://cubeapm-3125;\n              }\n          }\n\n          upstream cubeapm-3130 {\n              server cubeapm1:3130;\n              server cubeapm2:3130;\n              server cubeapm3:3130;\n          }\n          server {\n              listen 3130;\n              listen [::]:3130;\n              client_max_body_size 50M;\n              location / {\n                  proxy_pass http://cubeapm-3130;\n              }\n          }\n\n          upstream cubeapm-4317 {\n              server cubeapm1:4317;\n              server cubeapm2:4317;\n              server cubeapm3:4317;\n          }\n          server {\n              listen 4317 http2;\n              listen [::]:4317 http2;\n              client_max_body_size 50M;\n              location / {\n                  grpc_pass cubeapm-4317;\n              }\n          }\n\n          upstream cubeapm-4318 {\n              server cubeapm1:4318;\n              server cubeapm2:4318;\n              server cubeapm3:4318;\n          }\n          server {\n              listen 4318;\n              listen [::]:4318;\n              client_max_body_size 50M;\n              location / {\n                  proxy_pass http://cubeapm-4318;\n              }\n          }\n      }\n'})})]})}function u(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(p,{...e})}):p(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>i});var o=t(6540);const a={},s=o.createContext(a);function r(e){const n=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),o.createElement(s.Provider,{value:n},e.children)}}}]);