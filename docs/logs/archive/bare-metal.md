---
id: archive-bare-metal
title: "Bare Metal / Virtual Machine"
slug: /logs/archive/bare-metal
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Bare Metal / Virtual Machine

1. Install juiceFs. Follow documentation on this link https://juicefs.com/docs/community/getting-started/installation/

2. Setup persistance storage for metadata for Juicefs. You can use existing cubeapm database for the same

   <Tabs>
      <TabItem value="postgres" label="PostgresSQL">
         ```shell
         CREATE DATABASE cubeapm_logs_archive_meta;
         CREATE USER cubeapm_logs_archive_user WITH PASSWORD 'cubeapm_logs_archive_pass';
         GRANT ALL PRIVILEGES ON DATABASE cubeapm_logs_archive_meta TO cubeapm_logs_archive_user;
         GRANT ALL ON SCHEMA public TO cubeapm_logs_archive_user;
         \c cubeapm_logs_archive_meta
         GRANT ALL ON SCHEMA public TO cubeapm_logs_archive_user;
         ```
      </TabItem>
      <TabItem value="env" label="MySQL">
         ```shell
         -- Create database
         CREATE DATABASE cubeapm_logs_archive_meta CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

         -- Create user
         CREATE USER 'cubeapm_logs_archive_user'@'%' IDENTIFIED BY 'cubeapm_logs_archive_pass';

         -- Grant full privileges on the database
         GRANT ALL PRIVILEGES ON cubeapm_logs_archive_meta.* TO 'cubeapm_logs_archive_user'@'%';

         -- Apply changes
         FLUSH PRIVILEGES;

         ```
      </TabItem>
   </Tabs>

3. Create S3 bucket for storing archive logs data. Name bucket as `cubeapm-logs-archive`

4. Host cubeapm is running upon needs to have access to upload data to S3.
    
    1. Attached an EC2 IAM role with S3 permissions (RECOMMENDED). If using KMS-encrypted bucket, add KMS permissions.

    2. Create `/etc/juicefs.env` with AWS_ACCESS_KEY_ID & AWS_SECRET_ACCESS_KEY (less secure). Run `sudo chmod 600 /etc/juicefs.env` on file once we add details mentioned below

    <Tabs>
      <TabItem value="ec2-iam-role" label="EC2 IAM Role">
         ```json
         {
            "Version": "2012-10-17",
            "Statement": [
               {
                  "Sid": "JuiceFSS3Access",
                  "Effect": "Allow",
                  "Action": [
                  "s3:GetBucketLocation",
                  "s3:ListBucket",
                  "s3:ListBucketMultipartUploads",
                  "s3:ListMultipartUploadParts",
                  "s3:PutObject",
                  "s3:GetObject",
                  "s3:DeleteObject",
                  "s3:AbortMultipartUpload"
                  ],
                  "Resource": [
                  "arn:aws:s3:::cubeapm-logs-archive",
                  "arn:aws:s3:::cubeapm-logs-archive/*"
                  ]
               }
            ]
         }
         ```
      </TabItem>
      <TabItem value="juicefs-env-file" label="JuiceFS Environment File">
         ```shell
        AWS_ACCESS_KEY_ID=AKIA...
        AWS_SECRET_ACCESS_KEY=abcd...
        AWS_REGION=ap-south-1
         ```
      </TabItem>
   </Tabs>

5. Format the JuiceFS filesystem (one time). Do this only once per volume name. This initializes metadata in Postgres and records the storage backend. If you are using `/etc/juicefs.env`, export it in your shell before formatting `source /etc/juicefs.env`

   ```shell
   juicefs format --storage s3 --bucket <s3-bucket-endpoint-url> postgres://cubeapm_logs_archive_user:cubeapm_logs_archive_pass@localhost:5432/cubeapm_logs_archive_meta cubeapm_log_archives`
   ```


6. Create mount directory using command `sudo mkdir -p /var/lib/cubeapm/juicefs_logs_archive`

7. Create systemd unit (service that runs juicefs mount). Create a file named `/etc/systemd/system/cubeapm-logs-archive.service`

   ```shell
   [Unit]
    Description=JuiceFS mount for myjuicefs
    After=network-online.target
    Wants=network-online.target

    [Service]
    Type=simple
    # If you use an env file (not IAM role), point to it here:
    #EnvironmentFile=/etc/juicefs.env
    #S3 Url Example: https://cubeapm-logs-archive.s3.ap-south-1.amazonaws.com
    #MySQL databasestring : mysql://cubeapm_logs_archive_user:cubeapm_logs_archive_pass@tcp(clocalhost:3306)/cubeapm_logs_archive_meta
    #PostGresSQL databasestring : postgres://cubeapm_logs_archive_user:cubeapm_logs_archive_pass@localhost:5432/cubeapm_logs_archive_meta
    #ExecStart: run juicefs and let it background itself with --background
    ExecStart=/usr/local/bin/juicefs mount <databasestring>/cubeapm_logs_archive_meta /var/lib/cubeapm/juicefs_logs_archive \
    --storage s3 \
    --bucket <s3-bucket-endpoint-url> \
    --foreground
    ExecStop=/usr/local/bin/juicefs umount /var/lib/cubeapm/juicefs_logs_archive
    Restart=on-failure
    RestartSec=5
    # set a nicer kill timeout so juicefs can cleanly unmount
    TimeoutStopSec=30

    [Install]
    WantedBy=multi-user.target

    ```

   :::info
   Check juicefs installation path (using `which juicefs`). In case path is different than `/usr/local/bin/juicefs`, replace installation path in above script 
   :::

8. Enable + start the service
   ```shell
   sudo systemctl daemon-reload
   sudo systemctl enable --now cubeapm-logs-archive.service
   ```
9. Check status
   ```shell
   sudo systemctl status cubeapm-logs-archive.service
   journalctl -u cubeapm-logs-archive.service -f
   ```
