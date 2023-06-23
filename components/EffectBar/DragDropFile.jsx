import Image from "next/image";
import React, { useState } from "react";

const DragDropFile = ({ setFile }) => {
  const [previewImage, setPreviewImage] = useState();
  const handleUploadFile = (e) => {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
    if (e.target.files.length === 1) setFile(e.target.files[0]);
    else setFile(e.target.files);
  };

  return (
    <div
      className={`h-80 w-full flex flex-col justify-center items-center border-4 border-gray-300 border-dashed rounded font-semibold cursor-default relative ${
        previewImage && "border-stone-950 bg-black"
      }`}
    >
      {previewImage && (
        <div className="object-contain h-full w-full z-10">
          <Image
            width={0}
            height={0}
            src={previewImage}
            className="object-contain h-full w-full"
            alt="preview"
          />
          <input
            type="file"
            accept="image/png, image/jpg, image/jpeg"
            className="w-full h-full absolute top-0 opacity-0 cursor-pointer"
            onChange={handleUploadFile}
            multiple={true}
          />
        </div>
      )}
      <div className="flex flex-col items-center absolute">
        <Image width={48} height={48} src="/PNG/download.png" alt="download" />
        Drag & Drop
        <div>
          or {""}
          <span className="hover:underline text-blue-400 relative cursor-pointer">
            <span className="cursor-pointer">browse</span>
            <input
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              className="absolute left-0 opacity-0 w-full cursor-pointer"
              onChange={handleUploadFile}
              multiple={true}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default DragDropFile;
