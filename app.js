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
const getFactFindTextractResults = async (jobId) => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(async () => {
      try {
        // Check the job status
        const jobResponse = await textract
          .getDocumentAnalysis({ JobId: jobId })
          .promise();

        // If job succeeded, retrieve all pages
        if (jobResponse.JobStatus === "SUCCEEDED") {
          clearInterval(interval);

          // Initialize array to store all blocks and pagination token
          let allBlocks = [];
          let nextToken = null;

          do {
            // Fetch results page by page using nextToken
            const pageResponse = await textract
              .getDocumentAnalysis({
                JobId: jobId,
                NextToken: nextToken,
              })
              .promise();

            // Append blocks from each page to the result
            allBlocks.push(...pageResponse.Blocks);

            // Update nextToken for next page, or set to null if no more pages
            nextToken = pageResponse.NextToken || null;
          } while (nextToken);

          resolve(allBlocks);
        } else if (jobResponse.JobStatus === "FAILED") {
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

const getClientHandoverTextractResults = async (jobId) => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(async () => {
      try {
        // Check the job status
        const jobResponse = await textract
          .getDocumentAnalysis({ JobId: jobId })
          .promise();

        // If job succeeded, retrieve all pages
        if (jobResponse.JobStatus === "SUCCEEDED") {
          clearInterval(interval);

          // Initialize array to store all blocks and pagination token
          let allBlocks = [];
          let nextToken = null;

          do {
            // Fetch results page by page using nextToken
            const pageResponse = await textract
              .getDocumentAnalysis({
                JobId: jobId,
                NextToken: nextToken,
              })
              .promise();

            // Append blocks from each page to the result
            allBlocks.push(...pageResponse.Blocks);

            // Update nextToken for next page, or set to null if no more pages
            nextToken = pageResponse.NextToken || null;
          } while (nextToken);

          resolve(allBlocks);
        } else if (jobResponse.JobStatus === "FAILED") {
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

const getDriverLicenseTextractResults = async (jobId) => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(async () => {
      try {
        // Check the job status
        const jobResponse = await textract
          .getDocumentAnalysis({ JobId: jobId })
          .promise();

        // If job succeeded, retrieve all pages
        if (jobResponse.JobStatus === "SUCCEEDED") {
          clearInterval(interval);

          // Initialize array to store all blocks and pagination token
          let allBlocks = [];
          let nextToken = null;

          do {
            // Fetch results page by page using nextToken
            const pageResponse = await textract
              .getDocumentAnalysis({
                JobId: jobId,
                NextToken: nextToken,
              })
              .promise();

            // Append blocks from each page to the result
            allBlocks.push(...pageResponse.Blocks);

            // Update nextToken for next page, or set to null if no more pages
            nextToken = pageResponse.NextToken || null;
          } while (nextToken);

          resolve(allBlocks);
        } else if (jobResponse.JobStatus === "FAILED") {
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

const getPassportFileTextractResults = async (jobId) => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(async () => {
      try {
        // Check the job status
        const jobResponse = await textract
          .getDocumentAnalysis({ JobId: jobId })
          .promise();

        // If job succeeded, retrieve all pages
        if (jobResponse.JobStatus === "SUCCEEDED") {
          clearInterval(interval);

          // Initialize array to store all blocks and pagination token
          let allBlocks = [];
          let nextToken = null;

          do {
            // Fetch results page by page using nextToken
            const pageResponse = await textract
              .getDocumentAnalysis({
                JobId: jobId,
                NextToken: nextToken,
              })
              .promise();

            // Append blocks from each page to the result
            allBlocks.push(...pageResponse.Blocks);

            // Update nextToken for next page, or set to null if no more pages
            nextToken = pageResponse.NextToken || null;
          } while (nextToken);

          resolve(allBlocks);
        } else if (jobResponse.JobStatus === "FAILED") {
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

const getNationalIDTextractResults = async (jobId) => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(async () => {
      try {
        // Check the job status
        const jobResponse = await textract
          .getDocumentAnalysis({ JobId: jobId })
          .promise();

        // If job succeeded, retrieve all pages
        if (jobResponse.JobStatus === "SUCCEEDED") {
          clearInterval(interval);

          // Initialize array to store all blocks and pagination token
          let allBlocks = [];
          let nextToken = null;

          do {
            // Fetch results page by page using nextToken
            const pageResponse = await textract
              .getDocumentAnalysis({
                JobId: jobId,
                NextToken: nextToken,
              })
              .promise();

            // Append blocks from each page to the result
            allBlocks.push(...pageResponse.Blocks);

            // Update nextToken for next page, or set to null if no more pages
            nextToken = pageResponse.NextToken || null;
          } while (nextToken);

          resolve(allBlocks);
        } else if (jobResponse.JobStatus === "FAILED") {
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

const getBirthCertificateTextractResults = async (jobId) => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(async () => {
      try {
        // Check the job status
        const jobResponse = await textract
          .getDocumentAnalysis({ JobId: jobId })
          .promise();

        // If job succeeded, retrieve all pages
        if (jobResponse.JobStatus === "SUCCEEDED") {
          clearInterval(interval);

          // Initialize array to store all blocks and pagination token
          let allBlocks = [];
          let nextToken = null;

          do {
            // Fetch results page by page using nextToken
            const pageResponse = await textract
              .getDocumentAnalysis({
                JobId: jobId,
                NextToken: nextToken,
              })
              .promise();

            // Append blocks from each page to the result
            allBlocks.push(...pageResponse.Blocks);

            // Update nextToken for next page, or set to null if no more pages
            nextToken = pageResponse.NextToken || null;
          } while (nextToken);

          resolve(allBlocks);
        } else if (jobResponse.JobStatus === "FAILED") {
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

const getMedicareTextractResults = async (jobId) => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(async () => {
      try {
        // Check the job status
        const jobResponse = await textract
          .getDocumentAnalysis({ JobId: jobId })
          .promise();

        // If job succeeded, retrieve all pages
        if (jobResponse.JobStatus === "SUCCEEDED") {
          clearInterval(interval);

          // Initialize array to store all blocks and pagination token
          let allBlocks = [];
          let nextToken = null;

          do {
            // Fetch results page by page using nextToken
            const pageResponse = await textract
              .getDocumentAnalysis({
                JobId: jobId,
                NextToken: nextToken,
              })
              .promise();

            // Append blocks from each page to the result
            allBlocks.push(...pageResponse.Blocks);

            // Update nextToken for next page, or set to null if no more pages
            nextToken = pageResponse.NextToken || null;
          } while (nextToken);

          resolve(allBlocks);
        } else if (jobResponse.JobStatus === "FAILED") {
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

const getPayslipTextractResults = async (jobId) => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(async () => {
      try {
        // Check the job status
        const jobResponse = await textract
          .getDocumentAnalysis({ JobId: jobId })
          .promise();

        // If job succeeded, retrieve all pages
        if (jobResponse.JobStatus === "SUCCEEDED") {
          clearInterval(interval);

          // Initialize array to store all blocks and pagination token
          let allBlocks = [];
          let nextToken = null;

          do {
            // Fetch results page by page using nextToken
            const pageResponse = await textract
              .getDocumentAnalysis({
                JobId: jobId,
                NextToken: nextToken,
              })
              .promise();

            // Append blocks from each page to the result
            allBlocks.push(...pageResponse.Blocks);

            // Update nextToken for next page, or set to null if no more pages
            nextToken = pageResponse.NextToken || null;
          } while (nextToken);

          resolve(allBlocks);
        } else if (jobResponse.JobStatus === "FAILED") {
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

// Function to simplify the textract data
// const simplifyTextractResults = (textractData) => {
//   if (!textractData || !Array.isArray(textractData)) {
//     console.error("Textract data is undefined or not an array");
//     return [];
//   }

//   // Ensure textractData contains valid blocks with a BlockType
//   const blocks = textractData.filter((block) => block && block.BlockType);
//   if (!blocks.length) {
//     console.error("No blocks found in textract data");
//     return [];
//   }

//   // Process the blocks and return the simplified results
//   return blocks
//     .map((block) => {
//       if (block.BlockType === "LINE") {
//         return { text: block.Text || "", type: "LINE" };
//       } else if (block.BlockType === "KEY_VALUE_SET") {
//         const isKey = block.EntityTypes && block.EntityTypes.includes("KEY");
//         const isValue =
//           block.EntityTypes && block.EntityTypes.includes("VALUE");
//         const keyText = isKey ? block.Text || "Unknown Key" : undefined;
//         const valueText = isValue ? block.Text || "Unknown Value" : undefined;

//         return keyText && valueText
//           ? { text: `${keyText} : ${valueText}`, type: "KEY_VALUE_PAIR" }
//           : null;
//       }
//       return null;
//     })
//     .filter((entry) => entry !== null); // Remove any null entries
// };

const simplifyFactFindTextractResults = (textractData) => {
  if (!textractData || !Array.isArray(textractData)) {
    console.error("Textract data is undefined or not an array");
    return [];
  }

  const blocks = textractData.filter((block) => block && block.BlockType);
  if (!blocks.length) {
    console.error("No blocks found in textract data");
    return [];
  }

  let applicantsFound = false;
  let employmentSectionFound = false;
  let currentEmployerCount = 0;

  return blocks
    .slice(8)
    .map((block) => {
      // Check if block.Text is defined before using it
      const text = block.Text || "";

      // Detect co-applicant and primary applicant headers
      if (text.includes("PRIMARY APPLICANT")) {
        applicantsFound = true;
        return { text: "PRIMARY APPLICANT", type: "LINE" };
      } else if (text.includes("CO-APPLICANT")) {
        applicantsFound = true;
        return { text: "CO-APPLICANT / SECONDARY APPLICANT", type: "LINE" };
      }

      // Detect start of the "CURRENT EMPLOYMENT/INCOME" section
      if (text === "CURRENT EMPLOYMENT/INCOME") {
        employmentSectionFound = true;
        return { text: "CURRENT EMPLOYMENT/INCOME", type: "LINE" };
      }

      // Check for "Current Employer" entries within the employment section
      if (
        employmentSectionFound &&
        typeof text === "object" &&
        text["Current Employer"]
      ) {
        currentEmployerCount += 1;

        // If there are more than 3 employers, return a cancel message
        if (currentEmployerCount > 3) {
          return {
            text: "Cancel: Too many current employers",
            type: "MESSAGE",
          };
        }

        return { text: text, type: "LINE" };
      }

      // Format name details
      if (applicantsFound && text.startsWith("Full Name:")) {
        const fullName = text.replace("Full Name: ", "").trim();
        const nameParts = fullName.split(" ");

        let nameObject = { firstName: nameParts[0] };
        if (nameParts.length === 2) {
          nameObject.surname = nameParts[1];
        } else if (nameParts.length > 2) {
          nameObject.middleName = nameParts.slice(1, -1).join(" ");
          nameObject.surname = nameParts[nameParts.length - 1];
        }

        return { text: nameObject, type: "APPLICANT_NAME" };
      }

      // Format other key-value details
      if (block.BlockType === "LINE" && text.includes(":")) {
        const [key, value] = text.split(":").map((str) => str.trim());
        return { text: { [key]: value || "" }, type: "LINE" };
      }

      // Default LINE type for any other text without key-value
      return { text: text, type: "LINE" };
    })
    .filter((entry) => entry !== null);
};

const simplifyDriverLicenceTextractResults = (textractData) => {
  if (!textractData || !Array.isArray(textractData)) {
    console.error("Textract data is undefined or not an array");
    return [];
  }

  // Ensure textractData contains valid blocks with a BlockType
  const blocks = textractData.filter((block) => block && block.BlockType);
  if (!blocks.length) {
    console.error("No blocks found in textract data");
    return [];
  }

  const nonNameKeywords = [
    "Driver",
    "Licence",
    "Card",
    "Number",
    "Class",
    "Date",
    "of",
    "Birth",
    "Expiry",
  ];

  // Process the blocks and return the simplified results
  return blocks
    .map((block) => {
      if (block.BlockType === "LINE") {
        const text = block.Text || "";
        const words = text.split(" ");

        // Check if the line looks like a name: capitalized words, max 3 parts, no keywords
        const isPossibleName =
          words.length <= 3 &&
          words.every((word) => /^[A-Z][a-zA-Z]*$/.test(word)) &&
          !words.some((word) => nonNameKeywords.includes(word));

        if (isPossibleName) {
          const [firstName, middleName, surname] = words;
          let nameObject = { firstName };
          if (surname) {
            nameObject.surname = surname;
          }
          if (middleName && surname) {
            nameObject.middleName = middleName;
          }
          return { text: nameObject, type: "FULL_NAME" };
        }

        return { text: text, type: "LINE" };
      }

      // Handle KEY_VALUE_SET blocks
      if (block.BlockType === "KEY_VALUE_SET") {
        const isKey = block.EntityTypes && block.EntityTypes.includes("KEY");
        const isValue =
          block.EntityTypes && block.EntityTypes.includes("VALUE");
        const keyText = isKey ? block.Text || "Unknown Key" : undefined;
        const valueText = isValue ? block.Text || "Unknown Value" : undefined;

        return keyText && valueText
          ? { text: `${keyText} : ${valueText}`, type: "KEY_VALUE_PAIR" }
          : null;
      }

      return null;
    })
    .filter((entry) => entry !== null); // Remove any null entries
};

const simplifyPayslipTextractResults = (textractData) => {
  if (!textractData || !Array.isArray(textractData)) {
    console.error("Textract data is undefined or not an array");
    return [];
  }

  // Ensure textractData contains valid blocks with a BlockType
  const blocks = textractData.filter((block) => block && block.BlockType);
  if (!blocks.length) {
    console.error("No blocks found in textract data");
    return [];
  }

  // Process the blocks and return the simplified results
  return blocks
    .map((block) => {
      if (block.BlockType === "LINE") {
        return { text: block.Text || "", type: "LINE" };
      } else if (block.BlockType === "KEY_VALUE_SET") {
        const isKey = block.EntityTypes && block.EntityTypes.includes("KEY");
        const isValue =
          block.EntityTypes && block.EntityTypes.includes("VALUE");
        const keyText = isKey ? block.Text || "Unknown Key" : undefined;
        const valueText = isValue ? block.Text || "Unknown Value" : undefined;

        return keyText && valueText
          ? { text: `${keyText} : ${valueText}`, type: "KEY_VALUE_PAIR" }
          : null;
      }
      return null;
    })
    .filter((entry) => entry !== null); // Remove any null entries
};

// const simplifyTextractResults = (textractData) => {
//   if (!textractData || !Array.isArray(textractData)) {
//     console.error("Textract data is undefined or not an array");
//     return [];
//   }

//   const blocks = textractData.filter((block) => block && block.BlockType);
//   if (!blocks.length) {
//     console.error("No blocks found in textract data");
//     return [];
//   }

//   let applicantsFound = false;
//   let currentEmployers = [];
//   let employerLimitReached = false;

//   return blocks
//     .slice(8)
//     .map((block) => {
//       const text = block.Text || "";

//       // Detect "CURRENT EMPLOYMENT/INCOME" and reset employer list
//       if (text.includes("CURRENT EMPLOYMENT/INCOME")) {
//         applicantsFound = true;
//         currentEmployers = []; // Reset for new applicant
//         return { text: "CURRENT EMPLOYMENT/INCOME", type: "LINE" };
//       }

//       // Group "Current Employer" data
//       if (applicantsFound && text.includes("Current Employer")) {
//         if (currentEmployers.length < 3) {
//           currentEmployers.push(text.replace("Current Employer: ", "").trim());
//           return null; // Skip returning individual employer entries
//         } else {
//           employerLimitReached = true;
//         }
//       }

//       // At the end of current employer data, check and return grouped employers
//       if (employerLimitReached || text.includes("PRIMARY APPLICANT") || text.includes("CO-APPLICANT")) {
//         employerLimitReached = false; // Reset limit flag for next section
//         if (currentEmployers.length > 0) {
//           const groupedEmployers = {
//             text: { "Current Employers": currentEmployers },
//             type: "LINE",
//           };
//           currentEmployers = []; // Clear for next applicant group
//           return groupedEmployers;
//         }

//         if (currentEmployers.length > 3) {
//           return { text: "Cancel: Too many current employers", type: "MESSAGE" };
//         }
//       }

//       // Default LINE type for any other text without key-value
//       return { text: text, type: "LINE" };
//     })
//     .filter((entry) => entry !== null);
// };

// POST endpoint to accept a file
app.post("/upload", upload.single("file"), async (req, res) => {
  const type = req.body.doc_type;

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
    switch (type) {
      case "find_fact_file":
        {
          console.log("Extracting find_fact_file");
          const textractResults = await getFactFindTextractResults(jobId);
          const simplifiedResults =
            simplifyFactFindTextractResults(textractResults);

          console.log(simplifiedResults);

          // Send the Textract results to n8n
          // await sendToN8N(simplifiedResults);

          res.status(200).send({
            message: "File processed successfully for find_fact_file.",
            data: simplifiedResults,
          });
        }
        break;

      case "client_handover":
        {
          console.log("Extracting client_handover");
          const textractResults = await getClientHandoverTextractResults(jobId);
          const simplifiedResults = simplifyTextractResults(textractResults);

          // Send the Textract results to n8n
          await sendToN8N(simplifiedResults);

          res.status(200).send({
            message: "File processed successfully for client_handover.",
            data: simplifiedResults,
          });
        }
        break;

      case "driver_license_file":
        {
          console.log("Extracting driver_license_file");
          const textractResults = await getDriverLicenseTextractResults(jobId);
          const simplifiedResults =
            simplifyDriverLicenceTextractResults(textractResults);

          console.log(simplifiedResults);

          // Send the Textract results to n8n
          // await sendToN8N(simplifiedResults);

          res.status(200).send({
            message: "File processed successfully for driver_license_file.",
            data: simplifiedResults,
          });
        }
        break;

      case "passport_file":
        {
          console.log("Extracting passport_file");
          const textractResults = await getPassportFileTextractResults(jobId);
          const simplifiedResults = simplifyTextractResults(textractResults);
          // Send the Textract results to n8n
          await sendToN8N(simplifiedResults);

          res.status(200).send({
            message: "File processed successfully for passport_file.",
            data: simplifiedResults,
          });
        }
        break;

      case "national_id_file":
        {
          console.log("Extracting national_id_file");
          const textractResults = await getNationalIDTextractResults(jobId);
          const simplifiedResults = simplifyTextractResults(textractResults);

          // Send the Textract results to n8n
          await sendToN8N(simplifiedResults);

          res.status(200).send({
            message: "File processed successfully for national_id_file.",
            data: simplifiedResults,
          });
        }
        break;

      case "birth_cert_file":
        {
          console.log("Extracting birth_cert_file");
          const textractResults = await getBirthCertificateTextractResults(
            jobId
          );
          const simplifiedResults = simplifyTextractResults(textractResults);

          // Send the Textract results to n8n
          await sendToN8N(simplifiedResults);

          res.status(200).send({
            message: "File processed successfully for birth_cert_file.",
            data: simplifiedResults,
          });
        }
        break;

      case "medicare_file":
        {
          console.log("Extracting medicare_file");
          const textractResults = await getMedicareTextractResults(jobId);
          const simplifiedResults = simplifyTextractResults(textractResults);

          // Send the Textract results to n8n
          await sendToN8N(simplifiedResults);

          res.status(200).send({
            message: "File processed successfully for medicare_file.",
            data: simplifiedResults,
          });
        }
        break;

      case "payslip_file":
        {
          console.log("Extracting payslip_file");
          const textractResults = await getPayslipTextractResults(jobId);
          const simplifiedResults =
            simplifyPayslipTextractResults(textractResults);

          console.log(simplifiedResults);
          // Send the Textract results to n8n
          // await sendToN8N(simplifiedResults);

          res.status(200).send({
            message: "File processed successfully for payslip_file.",
            data: simplifiedResults,
          });
        }
        break;

      default:
        res.status(400).send({
          message: "Invalid type specified.",
        });
        break;
    }
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).send("Error processing file.");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
