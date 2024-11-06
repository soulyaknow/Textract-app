const express = require("express");
const multer = require("multer");
const AWS = require("aws-sdk");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = 3011;

// Configure AWS Textract
AWS.config.update({
  region: "ap-southeast-2",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const textract = new AWS.Textract();
const s3 = new AWS.S3();
const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
const awsBucketName = process.env.AWS_BUCKET_NAME;

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

const bucketName = awsBucketName;

// Function to get Textract job results
const getTextractResults = async (jobId) => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(async () => {
      try {
        const response = await textract
          .getDocumentAnalysis({ JobId: jobId })
          .promise();
        if (response.JobStatus === "SUCCEEDED") {
          clearInterval(interval);
          resolve(response);
        } else if (response.JobStatus === "FAILED") {
          clearInterval(interval);
          reject("Textract job failed.");
        }
      } catch (error) {
        clearInterval(interval);
        reject(error);
      }
    }, 5000); // Poll every 5 seconds
  });
};

// Function to send results to n8n webhook
const sendToN8N = async (data) => {
  try {
    console.log("Sending data:", data);
    const response = await axios.post(n8nWebhookUrl, data);
    console.log("Data sent to n8n successfully:", response.data);
  } catch (error) {
    console.error("Error sending data to n8n:", {
      message: error.message,
      response: error.response
        ? {
            status: error.response.status,
            statusText: error.response.statusText,
            data: error.response.data,
          }
        : null,
    });
  }
};

// POST endpoint to accept a file
app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  try {
    const s3Key = `uploads/${req.file.originalname}`;

    // Upload the file to S3
    await s3
      .upload({
        Bucket: bucketName,
        Key: s3Key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      })
      .promise();

    // Start document analysis
    const startResponse = await textract
      .startDocumentAnalysis({
        DocumentLocation: {
          S3Object: {
            Bucket: bucketName,
            Name: s3Key,
          },
        },
        FeatureTypes: ["TABLES", "FORMS"],
      })
      .promise();

    const jobId = startResponse.JobId;
    console.log("JobID:", jobId);

    // Poll for results
    const textractResults = await getTextractResults(jobId);

    // Send the Textract results to n8n
    await sendToN8N(textractResults);

    res
      .status(200)
      .send({ message: "File processed successfully.", data: textractResults });
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).send("Error processing file.");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
