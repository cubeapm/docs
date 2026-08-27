---
sidebar_position: 1
slug: /install/terraform/terraform-aws
title: "AWS - EC2 Server"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Terraform AWS

You can deploy CubeAPM on AWS *(EC2 Server)* using our Terraform code.

## Prerequisites
Before getting started, ensure you have the following configuration ready:
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

    :::warning
    To avoid being prompted for these variables every time you run Terraform, create a `terraform.tfvars` file in the same directory:
    :::

4. Here's a sample `terraform.tfvars` file you can take a reference from here and update your ***terraform.tfvars*** file based on your infrastructure requirements:

    <Tabs>
    <TabItem value="new load balancer" label="Creating new LB" default>

    **Example 1: Creating a New ALB**
    ```hcl
    aws_profile            = "my-aws-profile"
    aws_region             = "ap-south-1"             # Optional: defaults to ap-south-1
    aws_ec2_ami            = "ami-0f10ad22bd55251b2"  # Optional: defaults to Ubuntu 24.04 arm64
    aws_ec2_instance_type  = "m8g.xlarge"             # Optional: defaults to m8g.xlarge
    aws_vpc_id             = "vpc-0123456789abcdef0"
    aws_subnet_id          = "subnet-0123456789abcdef0"
    aws_key_name           = "my-ssh-key-pair"
    aws_vpc_cidr           = "10.0.0.0/16"              # Required: The CIDR block for the VPC

    # Specific to creating the ALB:
    create_alb             = true
    lb_subnet_ids          = ["subnet-0123456789abcdef0", "subnet-0987654321fedcba0"]
    load_balancer_internal = false                      
    certificate_arn        = "arn:aws:acm:ap-south-1:123456789012:certificate/abcdef01-2345-6789-abcd-ef0123456789"
    ```

    </TabItem>
    <TabItem value="existing load balancer" label="Using existing LB" default>

    **Example 2: Using an Existing ALB**
    ```hcl
    aws_profile            = "my-aws-profile"
    aws_region             = "ap-south-1"             # Optional: defaults to ap-south-1
    aws_ec2_ami            = "ami-0f10ad22bd55251b2"  # Optional: defaults to Ubuntu 24.04 arm64
    aws_ec2_instance_type  = "m8g.xlarge"             # Optional: defaults to m8g.xlarge
    aws_vpc_id             = "vpc-0123456789abcdef0"
    aws_subnet_id          = "subnet-0123456789abcdef0"
    aws_key_name           = "my-ssh-key-pair"
    aws_vpc_cidr           = "10.0.0.0/16"              # Required: The CIDR block for the VPC

    # Specific to using an existing ALB:
    create_alb                     = false
    existing_alb_listener_arn      = "arn:aws:elasticloadbalancing:ap-south-1:123456789012:listener/app/my-alb/abcdef0123456789/0987654321fedcba"
    cubeapm_host_header            = ["cubeapm.mydomain.com"]
    alb_listener_rule_priority     = 50
    existing_alb_security_group_id = "sg-0123456789abcdef0"
    ```

    </TabItem>
    </Tabs>

5. Once your variables are configured, run the following command to provision the infrastructure:

    ```bash
    # use this syntax if you have created `terraform.tfvars` file.
    terraform apply

    # use this syntax if you don't want to create the `terraform.tfvars` file.
    terraform apply -var="variable_name=variable_value" ...
    ```

## Knowledge Base

For more information about ***Terraform for AWS***, please refer to the [Terraform AWS documentation](https://registry.terraform.io/providers/hashicorp/aws/latest/docs).
