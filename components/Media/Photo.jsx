import { getSPhotoFromS3 } from "@aws/s3_aws";
import React, { useEffect, useState } from "react";

const Photo = ({ images }) => {
  const [imageLink, setImageLink] = useState("");
  useEffect(() => {
    const getImage = async () => {
      var imageURL = await getSPhotoFromS3(images[0]);
      setImageLink(imageURL);
    };
    getImage();
  });

  console.log(imageLink);

  return (
    <div className="max-h-96 flex border-gray-400 rounded w-full justify-start items-start">
      <img
        src={imageLink}
        alt="profile"
        className="object-contain rounded select-none h-full w-60"
      />
    </div>
  );
};

export default Photo;
