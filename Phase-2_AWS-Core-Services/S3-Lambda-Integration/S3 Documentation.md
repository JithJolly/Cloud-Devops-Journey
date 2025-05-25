# 🌩️ Hosting a Static Website on Amazon S3 with Lambda Trigger and DynamoDB Integration

This project demonstrates how to:
- Create and configure an **S3 bucket**
- Host a **static website** on S3
- Apply a **bucket policy** for public access
- Trigger a **Lambda function** via **API Gateway**
- Insert and retrieve **data from DynamoDB**
- All using **serverless architecture** on AWS

---

## 📦 1. Understanding Amazon S3

**Amazon S3 (Simple Storage Service)** is an object storage service that allows you to store and retrieve any amount of data at any time. Key components:

- **Bucket**: A container for storing objects (like a folder)
- **Object**: Any file such as HTML, CSS, JS, images, etc.

---

## 🪜 2. Steps to Create an S3 Bucket

1. Open the **AWS Management Console**
2. Navigate to **S3** and click **Create bucket**
3. Enter a unique **bucket name** (e.g., `my-static-site-bucket`)
4. Choose your **AWS region**
5. **Uncheck** "Block all public access" → Confirm acknowledgement
6. Click **Create bucket**

📸 *Attach Screenshot:* `screenshots/create-bucket.png`

---

## 📤 3. Uploading Files to S3

1. Open your created bucket
2. Click **Upload**
3. Add files: `index.html`, `style.css`, `script.js`, etc.
4. Click **Upload**


---

## 🔐 4. Bucket Policy for Public Access

To make your static site publicly accessible, apply the following bucket policy:

### ✅ Steps to Generate Policy:
1. Go to [AWS Policy Generator](https://awspolicygen.s3.amazonaws.com/policygen.html)
2. Use these settings:
   - **Effect**: Allow
   - **Principal**: `*`
   - **Action**: `s3:GetObject`
   - **ARN**: `arn:aws:s3:::your-bucket-name/*`
3. Copy the generated JSON and paste it under **Permissions > Bucket Policy**

### 🔐 Example Policy:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadForStaticWebsite",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```
Note: The /* at the end of the resource ARN allows public read access to all objects inside your bucket.

## 🗂️ 5. Bucket Versioning (Optional but Recommended)

Bucket versioning helps you maintain multiple variants of an object in the same bucket. This allows:
- Recovery from unintended overwrites and deletions
- Tracking of object modifications over time

### 🔧 Enable Versioning:
1. Go to your bucket → Properties tab
2. Scroll to Bucket Versioning
3. Click Edit → Enable → Save

---

## 🌐 6. Static Website Hosting on S3

S3 allows you to host static websites (HTML, CSS, JS only — no backend logic).

### 🛠️ Steps to Enable:
1. Go to your bucket → Properties
2. Scroll to Static website hosting
3. Click Edit, then:
   - Enable
   - Enter `index.html` as the Index document
4. Click Save changes

You will now get a public endpoint URL to access your website. Example:

http://your-bucket-name.s3-website-<region>.amazonaws.com



📸 *Attach Screenshot:* `screenshots/static-hosting-enabled.png`

---

## 💡 7. Real-World Example Project

### 🎯 Objective:
Build a simple web app hosted on S3 that allows you to:
- Enter employee data
- Upload it to DynamoDB
- Fetch and display it using Lambda + API Gateway

---

## ⚙️ 8. Project Setup Overview

### ✅ Prerequisite:
Your static site (HTML + JS files) must already be uploaded and publicly accessible via S3.

---

## 🧠 9. Understanding AWS Lambda

AWS Lambda lets you run code without provisioning servers. In this project, Lambda functions will:
- Handle data submission and store it in DynamoDB
- Handle data retrieval from DynamoDB

### 🛠️ Create Lambda Functions:
1. Go to Lambda from AWS Console
2. Click Create function
3. Choose:
   - Author from scratch
   - Function name (e.g., `uploadEmployeeData`, `fetchEmployeeData`)
   - Runtime (e.g., Python 3.9, Node.js 16.x)
4. Assign an IAM Role with permissions for:
   - `dynamodb:PutItem`, `dynamodb:GetItem`, `dynamodb:Scan`
5. Click Create function
6. Deploy the function after writing code

---

## 🌉 10. Connecting Lambda with API Gateway

### 🔄 Purpose:
Allow the frontend (S3 static site) to call Lambda functions via HTTPS endpoints.

### 🚀 Steps:
1. Go to API Gateway from AWS Console
2. Create a new REST API
3. Create resources (e.g., `/employees`)
4. Create methods (POST for upload, GET for fetch)
5. Select Lambda integration
6. Enable CORS
7. Deploy API to a new stage (e.g., `prod`)

> You'll get an invoke URL like: `https://api-id.execute-api.region.amazonaws.com/prod`

---

## 🧾 11. Creating DynamoDB Table

1. Go to DynamoDB → Create table
2. Enter:
   - Table name: `Employees`
   - Partition key: `employeeId` (String)
3. Configure settings (defaults usually fine)
4. Click Create

---

## 🔗 12. Frontend Implementation

All necessary frontend files are included in the project folder:

- `index.html`: Contains the HTML structure and form for employee data
- `style.css`: Includes all styling for the web interface
- `script.js`: Handles form submission and data fetching from API Gateway

The frontend code is already properly integrated with the backend services. Simply upload these files to your S3 bucket to get started.

---

## ✅ 13. Final Workflow Summary

1. User visits S3-hosted site
2. Submits employee form → POST to API Gateway
3. Lambda processes data → stores in DynamoDB
4. When viewing data → GET request triggers Lambda
5. Lambda queries DynamoDB → returns data to frontend

---

