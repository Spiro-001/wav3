import Image from "next/image";
import React from "react";

const AddMedia = () => {
  return (
    <div className="flex gap-x-2">
      <span className="w-full flex justify-center border border-gray-400 rounded-sm py-1 cursor-pointer">
        <Image width={24} height={24} src="/PNG/camera.png" />
      </span>
      <span className="w-full flex justify-center border border-gray-400 rounded-sm py-1 cursor-pointer">
        <Image width={24} height={24} src="/PNG/gallery.png" />
      </span>
      <span className="w-full flex justify-center border border-gray-400 rounded-sm py-1 cursor-pointer">
        <Image width={24} height={24} src="/PNG/video.png" />
      </span>
    </div>
  );
};

export default AddMedia;
