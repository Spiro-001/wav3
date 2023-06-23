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

  return (
    <div className="max-h-96 flex h-96 border-gray-400 border rounded w-fit justify-start items-start flex-col">
      <img
        src={imageLink}
        alt="profile"
        className="object-contain rounded select-none h-full"
      />
    </div>
  );
};

export default Photo;
