---
slug: /logs/archive/bare-metal-virtual-machine
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Bare Metal / Virtual Machine

1.  Install JuiceFS on CubeAPM server, following the documentation at https://juicefs.com/docs/community/getting-started/installation/

1.  JuiceFS needs a database for storing metadata. Since CubeAPM already uses a database (MySQL or PostgreSQL), the same can be used for JuiceFS as well.

    <Tabs>
    <TabItem value="mysql" label="MySQL">
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

1.  Create object storage bucket for storing logs archive data. Name the bucket as `cubeapm-logs-archive`

1.  Grant read/write permissions to CubeAPM on the bucket.

    <Tabs>
    <TabItem value="aws" label="AWS">
        1. Either attach appropriate role to the server instance on which CubeAPM is running, or create access keys and provide the same to JuiceFS.

            1. Attach role with required permissions. If using KMS-encrypted bucket, add KMS permissions as well.

            1. Create `/etc/cubeapm/logs-archive.env` with AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_REGION. Run `sudo chmod 600 /etc/cubeapm/logs-archive.env` to protect the file.

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
            # Skip the following command if not using logs-archive.env
            source /etc/cubeapm/logs-archive.env

            # Format JuiceFS
            #
            # database_string
            # MySQL: mysql://cubeapm_logs_archive_user:cubeapm_logs_archive_pass@tcp(localhost:3306)/cubeapm_logs_archive_meta
            # PostgreSQL: postgres://cubeapm_logs_archive_user:cubeapm_logs_archive_pass@localhost:5432/cubeapm_logs_archive_meta
            #
            # bucket_url: https://cubeapm-logs-archive.s3.us-east-1.amazonaws.com
            ## Block size should be 16MB to upload large files to S3 (default is 4MB)
            juicefs format \
            --storage s3 \
            --bucket <bucket_url> \
            --block-size 16384 \
            <database_string> \
            logsarchive
            ```

        1. Create mount directory using command `sudo mkdir -p /var/lib/cubeapm/logs_archive`

            :::note
            These values need to be passed in the `cubeapm-logs-archive.service` file. Refer to the step below.
            :::

            | Mount Options | Type     | Description |
            | :------------ | :------- | :----------------------------------------------------------------- |
            | `cache-size`       | `int` | The  `cache-size`  flag controls a **strict limit on how much local disk space (in Megabytes)** JuiceFS is allowed to use on your Kubernetes worker node to store temporary data. *(Default value 100MB)* |
            | `buffer-size`       | `int` | The `buffer-size` flag controls how much **RAM (Memory)** the JuiceFS client is allowed to use as a **temporary buffer for reading and writing data**. When your application writes data, it hits this fast memory buffer first before moving to S3. *(Default value 300MB)* |
            | `max-uploads`     | `int` | The `max-uploads` flag controls the **maximum number of concurrent connections (threads)** JuiceFS will open to your S3 bucket at the exact same time when uploading data. *(Default value 20)* |
            | `free-space-ratio`   | `float` | The `free-space-ratio` flag controls a safety mechanism for your local **cache disk**. If your local worker node's hard drive drops below **10% free space**, JuiceFS will aggressively start **deleting old cached data** and will **temporarily disable the local cache** to protect your server from running completely out of disk space. *(Default value 0.1 which means 10%)* |
            | `put-timeout`        | `int` | The `put-timeout` flag controls the **maximum amount of time** it will wait for the upload to finish before giving up and throwing an **error/retrying** when JuiceFS tries to **upload (PUT)** a block of data to S3. *(Default value 0.1 which means 60s)* |
            | `writeback` | `bool` | The  `writeback`  flag controls data write behavior from **"Synchronous" to "Asynchronous"**. This is a boolean flag (meaning you just pass `writeback` to turn it on). When enabled, instead of making your application wait for the data to be successfully uploaded to S3, JuiceFS quickly writes the data through its **RAM buffer** directly to the **local node's hard drive** and tells your application *"Done!"*. It then independently uploads the data from that local disk to S3 in the background. *(Default value false)* |

        1. Create systemd service. Create a file named `/etc/systemd/system/cubeapm-logs-archive.service`

            ```shell
            [Unit]
            Description=CubeAPM logs archive
            After=network-online.target
            Wants=network-online.target

            [Service]
            Type=simple
            # If using logs-archive.env file, point to it here:
            #EnvironmentFile=/etc/cubeapm/logs-archive.env

            # database_string
            # MySQL: mysql://cubeapm_logs_archive_user:cubeapm_logs_archive_pass@tcp(localhost:3306)/cubeapm_logs_archive_meta
            # PostgreSQL: postgres://cubeapm_logs_archive_user:cubeapm_logs_archive_pass@localhost:5432/cubeapm_logs_archive_meta
            #
            # bucket_url: https://cubeapm-logs-archive.s3.us-east-1.amazonaws.com
            #
            # cache-size is in MiB. 51200 == 50 GiB.
            ExecStart=/usr/local/bin/juicefs mount <database_string> /var/lib/cubeapm/logs_archive \
              --storage s3 \
              --bucket <bucket_url> \
              --cache-dir=/var/lib/cubeapm/cache/logs_archive \
              --buffer-size=2024 \
              --cache-size=51200 \
              --free-space-ratio=0.2 \
              --put-timeout=90 \
              --max-uploads=5 \
              --writeback \
              --foreground

            ExecStop=/usr/local/bin/juicefs umount /var/lib/cubeapm/logs_archive
            Restart=on-failure
            RestartSec=5
            TimeoutStopSec=30

            [Install]
            WantedBy=multi-user.target
            ```

    </TabItem>
    <TabItem value="GCP" label="GCP">
        1. Either attach appropriate role to the server instance on which CubeAPM is running, or by create service account and provide access to it and use that service account.

            1. Attach the `storage.objectAdmin` permission to the GCP VM default service account.

            1. Create a service account and grant the `storage.objectAdmin` permission to it. After granting the permission, stop the cubeapm instance and **edit** the instance configuration.

                1. Under **Identity and API access** setting, select the service account you have created with the `storage.objectAdmin` permission.

                1. After settingup Identity and API access, under **Access scopes**, select either *default* or *full access to all Cloud APIs* and save it.

                1. Start the cubeapm instance.

        1. Run the below command to format the JuiceFS filesystem. This needs to be done only once per JuiceFS volume. This initializes metadata in the database.

            ```shell
            # Format JuiceFS
            #
            # database_string
            # MySQL: mysql://cubeapm_logs_archive_user:cubeapm_logs_archive_pass@tcp(localhost:3306)/cubeapm_logs_archive_meta
            # PostgreSQL: postgres://cubeapm_logs_archive_user:cubeapm_logs_archive_pass@localhost:5432/cubeapm_logs_archive_meta
            #
            # bucket_url: gs://cubeapm-logs-archive
            ## Block size should be 16MB to upload large files to S3 (default is 4MB)
            juicefs format \
            --storage gs \
            --bucket <bucket_url> \
            --block-size 16384 \
            <database_string> \
            logsarchive
            ```

        1. Create mount directory using command `sudo mkdir -p /var/lib/cubeapm/logs_archive`

            :::note
            These values need to be passed in the `cubeapm-logs-archive.service` file. Refer to the step below.
            :::

            | Mount Options  | Type     | Description |
            | :------------ | :------- | :----------------------------------------------------------------- |
            | `cache-size`       | `int` | The  `cache-size`  flag controls a **strict limit on how much local disk space (in Megabytes)** JuiceFS is allowed to use on your Kubernetes worker node to store temporary data. *(Default value 100MB)* |
            | `buffer-size`       | `int` | The `buffer-size` flag controls how much **RAM (Memory)** the JuiceFS client is allowed to use as a **temporary buffer for reading and writing data**. When your application writes data, it hits this fast memory buffer first before moving to S3. *(Default value 300MB)* |
            | `max-uploads`     | `int` | The `max-uploads` flag controls the **maximum number of concurrent connections (threads)** JuiceFS will open to your S3 bucket at the exact same time when uploading data. *(Default value 20)* |
            | `free-space-ratio`   | `float` | The `free-space-ratio` flag controls a safety mechanism for your local **cache disk**. If your local worker node's hard drive drops below **10% free space**, JuiceFS will aggressively start **deleting old cached data** and will **temporarily disable the local cache** to protect your server from running completely out of disk space. *(Default value 0.1 which means 10%)* |
            | `put-timeout`        | `int` | The `put-timeout` flag controls the **maximum amount of time** it will wait for the upload to finish before giving up and throwing an **error/retrying** when JuiceFS tries to **upload (PUT)** a block of data to S3. *(Default value 0.1 which means 60s)* |
            | `writeback` | `bool` | The  `writeback`  flag controls data write behavior from **"Synchronous" to "Asynchronous"**. This is a boolean flag (meaning you just pass `writeback` to turn it on). When enabled, instead of making your application wait for the data to be successfully uploaded to S3, JuiceFS quickly writes the data through its **RAM buffer** directly to the **local node's hard drive** and tells your application *"Done!"*. It then independently uploads the data from that local disk to S3 in the background. *(Default value false)* |

        1. Create systemd service. Create a file named `/etc/systemd/system/cubeapm-logs-archive.service`

            ```shell
            [Unit]
            Description=CubeAPM logs archive
            After=network-online.target
            Wants=network-online.target

            [Service]
            Type=simple
            # If using logs-archive.env file, point to it here:
            #EnvironmentFile=/etc/cubeapm/logs-archive.env

            # database_string
            # MySQL: mysql://cubeapm_logs_archive_user:cubeapm_logs_archive_pass@tcp(localhost:3306)/cubeapm_logs_archive_meta
            # PostgreSQL: postgres://cubeapm_logs_archive_user:cubeapm_logs_archive_pass@localhost:5432/cubeapm_logs_archive_meta
            #
            # bucket_url: gs://cubeapm-logs-archive
            #
            # cache-size is in MiB. 51200 == 50 GiB.
            ExecStart=/usr/local/bin/juicefs mount <database_string> /var/lib/cubeapm/logs_archive \
              --storage gs \
              --bucket <bucket_url> \
              --cache-dir=/var/lib/cubeapm/cache/logs_archive \
              --buffer-size=2024 \
              --cache-size=51200 \
              --free-space-ratio=0.2 \
              --put-timeout=90 \
              --max-uploads=5 \
              --writeback \
              --foreground

            ExecStop=/usr/local/bin/juicefs umount /var/lib/cubeapm/logs_archive
            Restart=on-failure
            RestartSec=5
            TimeoutStopSec=30

            [Install]
            WantedBy=multi-user.target
            ```

    </TabItem>
    </Tabs>

    :::info
    Check juicefs installation path (using `which juicefs`). In case the path is not `/usr/local/bin/juicefs`, replace the installation path in above script.
    :::

1.  Enable and start the service

    ```shell
    sudo systemctl daemon-reload
    sudo systemctl enable cubeapm-logs-archive.service
    sudo systemctl start cubeapm-logs-archive.service

    # check status
    sudo systemctl status cubeapm-logs-archive.service

    # check logs
    journalctl -f -u cubeapm-logs-archive.service
    ```
