import Image from "next/image";
import React from "react";

const DragDropFile = ({ setFile }) => {
  const handleUploadFile = (e) => {
    if (e.target.files.length === 1) setFile(e.target.files[0]);
    // else multi file <-- here
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center border-4 border-gray-300 border-dashed rounded font-semibold cursor-default">
      <Image width={48} height={48} src="/PNG/download.png" alt="download" />
      Drag & Drop
      <div>
        or {""}
        <span className="hover:underline text-blue-400 relative cursor-pointer">
          <span className="cursor-pointer">browse</span>
          <input
            type="file"
            accept="image/png"
            className="absolute left-0 opacity-0 w-full cursor-pointer"
            onChange={handleUploadFile}
          />
        </span>
      </div>
    </div>
  );
};

export default DragDropFile;
