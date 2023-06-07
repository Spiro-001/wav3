import Image from "next/image";
import React from "react";

const DragDropFile = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center border-4 border-gray-300 border-dashed rounded font-semibold">
      <Image width={48} height={48} src="/PNG/download.png" />
      Drag & Drop
    </div>
  );
};

export default DragDropFile;
