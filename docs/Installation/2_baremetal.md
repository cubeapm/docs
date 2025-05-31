---
sidebar_position: 2
slug: /install/bare-metal-virtual-machine
---

# Bare Metal / Virtual Machine

Run the following command. It downloads and executes the CubeAPM install script.

```shell
sudo /bin/bash -c "$(curl -fsSL https://downloads.cubeapm.com/latest/install.sh)"
```

The script performs the following tasks:

1. Detect CPU platform and OS of the host machine and download appropriate CubeAPM binary file.
2. Set up CubeAPM as a service if `systemctl` is found on the host. A configuration file is also created at the path `/etc/cubeapm/config.properties`.

**By default, CubeAPM UI is accessible at http://localhost:3125.**

## Next Steps

After installing CubeAPM, head over to the [Configure CubeAPM](../configuration/configuration.md) section for details of all available configuration parameters.
