"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[149],{1884:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>a,contentTitle:()=>l,default:()=>m,frontMatter:()=>r,metadata:()=>t,toc:()=>c});const t=JSON.parse('{"id":"logs/ingestion/aws-ecs","title":"AWS ECS","description":"AWS ECS can send logs to external services using AWS FireLens, which is a wrapper over Fluentbit.","source":"@site/docs/logs/ingestion/aws-ecs.md","sourceDirName":"logs/ingestion","slug":"/logs/ingestion/aws-ecs","permalink":"/logs/ingestion/aws-ecs","draft":false,"unlisted":false,"editUrl":"https://github.com/cubeapm/docs/docs/docs/logs/ingestion/aws-ecs.md","tags":[],"version":"current","frontMatter":{"id":"aws-ecs","title":"AWS ECS","slug":"/logs/ingestion/aws-ecs"},"sidebar":"tutorialSidebar","previous":{"title":"Ingestion","permalink":"/logs/ingestion"},"next":{"title":"AWS Lambda","permalink":"/logs/ingestion/aws-lambda"}}');var i=s(4848),o=s(8453);const r={id:"aws-ecs",title:"AWS ECS",slug:"/logs/ingestion/aws-ecs"},l="AWS ECS",a={},c=[{value:"Troubleshooting",id:"troubleshooting",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",...(0,o.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"aws-ecs",children:"AWS ECS"})}),"\n",(0,i.jsx)(n.p,{children:"AWS ECS can send logs to external services using AWS FireLens, which is a wrapper over Fluentbit."}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["Create a bucket in S3 by the name ",(0,i.jsx)(n.code,{children:"cubeapm_ecs_logs_config"})," and add the below files to it. These files contain configuration for Fluentbit multiline parsing (",(0,i.jsx)(n.a,{href:"https://docs.fluentbit.io/manual/pipeline/filters/multiline-stacktrace",children:"documentation"}),")."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ini",metastring:'title="filters.conf"',children:"[SERVICE]\n    parsers_file          parsers.conf\n    # log_level             debug\n[FILTER]\n    name                  multiline\n    match                 *\n    multiline.key_content log\n    mode                  partial_message\n[FILTER]\n    name                  multiline\n    match                 *\n    multiline.key_content log\n    multiline.parser      multiline-regex\n    buffer                on\n[FILTER]\n    name                  parser\n    match                 *\n    key_name              log\n    parser                custom_log_parser\n    preserve_key          on\n    reserve_data          on\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ini",metastring:'title="parsers.conf"',children:'[MULTILINE_PARSER]\n    name  multiline-regex\n    type  regex\n    rule  "start_state"  "/^(\\d+-\\d+-\\d+ \\d+:\\d+:\\d+).*/"      "cont"\n    rule  "cont"         "/^(?!(\\d+-\\d+-\\d+ \\d+:\\d+:\\d+)).*/"  "cont"\n[PARSER]\n    Name         custom_log_parser\n    Format       regex\n    Regex        /^(?<timestamp>\\S+ \\S+) (?<log_level>[A-Z]+)/\n    Time_Key     timestamp\n    Time_Format  %Y-%m-%d %H:%M:%S.%L\n    Time_Keep    on\n    Time_Strict  off\n'})}),"\n",(0,i.jsx)(n.admonition,{type:"info",children:(0,i.jsxs)(n.p,{children:["You may need to adjust the content of above files, particularly ",(0,i.jsx)(n.code,{children:"parsers.conf"}),", as per your requirements."]})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["Add the following to ",(0,i.jsx)(n.code,{children:"containerDefinitions"})," in your ECS task definition to create a Fluentbit sidecar container."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\n    "essential": true,\n    "image": "amazon/aws-for-fluent-bit:init-2.32.4",\n    "name": "log_router",\n    "firelensConfiguration": {\n        "type": "fluentbit",\n        "options": {\n            "enable-ecs-log-metadata": "true"\n        }\n    },\n    "memoryReservation": 50,\n    "environment": [\n        {\n            "name": "aws_fluent_bit_init_s3_1",\n            "value": "arn:aws:s3:::cubeapm_ecs_logs_config/filters.conf"\n        },\n        {\n            "name": "aws_fluent_bit_init_s3_2",\n            "value": "arn:aws:s3:::cubeapm_ecs_logs_config/parsers.conf"\n        }\n    ]\n},\n'})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["Update the ",(0,i.jsx)(n.code,{children:"logConfiguration"})," of your main container as below to send logs to CubeAPM via the sidecar FluentBit container."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'"logConfiguration": {\n    "logDriver": "awsfirelens",\n    "options": {\n        "name": "http",\n        "host": "<ip_address_of_cubeapm_server>",\n        "port": "3130",\n        "compress": "gzip",\n        "format": "json_lines",\n        "json_date_format": "iso8601",\n        "uri": "/api/logs/insert/jsonline?_stream_fields=container_name,ecs_cluster&_msg_field=log&_time_field=date"\n    }\n},\n'})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["Add the permission to access S3 bucket to the ",(0,i.jsx)(n.code,{children:"ECS Task Role"})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\n  "Version": "2012-10-17",\n  "Statement": [\n    {\n      "Effect": "Allow",\n      "Action": ["s3:GetObject", "s3:GetBucketLocation"],\n      "Resource": "*"\n    }\n  ]\n}\n'})}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"References:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_firelens.html",children:"Send ECS Logs using FireLens"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/aws-samples/amazon-ecs-firelens-examples",children:"Official code examples"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/aws/aws-for-fluent-bit",children:"AWS for Fluentbit code repository"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/aws/aws-for-fluent-bit/tree/mainline/use_cases/init-process-for-fluent-bit",children:"Documentation for init process in AWS for Fluentbit"})}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"troubleshooting",children:"Troubleshooting"}),"\n",(0,i.jsx)(n.p,{children:"If modifying any file on s3, change the filename (e.g. append v2) else ecs sometimes uses older file instead of fetching latest one."}),"\n",(0,i.jsxs)(n.p,{children:["Use the repo ",(0,i.jsx)(n.a,{href:"https://github.com/cubeapm/sample_logs_pipeline",children:"https://github.com/cubeapm/sample_logs_pipeline"})," to test changes (regex, etc.) locally."]})]})}function m(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>r,x:()=>l});var t=s(6540);const i={},o=t.createContext(i);function r(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);