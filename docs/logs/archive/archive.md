---
slug: /logs/archive
sidebar_position: 3
---

# Archive

CubeAPM supports archiving logs data to Object stores like AWS S3 (or any object store with S3-compatible APIs), Google Cloud Storage (GCS), and Azure Blob Storage.

Archived logs can be queried seamlessly in real-time. Both CubeAPM UI and APIs fetch logs automatically from local storage and/or archive as required.

CubeAPM uses [JuiceFS](https://juicefs.com/) to mount the object storage bucket as a directory on the local filesystem. JuiceFS is a high-performance file system designed to provide POSIX compatible access to data stored in the object storage. By incorporating a sophisticated local caching layer, JuiceFS delivers performance close to local storage.

Please follow the links below for configuration according to deployment environment.

- [Bare Metal / Virtual Machine](bare-metal.md)
- [Kubernetes](kubernetes.md)
