---
slug: /infra-monitoring/gcp-metric-explorer/gcp-metric-explorer-kubernetes
sidebar_position: 2
---

# Kubernetes

## Metric Explorer Setup


In GKE, pods do not automatically inherit project IAM permissions.
Instead, you should use Workload Identity so that:
Kubernetes Service Account (KSA) → Google Service Account (GSA) → IAM roles

For EKS and self-managed Kubernetes clusters, Workload Identity is not available. 
Use service account key files stored as Kubernetes secrets instead.




