---
sidebar_position: 3
slug: /install/install-cubeapm/docker
---

# Docker

Cube is also available as a Docker image. Run the following command to start Cube in a Docker container.

```shell
docker run -d --name cubeapm \
-p 3125:3125 -p 4317:4317 -p 4318:4318 \
-v cube_data:/root/data \
-v ./config.properties:/etc/cubeapm/config.properties \
cubeapm/cubeapm:v1.7.0 \
--config-file /etc/cubeapm/config.properties
```

The above command assumes you have a file `config.properties` in your current working directory. See [Configure CubeAPM](../02_configure/02_configure.md) section for details of all available configuration parameters.
