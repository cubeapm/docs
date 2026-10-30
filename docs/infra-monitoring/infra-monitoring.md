---
slug: /infra-monitoring
sidebar_position: 5
---

# Infra Monitoring

CubeAPM supports monitoring of popular infrastructure components, e.g., bare-metal/virtual-machines, Kubernetes, MySQL, MS SQL, Redis, Nginx, ElasticSearch, Kafka, and many more.

## Installation Steps

Please follow the links below for installation steps according to deployment environment.

- [Bare Metal / Virtual Machine](2_baremetal.md)
- [Kubernetes](3_kubernetes.md) (via Helm)
- [AWS](5_cloudwatch.md) (via CloudWatch)

## Configuration

To configure infrastructure components on CubeAPM you need to run **OpenTelemetry Collector** agent either on [Bare Metal / Virtual Machine](2_baremetal.md) or in [Kubernetes](3_kubernetes.md). 

:::note
If you are running the OpenTelemetry Collector in Kubernetes, make sure the following infrastructure component configurations are added to the **Otel-Collector-Deployment.yaml** file.
:::

Follow the steps below to configure it for your environment.

### Aerospike

To monitor Aerospike, enable `aerospike` receiver in **Otel-Collector** `config.yaml` file.

```yaml
receivers:
  aerospike:
    endpoint: "<aerospike_endpoint>:3000"
    collect_cluster_metrics: true
    collection_interval: 60s
    # username 
    # password
    # tls

service:
  pipelines:
    metrics:
      receivers:
        # Individual infra monitoring agents can be disabled
        # by commenting them out here.
        - aerospike
      ....
```

For more configuration, refer [**Aerospike**](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/aerospikereceiver)

### Apache Web Server

To monitor Apache Web Server enable `apache` receiver in **Otel-Collector** `config.yaml` file.

```yaml
receivers:
  apache:
    endpoint: "http://<apache_endpoint>:80/server-status?auto"
    collection_interval: 60s

service:
  pipelines:
    metrics:
      receivers:
        # Individual infra monitoring agents can be disabled
        # by commenting them out here.
        - apache
      ....
```

For more configuration, refer [**Apache**](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/apachereceiver)

### Elasticsearch

To monitor Elasticsearch, enable `elasticsearch` receiver in **Otel-Collector** `config.yaml` file.

```yaml
receivers:
  elasticsearch:
    endpoint: "http://<elasticsearch_endpoint>:9200"
    username: elastic
    password: elastic
    collection_interval: 60s

service:
  pipelines:
    metrics:
      receivers:
        # Individual infra monitoring agents can be disabled
        # by commenting them out here.
        - elasticsearch
      ....
```

For more configuration, refer [**Elasticsearch**](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/elasticsearchreceiver)

### HA Proxy

To monitor HA Proxy, enable `haproxy` receiver in **Otel-Collector** `config.yaml` file.

```yaml
receivers:
  haproxy:
    endpoint: http://<haproxy_endpoint>:8404/stats
    collection_interval: 60s
    metrics:
      haproxy.connections.total:
        enabled: true
      haproxy.failed_checks:
        enabled: true

service:
  pipelines:
    metrics:
      receivers:
        # Individual infra monitoring agents can be disabled
        # by commenting them out here.
        - haproxy
      ....
```

