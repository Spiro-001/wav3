import { Credentials, S3, config } from "aws-sdk";
import axios from "axios";

const s3Client = new S3({
  region: "us-east-1",
  signatureVersion: "v4",
  accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_CLIENT_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_CLIENT_SECRET_KEY,
});

export const uploadSPhotoToS3 = async (photo) => {
  try {
    const photoParams = {
      Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
      Key: photo.name,
      Expires: 1000,
      ContentType: photo.type,
    };
    const url = await s3Client.getSignedUrlPromise("putObject", photoParams);
    await axios.put(url, photo, {
      headers: {
        "Content-type": String(photo.type),
      },
    });
    return photoParams;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getSPhotoFromS3 = async (photoId) => {
  try {
    const url = s3Client.getSignedUrlPromise("getObject", {
      Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
      Key: photoId,
      Expires: 1000,
    });
    return url;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteSPhotoFromS3 = async (photoId) => {
  try {
    s3Client.deleteObject(
      {
        Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
        Key: photoId,
      },
      (err, data) => {
        if (err) console.log(err, err.stack);
        else console.log("S3 Item was deleted.");
      }
    );
    return;
  } catch (error) {
    console.log(error);
    return error;
  }
};
