# Amazon EC2 – Getting Started Guide

Welcome to the AWS EC2 setup and deployment guide. In this document, I walk through the foundational steps to get started with **Amazon EC2 (Elastic Compute Cloud)** – a core service in AWS that provides scalable virtual servers in the cloud.

---

## 🌐 What is EC2?

Amazon EC2 is a virtual server in the cloud where you can install an operating system and run applications. You can connect your local system to an EC2 instance via the **SSH protocol**. It acts just like a regular server, where you can install software like Apache, host websites, run scripts, and much more.

---

## 🧑‍💻 Prerequisites

Before launching an EC2 instance, ensure that:

1. You have an [AWS Free Tier Account](https://aws.amazon.com/free).
2. Set up **Billing Alerts** to avoid unexpected charges by enabling:
   - **AWS Budgets**
   - **CloudWatch**
   - **SNS (Simple Notification Service)**

These services help monitor usage and send email alerts when thresholds are crossed – a must-have for beginners working on the Free Tier.

---

## 🚀 Launching an EC2 Instance

Follow the steps below to create and configure your first EC2 instance:

1. **Change Region**  
   Select the region closest to your location.

2. **Launch Instance Wizard**  
   - **Name**: Give your instance a meaningful name.
   - **AMI**: Select an Amazon Machine Image (Amazon Linux recommended).
   - **Instance Type**: Choose `t2.micro` (Free Tier eligible).
   - **Key Pair**: Create or select an existing `.pem` key file for SSH access.
   - **Network Settings**:
     - Allow SSH (port 22)
     - Allow HTTP (port 80) – if you plan to host a website
   - **User Data (Optional)**: Add shell script to auto-install software (e.g., Apache) and return a success message in the browser.
   - **Launch Instance**

---

## 🔐 Connect to Your EC2 Instance

Use Git Bash or PuTTY to connect via SSH (Git Bash was used in my case – on Windows).

> When you have created and launched an AWS Linux EC2 instance, you can connect to it from your computer using the Secure Shell (SSH) protocol. PuTTY is a free SSH client that allows you to do this from a local computer running Windows.

### 1. Change File Permission for `.pem` File:
```bash
chmod 400 <key-value-file>.pem
```
- `chmod`: Command to change file permissions.
- `400`: Permission setting that allows **read-only by the owner**.
- `<key-value-file>.pem`: Your downloaded SSH private key file.

This prevents unauthorized access and is required by SSH for security reasons.

---

### 2. Connect via SSH:
```bash
ssh -i <key-value-file>.pem ec2-user@<public-ip-address>
```
- `ssh`: Command to connect via Secure Shell.
- `-i`: Flag to specify the identity file (your `.pem` file).
- `ec2-user`: Default user for Amazon Linux AMI.
- `<public-ip-address>`: The public IPv4 address of your EC2 instance.

If successful, you’re now logged into the EC2 server shell!

---

## 🌐 Installing Apache Web Server

Run the following commands on your EC2 instance:

```bash
sudo yum update -y
```
- `sudo`: Executes command with root privileges.
- `yum`: Amazon Linux package manager.
- `update -y`: Automatically answers "yes" to update all packages.

```bash
sudo yum install httpd -y
```
- `install httpd`: Installs Apache web server.
- `httpd`: Package name for Apache.
- `-y`: Automatically confirm installation.

```bash
sudo systemctl start httpd
```
- `systemctl`: Tool to control system services.
- `start httpd`: Starts the Apache service.

```bash
sudo systemctl enable httpd
```
- `enable httpd`: Ensures Apache starts automatically on boot.

After setup, visit:
```
http://<public-ip-address>
```
You should see the Apache default page.

---

## 📝 Hosting a Custom HTML File

### 1. Transfer HTML file to EC2:
```bash
scp -i <key-value.pem> /path/to/index.html ec2-user@<public-ip>:/home/ec2-user/
```
- `scp`: Secure Copy command.
- `-i`: Specifies identity file.
- `/path/to/index.html`: Path to your HTML file on your local machine.
- `ec2-user@<public-ip>`: Destination (your EC2 instance).
- `/home/ec2-user/`: Target directory on EC2.

This copies your custom HTML file to your EC2 instance.

---

### 2. Move the file to Apache's root directory:
```bash
sudo mv index.html /var/www/html/
```
- `mv`: Move or rename files.
- `/var/www/html/`: Apache’s root folder where web files are served.

Now, refreshing `http://<public-ip>` should display your HTML page.

✔️ An example `index.html` file is included in this folder.

---

## 💡 Notes & Best Practices

- **IP Address Changes**: Each time you stop/start an instance, the public IP will change.  
  Use **Elastic IPs** to assign a static IP that doesn’t change.

- **Stop vs Terminate**:
  - **Stop**: Shuts down the instance temporarily (data retained).
  - **Terminate**: Deletes the instance (data lost unless saved elsewhere).

- Always **terminate instances** when not in use to avoid charges.

- Monitor:
  - **EBS volumes**: Storage attached to EC2
  - **Free Tier usage**: Prevent accidental billing

---

## 🔐 IAM Roles (Optional)

You can attach **IAM Roles** to your EC2 instance for access control:

- Grant permissions to use other AWS services (like S3)
- Define who can SSH into the instance
- Enforce fine-grained security

IAM improves security by enforcing the **principle of least privilege**.

---

## ✅ Summary

I successfully:
- ✅ Launched an EC2 instance
- ✅ Installed and configured Apache Web Server
- ✅ Hosted a custom HTML page

This marks my first hands-on success with AWS EC2!

---

## 📂 Folder Content

```
Phase-2_AWS-Core-Services/
│
├── EC2/
│   ├── README.md  ← This file
│   ├── index.html ← Sample HTML hosted on EC2
```

---

## 📌 Final Thoughts

This guide provides a solid foundation for working with EC2. I’ve learned how to:

- Deploy a cloud server
- Connect via SSH
- Host a live website

More AWS services will be explored in future phases!

---
