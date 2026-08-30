---
slug: /install/terraform/terraform
title: "Terraform"
---

# Terraform

CubeAPM can be seamlessly deployed on **AWS/GCP** using our official Terraform module. This module automates the provisioning of all necessary infrastructure, including the backend **EC2/VM instances**, **Security Groups**, and **network configurations**. 
It is designed to be highly flexible—you can either let the module provision a brand-new Application Load Balancer (ALB) complete with HTTP/HTTPS listeners, or seamlessly integrate CubeAPM behind an **existing ALB** in your infrastructure using **Host Header routing**.

## Installation Steps

Please follow the links below for installation steps according to deployment environment.

- [Terraform for AWS](terraform-aws.md)
- [Terraform for GCP](terraform-gcp.md)