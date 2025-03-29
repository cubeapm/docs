---
sidebar_position: 3
slug: /install/install-cubeapm/docker
---

# Docker

CubeAPM is also available as a Docker image. Run the following command to start CubeAPM in a Docker container.

```shell
docker run -d --name cubeapm \
-p 3125:3125 -p 3130:3130 -p 4317:4317 -p 4318:4318 \
-v cube_data:/root/data \
-v ./config.properties:/etc/cubeapm/config.properties \
cubeapm/cubeapm:v1.11.0 \
--config-file /etc/cubeapm/config.properties
```

The above command assumes you have a file `config.properties` in your current working directory. See [Configure CubeAPM](../02_configure/02_configure.md) section for details of all available configuration parameters.

## Docker Compose

The following docker compose config installs a fully working three-node cluster of CubeAPM. After running `docker compose up`, CubeAPM will be availabe on http://localhost:3125. Also, a webmail UI will be available at http://localhost:4436. Any emails sent by CubeAPM will be available on this webmail UI.

```yaml title="docker-compose.yml"
version: "3"
services:
  cubeapm1:
    image: cubeapm/cubeapm:v1.11.0
    volumes:
      - ./data_volume/cubeapm/cubeapm1:/root/data
      # - ./config.properties:/root/config.properties
    # Use volume mount above if inline config is not supported
    configs:
      - source: cubeapm
        target: /root/config.properties
    environment:
      - CUBE_CONFIG_FILE=/root/config.properties
    healthcheck:
      test: "netstat -ltn | grep -c ':3125'"
    depends_on:
      mysql:
        condition: service_healthy
      mysql_auth:
        condition: service_healthy
    restart: always
  cubeapm2:
    image: cubeapm/cubeapm:v1.11.0
    volumes:
      - ./data_volume/cubeapm/cubeapm2:/root/data
      # - ./config.properties:/root/config.properties
    # Use volume mount above if inline config is not supported
    configs:
      - source: cubeapm
        target: /root/config.properties
    environment:
      - CUBE_CONFIG_FILE=/root/config.properties
    healthcheck:
      test: "netstat -ltn | grep -c ':3125'"
    depends_on:
      mysql:
        condition: service_healthy
      mysql_auth:
        condition: service_healthy
      # let cubeapm1 start first and run db migrations
      cubeapm1:
        condition: service_healthy
    restart: always
  cubeapm3:
    image: cubeapm/cubeapm:v1.11.0
    volumes:
      - ./data_volume/cubeapm/cubeapm3:/root/data
      # - ./config.properties:/root/config.properties
    # Use volume mount above if inline config is not supported
    configs:
      - source: cubeapm
        target: /root/config.properties
    environment:
      - CUBE_CONFIG_FILE=/root/config.properties
    healthcheck:
      test: "netstat -ltn | grep -c ':3125'"
    depends_on:
      mysql:
        condition: service_healthy
      mysql_auth:
        condition: service_healthy
      # let cubeapm1 start first and run db migrations
      cubeapm1:
        condition: service_healthy
    restart: always

  mysql:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=cubeapm
    volumes:
      - ./data_volume/mysql/cubeapm:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
    # ports:
    #   - 3306:3306

  mysql_auth:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=cubeapm_auth
    volumes:
      - ./data_volume/mysql/cubeapm_auth:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
    # ports:
    #   - 3306:3306

  # nginx is used here as load balancer to distribute incoming traffic across
  # cubeapm containers. In a production environment, all cubeapm containers
  # should run on different physical nodes, and any load balancer can be used
  # to distribute traffic across them.
  nginx:
    image: nginx:1.24.0
    # volumes:
    #   - ./nginx.conf:/etc/nginx/nginx.conf
    # Use volume mount above if inline config is not supported
    configs:
      - source: nginx
        target: /etc/nginx/nginx.conf
    ports:
      - 3125:3125
      - 3130:3130
      - 4317:4317
      - 4318:4318
    depends_on:
      - cubeapm1
      - cubeapm2
      - cubeapm3
    restart: always

# Inline content in configs is supported starting docker compose 2.23.1
# (released on Nov 15th, 2023). On older versions, you will get an error
# "Additional property content is not allowed". In that case, create a regular
# file with the respective content and mount it in the respective containers.
configs:
  # See https://docs.cubeapm.com/install/configure-cubeapm#configuration-reference
  # for cubeapm configuration file reference documentation.
  cubeapm:
    content: |
      # Mandatory Parameters
      token=<your_cubeapm_token>
      auth.key.session=ce8b866cedd54b9a893ffd74be689e9d
      auth.key.tokens=67e49fe8b82546d1a055e5d1f5b43cbf

      # Important Parameters
      # base-url=http://localhost:3125
      # auth.sys-admins=you@yourdomain.com
      cluster.peers=cubeapm1,cubeapm2,cubeapm3
      # time-zone=UTC

      database.url=mysql://root:root@tcp(mysql:3306)/cubeapm
      auth.database.url=mysql://root:root@tcp(mysql_auth:3306)/cubeapm_auth

  nginx:
    content: |
      worker_processes auto;
      events {
          worker_connections 1024;
      }
      http {
          upstream cubeapm-3125 {
              server cubeapm1:3125;
              server cubeapm2:3125;
              server cubeapm3:3125;
          }
          server {
              listen 3125;
              listen [::]:3125;
              # client_max_body_size 50M;
              location / {
                  proxy_pass http://cubeapm-3125;
              }
          }

          upstream cubeapm-3130 {
              server cubeapm1:3130;
              server cubeapm2:3130;
              server cubeapm3:3130;
          }
          server {
              listen 3130;
              listen [::]:3130;
              client_max_body_size 50M;
              location / {
                  proxy_pass http://cubeapm-3130;
              }
          }

          upstream cubeapm-4317 {
              server cubeapm1:4317;
              server cubeapm2:4317;
              server cubeapm3:4317;
          }
          server {
              listen 4317 http2;
              listen [::]:4317 http2;
              client_max_body_size 50M;
              location / {
                  grpc_pass cubeapm-4317;
              }
          }

          upstream cubeapm-4318 {
              server cubeapm1:4318;
              server cubeapm2:4318;
              server cubeapm3:4318;
          }
          server {
              listen 4318;
              listen [::]:4318;
              client_max_body_size 50M;
              location / {
                  proxy_pass http://cubeapm-4318;
              }
          }
      }
```
