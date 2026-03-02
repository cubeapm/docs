---
slug: /logs/archive
sidebar_position: 3
---

# Archive

CubeAPM supports archiving logs data to Object stores like AWS S3 (or any object store with S3-compatible APIs), Google Cloud Storage (GCS), and Azure Blob Storage.

Archived logs can be queried seamlessly in real-time. Both CubeAPM UI and APIs fetch logs automatically from local storage and/or archive as required.

JuiceFS is a high-performance, cloud-native distributed file system designed to provide standard POSIX, HDFS, and S3-compatible access to data stored in object storage (like Amazon S3, GCS, or Azure Blob). It uniquely separates data from metadata, using a pluggable metadata engine—such as Redis, MySQL, or PostgreSQL—to ensure lightning-fast file operations while leveraging the elastic, low-cost capacity of the cloud. By incorporating a sophisticated local caching layer, JuiceFS delivers the performance of local storage with the infinite scalability of the cloud, making it an ideal solution for log archiving and shared data workloads across massive clusters.

Please follow the links below for configuration according to deployment environment.

- [Bare Metal / Virtual Machine](bare-metal.md)
- [Kubernetes](kubernetes.md)

<!-- gcp documentation to be added -->
