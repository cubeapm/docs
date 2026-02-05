---
slug: /infra-monitoring/gcp-metric-explorer
sidebar_position: 8
---

# GCP Metric Explorer

OpenTelemetry Collector supports monitoring GCP services through **GCP Metric Explorer** (described in this document) and **direct communication**. The choice depends on the type of AWS service and your cost considerations.

### When to Use Each Method

#### Direct Communication (Recommended for Cost Efficiency)

For GCP services that use **underlying technologies supported by OpenTelemetry**, you can connect directly:

- **Container Services**: Google Kubernetes Engine (GKE) (Kubernetes), Cloud Run (containerized apps)
- **Database Services**: Cloud SQL (MySQL, PostgreSQL, etc.), Memorystore (Redis)
- **Message Queues**: CloudAMQP (Apache ActiveMQ, RabbitMQ), Pub/Sub (Apache Kafka)
- **Analytics**: Dataproc (Apache Spark, Hadoop), Elastic Cloud on GCP (Elasticsearch)

_Since these services use popular open-source technologies that OpenTelemetry natively supports, direct metric collection is more cost-effective._

### GCP Metric Explorer

For **GCP proprietary services** where Metric Explorer is the primary or only option for metric collection:

- **Compute**: Cloud Functions, Compute Engine, Batch
- **Storage**: Cloud Storage, Persistent Disk, Filestore
- **Networking**: VPC, Cloud CDN, Cloud DNS, Load Balancers (ALB/NLB)
- **API & Integration**: API Gateway, Pub/Sub, Eventarc, Workflows
- **Security**: Cloud Armor, Security Command Center
- **Developer Tools**: Cloud Build, Cloud Deploy

_For these GCP-native services, Metric Explorer provides comprehensive monitoring capabilities. It's often the most practical approach for these proprietary services._
   
