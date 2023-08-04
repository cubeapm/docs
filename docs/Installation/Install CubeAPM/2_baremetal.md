---
sidebar_position: 2
slug: /install/install-cubeapm/bare-metal-virtual-machine
---

# Bare Metal / Virtual Machine

Run the following command. It downloads and executes the Cube install script.

```sh
sudo /bin/bash -c "$(curl -fsSL https://downloads.cubeapm.com/latest/install.sh)"
```

The script performs the following tasks:

1. Detect CPU platform and OS of the host machine and download appropriate Cube binary file.
2. Set up Cube as a service if `systemctl` is found on the host. A configuration file is also created at the path `/etc/cubeapm/config.properties`.

**By default, Cube UI is accessible at http://localhost:3125.**
