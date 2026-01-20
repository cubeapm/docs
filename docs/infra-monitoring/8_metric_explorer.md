---
sidebar_position: 8
slug: /infra-monitoring/gcp-metric-explorer
---

# GCP Metric Explorer

CubeAPM supports monitoring GCP services through **GCP Metric Exploter** (described in this document) and **direct communication**. The choice depends on the type of AWS service and your cost considerations.

### When to Use Each Method

#### Direct Communication (Recommended for Cost Efficiency)

For GCP services that use **underlying technologies supported by OpenTelemetry**, you can connect directly to avoid CloudWatch streaming costs:

- **Container Services**: Google Kubernetes Engine (GKE) (Kubernetes), Cloud Run (containerized apps)
- **Database Services**: Cloud SQL (MySQL, PostgreSQL, etc.), Memorystore (Redis)
- **Message Queues**: CloudAMQP (Apache ActiveMQ, RabbitMQ), Pub/Sub (Apache Kafka)
- **Analytics**: Dataproc (Apache Spark, Hadoop), Elastic Cloud on GCP (Elasticsearch)

_Since these services use popular open-source technologies that OpenTelemetry natively supports, direct metric collection is more cost-effective._

### GCP Metric Exploter

For **GCP proprietary services** where Metric Explorer is the primary or only option for metric collection:

- **Compute**: Cloud Functions, Compute Engine, Batch
- **Storage**: Cloud Storage, Persistent Disk, Filestore
- **Networking**: VPC, Cloud CDN, Cloud DNS, Load Balancers (ALB/NLB)
- **API & Integration**: API Gateway, Pub/Sub, Eventarc, Workflows
- **Security**: Cloud Armor, Security Command Center
- **Developer Tools**: Cloud Build, Cloud Deploy

_For these GCP-native services, Metric Explorer provides comprehensive monitoring capabilities. It's often the most practical approach for these proprietary services._

## Metric Explorer Setup

1. Copy the file below and save as `gcp-metrics.yaml` respectively. Edit it to customize the configuration as per your requirements.
   Adding/Removing projects and metrics that needs to be monitored
    <details>
   <summary>gcp-metrics.yaml</summary>
   ```yaml
    projects:
      - id: able-reef-466806-u4
        env: test
      - id: second-project-467409
    metrics:
      - cloudsql.googleapis.com/database/cpu/utilization
      - cloudsql.googleapis.com/database/disk/read_bytes_count
      - cloudsql.googleapis.com/database/disk/read_ops_count
      - cloudsql.googleapis.com/database/disk/utilization
      - cloudsql.googleapis.com/database/disk/write_bytes_count
      - cloudsql.googleapis.com/database/disk/write_ops_count
      - cloudsql.googleapis.com/database/memory/utilization
      - cloudsql.googleapis.com/database/mysql/connections_count
      - cloudsql.googleapis.com/database/network/received_bytes_count
      - cloudsql.googleapis.com/database/network/sent_bytes_count
      - cloudsql.googleapis.com/database/replication/replica_lag
      - compute.googleapis.com/instance/cpu/utilization
      - compute.googleapis.com/instance/disk/read_bytes_count
      - compute.googleapis.com/instance/disk/write_bytes_count
      - compute.googleapis.com/instance/network/received_bytes_count
      - compute.googleapis.com/instance/network/sent_bytes_count
      - compute.googleapis.com/instance/uptime
      - redis.googleapis.com/stats/cpu_utilization
      - redis.googleapis.com/stats/cpu_utilization_main_thread
      - redis.googleapis.com/stats/evicted_keys
      - redis.googleapis.com/stats/expired_keys
      - redis.googleapis.com/stats/keyspace_hits
      - redis.googleapis.com/stats/keyspace_misses
      - redis.googleapis.com/stats/memory/maxmemory
      - redis.googleapis.com/stats/memory/system_memory_overload_duration
      - redis.googleapis.com/stats/memory/system_memory_usage_ratio
      - redis.googleapis.com/stats/memory/usage
      - redis.googleapis.com/stats/memory/usage_ratio
      - redis.googleapis.com/stats/network_traffic
      - redis.googleapis.com/stats/pubsub/channels
      - redis.googleapis.com/stats/pubsub/patterns
      - redis.googleapis.com/stats/reject_connections_count
   ```
   </details>

2. Below is the list of all configuration parameters supported by CubeAPM, along with documentation and default values.

    ```shell title="config.properties"
    
    # Path to YAML configuration file that specifies which GCP projects and metrics to collect. 
    # Required to enable GCP monitoring.
    metrics.gcp.config-file=

    # Path to GCP service account credentials JSON file. 
    # If not provided, CubeAPM will use Application Default Credentials (ADC). 
    # See [GCP Authentication](https://cloud.google.com/docs/authentication/application-default-credentials) for details.
    # If permission is not provided through credentials file.
    # Ensure service account attched to cubeapm instance has Monitoring Viewer permission for project to be monitored
    metrics.gcp.application-credentials-file=
    ```
3. In case we are providing credentials using GCP service account credentials JSON file. `Monitoring Viewer` needs to be attached   to service account. In case multiple projects needs to be monitored, you can attach permission for multiple project to same service account.

   :::info
    In GKE, pods do not automatically inherit project IAM permissions.
    Instead, you should use Workload Identity so that:
    Kubernetes Service Account (KSA) → Google Service Account (GSA) → IAM roles
   :::

   todo :: add service account steps

   
