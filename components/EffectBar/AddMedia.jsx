import Image from "next/image";
import React, { useRef } from "react";

const AddMedia = () => {
  // const constraints = {
  //   video: {
  //     width: {
  //       min: 1280,
  //       ideal: 1920,
  //       max: 2560,
  //     },
  //     height: {
  //       min: 720,
  //       ideal: 1080,
  //       max: 1440,
  //     },
  //   },
  // };
  // const cameraRef = useRef();
  // const openCamera = async () => {
  //   if (
  //     "mediaDevices" in navigator &&
  //     "getUserMedia" in navigator.mediaDevices
  //   ) {
  //     const videoStream = await navigator.mediaDevices.getUserMedia(
  //       constraints
  //     );
  //     console.log(videoStream);
  //     cameraRef.current.srcObject = videoStream;
  //   }
  // };

  return (
    <>
      {/* <video ref={cameraRef} autoPlay={true} className="absolute" /> */}
      <div className="flex gap-x-2">
        {/* <span className="w-full flex justify-center border border-gray-400 rounded-sm py-1 cursor-pointer">
          <Image
            width={24}
            height={24}
            src="/PNG/camera.png"
            alt="camera"
            onClick={openCamera}
          />
        </span> */}
        <span className="w-full flex justify-center border border-gray-400 rounded-sm py-1 cursor-pointer">
          <Image width={24} height={24} src="/PNG/gallery.png" alt="gallery" />
        </span>
        <span className="w-full flex justify-center border border-gray-400 rounded-sm py-1 cursor-pointer">
          <Image width={24} height={24} src="/PNG/video.png" alt="video" />
        </span>
      </div>
    </>
  );
};

export default AddMedia;
