---
slug: /infra-monitoring/gcp-metric-explorer/gcp-metric-explorer-vm
sidebar_position: 1
---

# Virtual Machine 

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
3. If you are not using an existing service account, create a Google Service Account first:

   ```bash
   # Create the service account
   gcloud iam service-accounts create <service-account-name> \
       --project=<gcp-project-id> \
       --display-name="CubeAPM Metrics Service Account" \
       --description="Service account for CubeAPM to access GCP Monitoring APIs"
   ```

   :::tip
   If you already have a service account that you want to use, you can skip this step and proceed to the next step.
   :::

4. In case we are providing credentials using GCP service account credentials JSON file. `Monitoring Viewer` and `Viewer` permission for the service which you want to pulled the metrics needs to be attached to service account. In case multiple projects needs to be monitored, you can attach permission for multiple project to same service account.