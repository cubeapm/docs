---
slug: /logs/archive/bare-metal-virtual-machine
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Bare Metal / Virtual Machine

1.  Install JuiceFS on CubeAPM server, following the documentation at https://juicefs.com/docs/community/getting-started/installation/

1.  JuiceFS needs a database for storing metadata. Since CubeAPM already uses a database (MySQL or PostgreSQL), the same can be used for JuiceFS as well.

    <Tabs>
         <TabItem value="MySQL" label="MySQL">
           ```sql
           CREATE DATABASE cubeapm_logs_archive_meta CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

           CREATE USER 'cubeapm_logs_archive_user'@'%' IDENTIFIED BY 'cubeapm_logs_archive_pass';

           GRANT ALL PRIVILEGES ON cubeapm_logs_archive_meta.* TO 'cubeapm_logs_archive_user'@'%';

           FLUSH PRIVILEGES;
           ```
        </TabItem>
        <TabItem value="postgres" label="PostgreSQL">
           ```sql
           CREATE DATABASE cubeapm_logs_archive_meta;

           CREATE USER cubeapm_logs_archive_user WITH PASSWORD 'cubeapm_logs_archive_pass';

           GRANT ALL PRIVILEGES ON DATABASE cubeapm_logs_archive_meta TO cubeapm_logs_archive_user;

           GRANT ALL ON SCHEMA public TO cubeapm_logs_archive_user;

           \c cubeapm_logs_archive_meta

           GRANT ALL ON SCHEMA public TO cubeapm_logs_archive_user;
           ```
        </TabItem>

    </Tabs>

1.  Create object storage bucket for storing archive logs data. Name the bucket as `cubeapm-logs-archive`

1.  Grant read/write permissions to CubeAPM on the bucket. This can be done in any one of the following ways.either by attaching appropriate role to the server instance on which CubeAPM is running, or by creating access keys and providing the same to JuiceFS.
    1. Attach role with required permissions. If using KMS-encrypted bucket, add KMS permissions as well.
    1. Create `/etc/juicefs.env` with AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_REGION. Run `sudo chmod 600 /etc/juicefs.env` to protect the file.

       ```shell
       AWS_ACCESS_KEY_ID=AKIA...
       AWS_SECRET_ACCESS_KEY=abcd...
       AWS_REGION=us-east-1
       ```

    The following permissions are required on the bucket.

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

1.  Format the JuiceFS filesystem. This needs to be done only once per JuiceFS volume. This initializes metadata in the database.

    ```shell
    # Skip the following command if not using juicefs.env
    source /etc/juicefs.env

    #MySQL database_string: mysql://cubeapm_logs_archive_user:cubeapm_logs_archive_pass@tcp(localhost:3306)/cubeapm_logs_archive_meta
    #PostgresSQL database_string: postgres://cubeapm_logs_archive_user:cubeapm_logs_archive_pass@localhost:5432/cubeapm_logs_archive_meta
    # Format JuiceFS
    juicefs format \
    --storage s3 \
    --bucket <s3-bucket-endpoint-url> \
    <database_string> \
    logsarchive
    ```

1.  Create mount directory using command `sudo mkdir -p /var/lib/cubeapm/logs_archive`

1.  Create systemd service. Create a file named `/etc/systemd/system/cubeapm-logs-archive.service`

    ```shell
    [Unit]
    Description=CubeAPM logs archive
    After=network-online.target
    Wants=network-online.target

    [Service]
    Type=simple
    # If using juicefs.env file, point to it here:
    #EnvironmentFile=/etc/juicefs.env
    #S3 url example: https://cubeapm-logs-archive.s3.us-east-1.amazonaws.com
    #MySQL database_string: mysql://cubeapm_logs_archive_user:cubeapm_logs_archive_pass@tcp(localhost:3306)/cubeapm_logs_archive_meta
    #PostgresSQL database_string: postgres://cubeapm_logs_archive_user:cubeapm_logs_archive_pass@localhost:5432/cubeapm_logs_archive_meta
    ExecStart=/usr/local/bin/juicefs mount <database_string> /var/lib/cubeapm/logs_archive \
    --storage s3 \
    --bucket <s3-bucket-endpoint-url> \
    --foreground
    ExecStop=/usr/local/bin/juicefs umount /var/lib/cubeapm/logs_archive
    Restart=on-failure
    RestartSec=5
    # set a nicer kill timeout so juicefs can cleanly unmount
    TimeoutStopSec=30

    [Install]
    WantedBy=multi-user.target
    ```

    :::info
    Check juicefs installation path (using `which juicefs`). In case the path is not `/usr/local/bin/juicefs`, replace the installation path in above script.
    :::

1.  Enable + start the service
    ```shell
    sudo systemctl daemon-reload
    sudo systemctl enable --now cubeapm-logs-archive.service
    ```
1.  Check status
    ```shell
    sudo systemctl status cubeapm-logs-archive.service
    journalctl -u cubeapm-logs-archive.service -f
    ```
