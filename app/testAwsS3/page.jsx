"use client";

import { getSPhotoFromS3, uploadSPhotoToS3 } from "@aws/s3_aws";
import Image from "next/image";
import React, { useState } from "react";

const page = () => {
  const [message, setMessage] = useState();
  const [file, setFile] = useState();
  const [s3Image, setS3Image] = useState("");

  const storeFile = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    setMessage("Uploading...");
    const returnData = await uploadSPhotoToS3(file);
    // setS3Image(
    //   `https://${process.env.NEXT_PUBLIC_BUCKET_URL}/${returnData.Key}`
    // );
    setMessage("Upload Complete");
    setFile(null);
    let imageURL = await getSPhotoFromS3(file);
    setS3Image(imageURL);
  };

  console.log(s3Image);

  return (
    <div>
      <p>upload file:</p>
      <p style={{ color: "red" }}>{message}</p>
      <input type="file" onChange={(e) => storeFile(e)} accept="image/png" />
      <input type="button" onClick={uploadFile} defaultValue="Send" />
      <Image src={s3Image} height={50} width={50} />
    </div>
  );
};

export default page;
