import { Credentials, S3, config } from "aws-sdk";
import axios from "axios";

Credentials({
  accessKeyId: process.env.AWS_S3_CLIENT_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_CLIENT_SECRET_KEY,
});

const s3Client = new S3({
  region: "us-east-1",
  signatureVersion: "v4",
});

export const connectToS3 = async (file) => {
  try {
    const testParams = {
      Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
      Key: file.name,
      Expires: 1000,
      ContentType: file.type,
    };
    console.log(testParams);
    const url = await s3Client.getSignedUrlPromise("putObject", testParams);
    await axios.put(url, file, {
      headers: {
        "Content-type": String(file.type),
      },
    });
  } catch (error) {
    console.log(error);
  }
};
