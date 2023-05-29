import React from "react";

const FtTrack = () => {
  return (
    <div className="py-4 flex flex-col gap-y-2 h-full">
      <div className="border-white border-2 px-4 py-3 flex gap-x-4 w-full">
        <div className="image-container h-36 w-36 flex">
          <img
            src="https://picsum.photos/500/500"
            alt="song-pic"
            className="object-cover w-full h-full rounded"
          />
        </div>
        <div className="song-info flex flex-col flex-1">
          <div className="flex justify-between items-center">
            <span className="text-sm">EXXSTACY</span>
            <span className="text-sm">1 month ago</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-2xl">Come to me</span>
            <span className="text-sm bg-white text-black font-semibold border rounded-lg px-3">
              #Alternative-Rock
            </span>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default FtTrack;
