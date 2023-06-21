"use client";

import { connectToS3 } from "@aws/s3_aws";
import React, { useState } from "react";

const page = () => {
  const [message, setMessage] = useState();
  const [file, setFile] = useState();

  const storeFile = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    setMessage("uploading!");
    const returnData = await connectToS3(file);
    setMessage(String(returnData));
    setFile(null);
  };

  return (
    <div>
      <p>upload file:</p>
      <p style={{ color: "red" }}>{message}</p>
      <input type="file" onChange={(e) => storeFile(e)} />
      <input type="button" onClick={uploadFile} defaultValue="Send" />
    </div>
  );
};

export default page;
