---
sidebar_position: 2
slug: /install/terraform/terraform-gcp
title: "GCP - Compute Engine (VM)"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Terraform GCP

You can deploy CubeAPM on GCP *(Compute Engine VM)* using our Terraform code.

## Prerequisites
Before getting started, ensure you have the following configuration ready:
- [Terraform](https://developer.hashicorp.com/terraform/downloads) installed (v1.0.0 or higher).
- Google Cloud Platform (GCP) credentials configured locally (e.g., via `gcloud auth application-default login`).
- An existing GCP VPC and Subnetwork where CubeAPM will be deployed.

## Installation 

1. Clone the `CubeAPM-Terraform-VM-GCP` repository:

    ```bash
    git clone https://github.com/cubeapm/CubeAPM-Terraform-VM-GCP.git
    ```

2. Initialize Terraform:

    ```bash
    cd CubeAPM-Terraform-VM-GCP
    terraform init
    ```

3. Deploy CubeAPM:

    While applying terraform it asks for following values, provide as per your requirement:

    | Variable | Type | Default | Description |
    |---|---|---|---|
    | `gcp_project_id` | `string` | | The GCP Project ID where resources will be deployed. |
    | `gcp_region` | `string` | `"asia-south1"` | The GCP Region. |
    | `gcp_zone` | `string` | `"asia-south1-a"` | The GCP zone to deploy the resources to. |
    | `gcp_image` | `string` | `"ubuntu-os-cloud/ubuntu-2404-lts-amd64"` | The GCP image to use for the instance. |
    | `gcp_machine_type` | `string` | `"e2-standard-4"` | The GCP machine type to use. |
    | `gcp_network` | `string` | | VPC network name or self-link. |
    | `gcp_subnetwork` | `string` | | Subnetwork name or self-link. |
    | `load_balancer_scope` | `string` | | Select the load balancer scope: `"global"` or `"regional"`. |
    | `load_balancer_type` | `string` | | Select the load balancer type: `"internal"` or `"internet-facing"`. |
    | `create_lb` | `boolean` | `true` | Set to `true` to create a new Load Balancer (URL Map, Target Proxy, Forwarding Rule). If `false`, only the Backend Service is created. |

    :::warning
    To avoid being prompted for these variables every time you run Terraform, create a `terraform.tfvars` file in the same directory:
    :::

4. Here's a sample `terraform.tfvars` file you can take a reference from here and update your ***terraform.tfvars*** file based on your infrastructure requirements:

    <Tabs>
    <TabItem value="new load balancer" label="Creating new LB" default>

    **Example 1: Creating a New Load Balancer**
    ```hcl
    # GCP Authentication & Location
    gcp_project_id        = "my-cubeapm-project-12345"
    gcp_region            = "asia-south1"
    gcp_zone              = "asia-south1-a"

    # VM Specifications
    gcp_image             = "ubuntu-os-cloud/ubuntu-2404-lts-amd64"
    gcp_machine_type      = "e2-standard-4"

    # Networking
    gcp_network           = "my-vpc-network"
    gcp_subnetwork        = "my-app-subnet"

    # Load Balancer Configuration
    create_lb             = true
    load_balancer_scope   = "global"
    load_balancer_type    = "internet-facing"
    ```
    </TabItem>
    <TabItem value="existing load balancer" label="Using existing LB" default>

    **Example 2: Using an Existing Load Balancer**
    ```hcl
    # GCP Authentication & Location
    gcp_project_id        = "my-cubeapm-project-12345"
    gcp_region            = "asia-south1"
    gcp_zone              = "asia-south1-a"

    # VM Specifications
    gcp_image             = "ubuntu-os-cloud/ubuntu-2404-lts-amd64"
    gcp_machine_type      = "e2-standard-4"

    # Networking
    gcp_network           = "my-vpc-network"
    gcp_subnetwork        = "my-app-subnet"

    # Load Balancer Configuration
    create_lb             = false
    load_balancer_scope   = "global"
    load_balancer_type    = "internet-facing"
    ```
    </TabItem>
    </Tabs>

    :::info
    **Why are `load_balancer_scope` and `load_balancer_type` required when `create_lb = false`?**
    Even when you are using an existing Load Balancer, Terraform still needs to create a **Backend Service** for you to attach to your URL Map. In GCP, Backend Services are categorized by load balancer type. Terraform needs these variables to know whether to provision a *Global* or *Regional* backend service, and whether to configure it for *Internal* or *External* traffic, ensuring it is compatible with your existing Load Balancer.
    :::

4. Once your variables are configured, run the following command to provision the infrastructure:

    ```bash
    # use this syntax if you have created `terraform.tfvars` file.
    terraform apply

    # use this syntax if you don't want to create the `terraform.tfvars` file.
    terraform apply -var="variable_name=variable_value" ...
    ```

## Knowledge Base

For more information about ***Terraform for GCP***, please refer to the [Terraform GCP documentation](https://registry.terraform.io/providers/hashicorp/google/latest/docs).