---
id: ecs
title: "AWS ECS"
slug: /logs/ingestion/ecs
---

# AWS ECS

AWS ECS can send logs to external services using AWS FireLens, which is a wrapper over Fluentbit.

1. Create a bucket in S3 by the name `cubeapm_ecs_logs_config` and add the below files to it. These files contain configuration for Fluentbit multiline parsing ([documentation](https://docs.fluentbit.io/manual/pipeline/filters/multiline-stacktrace)).

   ```ini title="filters.conf"
   [SERVICE]
       parsers_file          parsers.conf
       # log_level             debug
   [FILTER]
       name                  multiline
       match                 *
       multiline.key_content log
       mode                  partial_message
   [FILTER]
       name                  multiline
       match                 *
       multiline.key_content log
       multiline.parser      multiline-regex
       buffer                on
   [FILTER]
       name                  parser
       match                 *
       key_name              log
       parser                custom_log_parser
       # preserve_key          on
       reserve_data          on
   ```

   ```ini title="parsers.conf"
   [MULTILINE_PARSER]
       name  multiline-regex
       type  regex
       rule  "start_state"  "/^(\d+-\d+-\d+ \d+:\d+:\d+).*/"      "cont"
       rule  "cont"         "/^(?!(\d+-\d+-\d+ \d+:\d+:\d+)).*/"  "cont"
   [PARSER]
       Name         custom_log_parser
       Format       regex
       Regex        /^(?<timestamp>\S+ \S+) (?<log_level>[A-Z]+) (?<log>.*)$/m
       Time_Key     timestamp
       Time_Format  %Y-%m-%d %H:%M:%S.%L
       Time_Keep    on
       Time_Strict  off
   ```

   :::info
   You may need to adjust the content of above files, particularly `parsers.conf`, as per your requirements.
   :::

1. Add the following to `containerDefinitions` in your ECS task definition to create a Fluentbit sidecar container.
   ```json
   {
       "essential": true,
       "image": "amazon/aws-for-fluent-bit:init-2.32.4",
       "name": "log_router",
       "firelensConfiguration": {
           "type": "fluentbit",
           "options": {
               "enable-ecs-log-metadata": "true"
           }
       },
       "memoryReservation": 50,
       "environment": [
           {
               "name": "aws_fluent_bit_init_s3_1",
               "value": "arn:aws:s3:::cubeapm_ecs_logs_config/filters.conf"
           },
           {
               "name": "aws_fluent_bit_init_s3_2",
               "value": "arn:aws:s3:::cubeapm_ecs_logs_config/parsers.conf"
           }
       ]
   },
   ```
1. Update the `logConfiguration` of your main container as below to send logs to CubeAPM via the sidecar FluentBit container.
   ```json
   "logConfiguration": {
       "logDriver": "awsfirelens",
       "options": {
           "name": "http",
           "host": "<ip_address_of_cubeapm_server>",
           "port": "3130",
           "compress": "gzip",
           "format": "json_lines",
           "json_date_format": "iso8601",
           "uri": "/api/logs/insert/jsonline?_stream_fields=container_name,ecs_cluster&_msg_field=log&_time_field=date"
       }
   },
   ```
1. Add the permission to access S3 bucket to the `ECS Task Role`
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": ["s3:GetObject", "s3:GetBucketLocation"],
         "Resource": "*"
       }
     ]
   }
   ```

References:

1. [Send ECS Logs using FireLens](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_firelens.html)
1. [Official code examples](https://github.com/aws-samples/amazon-ecs-firelens-examples)
1. [AWS for Fluentbit code repository](https://github.com/aws/aws-for-fluent-bit)
1. [Documentation for init process in AWS for Fluentbit](https://github.com/aws/aws-for-fluent-bit/tree/mainline/use_cases/init-process-for-fluent-bit)

## Troubleshooting

If modifying any file on s3, change the filename (e.g. append v2) else ecs sometimes uses older file instead of fetching latest one.

Use the repo https://github.com/cubeapm/sample_logs_pipeline to test changes (regex, etc.) locally.
