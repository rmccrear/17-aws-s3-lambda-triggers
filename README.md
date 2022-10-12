# AWS trigger

Example AWS trigger

## Usage

This trigger will log each image file that is uploaded to a folder called `images/`. The log file is called `images.json`

## Installation

Createa a Lambda funciton in AWS Lambda with permission to read and write to S3. Change the BUCKET to the name of your bucket.

Create an AWS bucket with permissions that allow the Lambda function to read and write.

Create a folder in AWS called `images/`. Then you can upload file to the images directory and the log file will be updated.
