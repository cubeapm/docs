---
sidebar_position: 5
slug: /install/terraform
---

# Terraform

CubeAPM can be seamlessly deployed on AWS/GCP using our official Terraform module. This module automates the provisioning of all necessary infrastructure, including the backend **EC2/VM instances**, **Security Groups**, and **network configurations**. 
It is designed to be highly flexible—you can either let the module provision a brand-new Application Load Balancer (ALB) complete with HTTP/HTTPS listeners, or seamlessly integrate CubeAPM behind an **existing ALB** in your infrastructure using Host Header routing.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="aws" label="Amazon Web Service" default>

## Prerequisites
Before getting started, ensure you have the following ready:
- [Terraform](https://developer.hashicorp.com/terraform/downloads) installed (v1.0.0 or higher).
- AWS Credentials configured locally (e.g., via `aws configure`).
- An existing AWS VPC and Subnet where CubeAPM will be deployed.
- An SSH Key Pair created in your AWS account to access the CubeAPM server.

## Installation 

1. Clone the `CubeAPM-Terraform-AWS` repository:

    ```bash
    git clone https://github.com/cubeapm/CubeAPM-Terraform-AWS.git
    ```

2. Initialize Terraform:

    ```bash
    cd CubeAPM-Terraform-AWS
    terraform init
    ```

3. Deploy CubeAPM:

    While applying terraform it asks for following values, provide as per your requirement:

    | Variable | Type | Default | Description |
    |---|---|---|---|
    | `aws_profile` | `string` | | The AWS profile to use for authentication (example: `~/.aws/credentials`). |
    | `aws_region` | `string` | `"ap-south-1"` | The AWS region to deploy the resources to. |
    | `aws_ec2_ami` | `string` | `"ami-0f10ad22bd55251b2"` | The AWS AMI to use for the EC2 instance. |
    | `aws_ec2_instance_type` | `string` | `"m8g.xlarge"` | The AWS instance type to use for the EC2 instance. |
    | `aws_vpc_id` | `string` | | The ID of the VPC where the resources will be deployed. |
    | `aws_subnet_id` | `string` | | The ID of the subnet where the CubeAPM instance will run. |
    | `aws_key_name` | `string` | | The name of the SSH key pair to access the CubeAPM server. |
    | `aws_vpc_cidr` | `string` | | The CIDR block for the VPC. |
    | `create_alb` | `boolean` | `true` | Set to `true` to create a new Application Load Balancer. If `false`, an existing ALB listener will be used. |
    | `lb_subnet_ids` | `list(string)`| `[]` | List of Public/Private subnet IDs for the ALB. Required if `create_alb` is `true`. |
    | `load_balancer_internal`| `boolean`| `false` | Set to `true` to create an internal ALB, or `false` for an internet-facing ALB. |
    | `certificate_arn` | `string` | `""` | The ARN of the ACM certificate to use for the ALB. Required if `create_alb` is `true`. |
    | `existing_alb_listener_arn` | `string` | `""` | The ARN of the existing ALB listener to attach to. Required if `create_alb` is `false`. |
    | `cubeapm_host_header` | `list(string)`| `[]` | The host header(s) to use for routing traffic from an existing ALB (e.g., `["cubeapm.example.com"]`). |
    | `alb_listener_rule_priority`| `number` | `100` | The priority of the listener rule when using an existing ALB. |
    | `existing_alb_security_group_id`| `string` | `""` | The security group ID of the existing ALB. If empty and `create_alb` is `false`, defaults to allowing the VPC CIDR. |

    :::note
    To avoid being prompted for these variables every time you run Terraform, create a `terraform.tfvars` file in the same directory:
    :::

    **Example 1: Creating a New ALB**
    ```hcl
    aws_profile            = "my-aws-profile"
    aws_region             = "ap-south-1"             # Optional: defaults to ap-south-1
    aws_ec2_ami            = "ami-0f10ad22bd55251b2"  # Optional: defaults to Ubuntu 24.04 arm64
    aws_ec2_instance_type  = "m8g.xlarge"             # Optional: defaults to m8g.xlarge
    aws_vpc_id             = "vpc-0123456789abcdef0"
    aws_subnet_id          = "subnet-0123456789abcdef0"
    aws_key_name           = "my-ssh-key-pair"
    aws_vpc_cidr           = "10.0.0.0/16"

    # Specific to creating the ALB:
    create_alb             = true
    lb_subnet_ids          = ["subnet-0123456789abcdef0", "subnet-0987654321fedcba0"]
    load_balancer_internal = false
    certificate_arn        = "arn:aws:acm:ap-south-1:123456789012:certificate/abcdef01-2345-6789-abcd-ef0123456789"
    ```

    **Example 2: Using an Existing ALB**
    ```hcl
    aws_profile            = "my-aws-profile"
    aws_region             = "ap-south-1"             
    aws_ec2_ami            = "ami-0f10ad22bd55251b2"  
    aws_ec2_instance_type  = "m8g.xlarge"             
    aws_vpc_id             = "vpc-0123456789abcdef0"
    aws_subnet_id          = "subnet-0123456789abcdef0"
    aws_key_name           = "my-ssh-key-pair"
    aws_vpc_cidr           = "10.0.0.0/16"

    # Specific to using an existing ALB:
    create_alb                     = false
    existing_alb_listener_arn      = "arn:aws:elasticloadbalancing:ap-south-1:123456789012:listener/app/my-alb/abcdef0123456789/0987654321fedcba"
    cubeapm_host_header            = ["cubeapm.mydomain.com"]
    alb_listener_rule_priority     = 50
    existing_alb_security_group_id = "sg-0123456789abcdef0" # Optional: remove this line if you want to allow traffic from the entire VPC CIDR instead
    ```

    Once your variables are configured, run the following command to provision the infrastructure:

    ```bash
    # use this syntax if you have created `terraform.tfvars` file.
    terraform apply

    # use this syntax if you don't want to create the `terraform.tfvars` file.
    terraform apply -var="variable_name=variable_value" ...
    ```

</TabItem>
<TabItem value="gcp" label="Google Cloud Platform">

## Prerequisites
Before getting started, ensure you have the following ready:
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
    | `gcp_network_cidr` | `string` | | The CIDR block for the VPC, used for firewall rules. |
    | `load_balancer_scope` | `string` | | Select the load balancer scope: `"global"` or `"regional"`. |
    | `load_balancer_type` | `string` | | Select the load balancer type: `"internal"` or `"internet-facing"`. |
    | `create_lb` | `boolean` | `true` | Set to `true` to create a new Load Balancer (URL Map, Target Proxy, Forwarding Rule). If `false`, only the Backend Service is created. |

    :::note
    To avoid being prompted for these variables every time you run Terraform, create a `terraform.tfvars` file in the same directory:
    :::

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
    gcp_network_cidr      = "10.0.0.0/16"

    # Load Balancer Configuration
    create_lb             = true
    load_balancer_scope   = "global"
    load_balancer_type    = "internet-facing"
    ```

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
    gcp_network_cidr      = "10.0.0.0/16"

    # Load Balancer Configuration
    create_lb             = false
    load_balancer_scope   = "global"
    load_balancer_type    = "internet-facing"
    ```

    :::info
    **Why are `load_balancer_scope` and `load_balancer_type` required when `create_lb = false`?**
    Even when you are using an existing Load Balancer, Terraform still needs to create a **Backend Service** for you to attach to your URL Map. In GCP, Backend Services are categorized by load balancer type. Terraform needs these variables to know whether to provision a *Global* or *Regional* backend service, and whether to configure it for *Internal* or *External* traffic, ensuring it is compatible with your existing Load Balancer.
    :::

4. Apply the configuration:

    Once your variables are configured, run the following command to provision the infrastructure:

    ```bash
    # use this syntax if you have created `terraform.tfvars` file.
    terraform apply

    # use this syntax if you don't want to create the `terraform.tfvars` file.
    terraform apply -var="variable_name=variable_value" ...
    ```
</TabItem>
</Tabs>

