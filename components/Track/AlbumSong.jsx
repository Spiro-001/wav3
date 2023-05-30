import { formatNumber } from "@utils/numbers/numberFormat";
import Image from "next/image";
import React from "react";

const AlbumSong = ({ title, order, plays, lastChild }) => {
  return (
    <div
      className={`flex justify-between items-center content-center ${
        !lastChild && "border-b border-white pb-2"
      }`}
    >
      <div className="flex gap-x-2 items-center">
        <div className="image-container h-6 w-6 flex">
          <img
            src="https://picsum.photos/500/500"
            alt="song-pic"
            className="object-cover w-full h-full rounded-sm"
          />
        </div>
        <span className="font-semibold">{order}</span>
        <span>{title}</span>
      </div>
      <div className="flex gap-x-1 bg-white pr-1 rounded-sm">
        <Image
          src="/PNG/play.png"
          width={18}
          height={18}
          className="object-contain"
          alt="play"
        />
        <span className="text-black text-sm">{formatNumber(plays)}</span>
      </div>
    </div>
  );
};

export default AlbumSong;