For more configuration, refer [**HA Proxy**](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/haproxyreceiver#readme)

### Host Monitoring

To monitor host/vm enable `hostmetrics` receiver in **Otel-Collector** `config.yaml` file.

These metrics are enabled by default to enable/disable add more metrics refer [**Host Metrics**](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver#readme).

```yaml
receivers:
  # hostmetrics monitors host machines (bare metal, ec2, etc.)
  # It collects metrics for CPU, memory, etc. on the host
  # where the collector is running.
  hostmetrics:
    collection_interval: 60s
    scrapers:
      cpu:
      disk:
      load:
      filesystem:
      memory:
      network:
      # paging:
      # processes:
      # process:
      #   mute_process_all_errors: true

service:
  pipelines:
    metrics:
      receivers:
        # Individual infra monitoring agents can be disabled
        # by commenting them out here.
        - hostmetrics
      ....
```

:::note
While scrapers support multiple options, individual metrics within a scraper may be enabled or disabled. Refer to each scraper's documentation:
:::

#### Disk

To enable Disk I/O metrics, add below configuration in `disk` scraper:

```yaml
disk:
    exclude:
        devices:
          - ^loop.*$
        match_type: regexp
    metrics:
      system.disk.io:
        enabled: false
      system.disk.merged:
        enabled: false
      system.disk.operation_time:
        enabled: false
      system.disk.operations:
        enabled: false
      system.disk.pending_operations:
        enabled: false
      system.disk.weighted_io_time:
        enabled: false
```

#### Load

For CPU load metrics, add the below configuration in `load` scraper:

```yaml
load:
    cpu_average: false
```

#### Filesystem

For File System utilization metrics, add the below configuration in `filesystem` scraper:

```yaml
filesystem:
    exclude_devices:
        devices:
            - ^/dev/loop.*$
        match_type: regexp
    metrics:
        system.filesystem.inodes.usage:
            enabled: false
```

#### Network

For Network interface I/O metrics & TCP connection metrics, add below configuration in `network` scraper:

```yaml
network:
    metrics:
        system.network.connections:
            enabled: false
        system.network.dropped:
            enabled: false
        system.network.errors:
            enabled: false
        system.network.packets:
            enabled: false
```

#### Process

For Per process CPU, Memory, and Disk I/O metrics, add below configuration in `process` scraper:

```yaml
process:
    exclude:
        names:
            - ^(irq|ksoftirqd|kworker|idle_inject|cpuhp|migration)/.*$
            - ^(systemd|rcu_|nvme-).*$
        match_type: regexp
    metrics:
        process.disk.io:
            enabled: false
        process.memory.virtual:
            enabled: false
    mute_process_name_error: true
    mute_process_cgroup_error: true
    mute_process_exe_error: true
    mute_process_io_error: true
    mute_process_user_error: true
```

### Kafka

To monitor Kafka, enable `kafka` receiver in **Otel-Collector** `config.yaml` file.

```yaml
receivers:
  kafkametrics:
    protocol_version: "3.0.0"
    cluster_alias: my-kafka-cluster
    scrapers:
      - brokers
      - topics
      - consumers
    brokers: <kafka_endpoint>:9092
    collection_interval: 60s
    topic_match: ^[^_].*$ # exclude internal topics (starting with _)
    resource_attributes:
      kafka.cluster.alias:
        enabled: true
    metadata:
      # default is 10m, which is too long a delay for getting
      # metadata (topics, partitions, etc.) updates.
      refresh_interval: 2m

service:
  pipelines:
    metrics:
      receivers:
        # Individual infra monitoring agents can be disabled
        # by commenting them out here.
        - kafkametrics
      ....
```

For more configuration, refer [**Kafka**](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/kafkametricsreceiver#readme)

### Memcached

To monitor Memcached, enable `memcached` receiver in **Otel-Collector** `config.yaml` file.

```yaml
receivers:
  memcached:
    endpoint: <memcached_endpoint>:11211
    transport: tcp
    collection_interval: 60s

service:
  pipelines:
    metrics:
      receivers:
        # Individual infra monitoring agents can be disabled
        # by commenting them out here.
        - memcached
      ....
```

For more configuration, refer [**Memcached**](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/memcachedreceiver#readme)

### MongoDB

To monitor MongoDB, enable `mongodb` receiver in **Otel-Collector** `config.yaml` file.

```yaml
receivers:
  mongodb:
    hosts:
      - endpoint: <mongodb_endpoint>:27017
    # username: cubeapm
    # password: mypassword
    collection_interval: 60s
    tls:
      insecure: true
      # ca_file: /etc/otelcol-contrib/global-bundle.pem

service:
  pipelines:
    metrics:
      receivers:
        # Individual infra monitoring agents can be disabled
        # by commenting them out here.
        - mongodb
      ....
```

For more configuration, refer [**MongoDB**](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/mongodbreceiver#readme)

### MongoDB Atlas

To monitor MongoDB Atlas, enable `mongodbatlas` receiver in **Otel-Collector** `config.yaml` file.

For setting up MongoDB Atlas monitoring requires **Public Key** and **Private Key**, with **Project Read Only** permission.

```yaml
receivers:
  mongodbatlas:
    # It is highly recommended to use environment variables for keys
    public_key: "${env:MONGODB_ATLAS_PUBLIC_KEY}"
    private_key: "${env:MONGODB_ATLAS_PRIVATE_KEY}"

    # Granularity of the metrics (ISO 8601 duration).
    # 'PT1M' is 1 minute.
    granularity: "PT1M"

    # Optional: List of Project IDs to scrape.
    # If omitted, it attempts to scrape all projects accessible by the API key.
    # projects:
    #   - "your-project-id-1"

    # RESOURCE ATTRIBUTES CONFIGURATION
    # Based on your provided config, some attributes (like cluster.name)
    # were 'enabled: false'. This section forces them to be enabled.
    resource_attributes:
      mongodb_atlas.cluster.name:
        enabled: true
      mongodb_atlas.project.name:
        enabled: true
      mongodb_atlas.user.alias:
        enabled: true

service:
  pipelines:
    metrics:
      receivers:
        # Individual infra monitoring agents can be disabled
        # by commenting them out here.
        - mongodbatlas
      ....
```

### MySQL

This `mysql` receiver can monitor multiple MySQL instances running on different machines or to monitor managed MySQL instances like **Amazon RDS**, **Azure MySQL**, etc. You can specify the MySQL endpoint as `endpoint: <mysql_endpoint>:3306`.

The monitoring user must be granted:

```sql
GRANT PROCESS ON *.* TO '<user>'@'<hostname>';
GRANT SELECT ON performance_schema.* TO '<user>'@'<hostname>';
FLUSH PRIVILEGES;
```

To monitor MySQL, enable `mysql` receiver in in **Otel-Collector** `config.yaml` file.

```yaml
receivers:
  mysql:
    endpoint: <mysql_endpoint>:3306
    username: root
    password: root
    collection_interval: 60s
    metrics:
      mysql.commands:
        enabled: true
      mysql.connection.count:
        enabled: true
      mysql.connection.errors:
        enabled: true
      mysql.query.count:
        enabled: true
      mysql.query.slow.count:
        enabled: true
      mysql.joins:
        enabled: true
      mysql.replica.sql_delay:
        enabled: true
      mysql.replica.time_behind_source:
        enabled: true
      mysql.index.io.wait.time:
        enabled: false
      mysql.index.io.wait.count:
        enabled: false
      mysql.table.io.wait.time:
        enabled: false
      mysql.table.io.wait.count:
        enabled: false
  #       mysql.table.size: ## to enable database size metrics
  #         enabled: true

service:
  pipelines:
    metrics:
      receivers:
        # Individual infra monitoring agents can be disabled
        # by commenting them out here.
        - mysql
      ....
```

For more configuration, refer [**MySQL**](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/mysqlreceiver#readme)

### Nginx

You must configure NGINX to expose status information by editing the NGINX configuration. Please see [ngx_http_stub_status_module](https://nginx.org/en/docs/http/ngx_http_stub_status_module.html) for a guide to configuring the NGINX stats module `ngx_http_stub_status_module`.

To monitor Nginx, enable `nginx` receiver in **Otel-Collector** `config.yaml` file.

```yaml
receivers:
  nginx:
    endpoint: http://localhost:80/status
    collection_interval: 60s

service:
  pipelines:
    metrics:
      receivers:
        # Individual infra monitoring agents can be disabled
        # by commenting them out here.
        - nginx
      ....
```

For more configuration, refer [**Nginx**](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/nginxreceiver#readme)

### PostgreSQL

This `postgresql` receiver can monitor multiple PostgreSQL instances running on different machines or to monitor managed PostgreSQL instances like **Amazon RDS**, **Azure Database for PostgreSQL**, etc. You can specify the PostgreSQL endpoint as `endpoint: <postgresql_endpoint>:5432`.

The monitoring user must be granted:

```sql
SELECT on pg_stat_database
```

To monitor PostgreSQL, enable `postgresql` receiver in **Otel-Collector** `config.yaml` file.

```yaml
receivers:
  postgresql:
    endpoint: <postgres_endpoint>:5432
    transport: tcp
    username: cubeapm
    password: mypassword
    # databases:
    #   - otel
    # exclude_databases:
    #   - rdsadmin
    collection_interval: 60s
    tls:
      insecure: true

service:
  pipelines:
    metrics:
      receivers:
        # Individual infra monitoring agents can be disabled
        # by commenting them out here.
        - postgresql
      ....
```

For more configuration, refer [**PostgreSQL**](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/postgresqlreceiver#readme)

### RabbitMQ

This `rabbitmq` receiver can monitor multiple RabbitMQ instances running on different machines or to monitor managed RabbitMQ instances like **Amazon MQ for RabbitMQ**. You can specify the RabbitMQ endpoint as `endpoint: <rabbitmq_endpoint>:5672`.

Also, a user with at least [monitoring](https://www.rabbitmq.com/docs/management#permissions) level permissions must be used for monitoring.

To monitor RabbitMQ, enable `rabbitmq` receiver in **Otel-Collector** `config.yaml` file.

```yaml
receivers:
  rabbitmq:
    endpoint: <rabbitmq_endpoint>:5672
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    collection_interval: 60s

service:
  pipelines:
    metrics:
      receivers:
        # Individual infra monitoring agents can be disabled
        # by commenting them out here.
        - rabbitmq
      ....
```

For more configuration, refer [**RabbitMQ**](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/rabbitmqreceiver#readme)

### Redis

This `redis` receiver can monitor multiple Redis instances running on different machines. Also you can monitor multiple cloud managed Redis instances like **Amazon ElastiCache for Redis**, **Google Cloud Memorystore for Redis**, **Azure Cache for Redis**, or **Azure Managed Redis**, etc. You can specify the Redis instance endpoint as `endpoint: <redis_endpoint>:6379`.

To monitor Redis, enable `redis` receiver in **Otel-Collector** `config.yaml` file.

```yaml
receivers:
  redis:
    endpoint: <redis_endpoint>:6379
    # transport: tcp
    collection_interval: 60s
    resource_attributes:
      server.address:
        enabled: true
    metrics:
      redis.cmd.calls:
        enabled: true

service:
  pipelines:
    metrics:
      receivers:
        # Individual infra monitoring agents can be disabled
        # by commenting them out here.
        - redis
      ....
```

For more configuration, refer [**Redis**](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/redisreceiver#readme)




