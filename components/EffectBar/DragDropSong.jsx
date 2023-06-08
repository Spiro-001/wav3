import Image from "next/image";
import React from "react";

const DragDropSong = () => {
  return (
    <div className="h-1/2 w-full flex flex-col justify-center items-center border-4 border-gray-300 border-dashed rounded font-semibold text-base">
      <Image width={36} height={36} src="/PNG/download.png" alt="download" />
      Drag & Drop
      <div>
        or {""}
        <span className="hover:underline cursor-pointer text-blue-400">
          browse
        </span>
      </div>
    </div>
  );
};

export default DragDropSong;
