import { formatNumber } from "@utils/numbers/numberFormat";
import Image from "next/image";
import React from "react";

const AudioMediaBar = ({
  plays,
  comments,
  likes,
  highlights,
  setLike,
  like,
}) => {
  return (
    <div className="flex items-center justify-between mt-auto pt-1">
      <div className="flex gap-x-1 items-center">
        <span
          className="text-sm bg-white flex text-black border dark:border-white border-black px-2 gap-x-1 items-center cursor-pointer rounded-sm select-none"
          onClick={() => setLike((prev) => !prev)}
        >
          <Image
            src="/PNG/liked.png"
            width={16}
            height={16}
            className="object-contain"
            alt="liked"
          />
          {likes + like ? formatNumber(likes + like) : "Like"}
        </span>
        <span className="text-sm bg-white flex text-black border dark:border-white border-black px-2 gap-x-1 items-center cursor-pointer rounded-sm select-none">
          <Image
            src="/PNG/highlight.png"
            width={16}
            height={16}
            className="object-contain"
            alt="highlight"
          />
          {highlights ? formatNumber(highlights) : "Highlight"}
        </span>
        <span className="text-sm bg-white flex text-black border dark:border-white border-black px-2 gap-x-1 items-center cursor-pointer rounded-sm select-none">
          <Image
            src="/PNG/share.png"
            width={16}
            height={16}
            className="object-contain"
            alt="share"
          />
          Share
        </span>
        <span className="text-sm bg-white flex text-black border dark:border-white border-black px-2 gap-x-1 items-center cursor-pointer rounded-sm select-none">
          <Image
            src="/PNG/edit.png"
            width={16}
            height={16}
            className="object-contain"
            alt="edit"
          />
          Edit
        </span>
        <span className="text-sm bg-white flex text-black border dark:border-white border-black px-2 gap-x-1 items-center cursor-pointer rounded-sm select-none">
          <Image
            src="/PNG/more.png"
            width={16}
            height={16}
            className="object-contain"
            alt="more"
          />
          More
        </span>
      </div>
      <div className="flex gap-x-1 items-center">
        <span className="text-sm bg-white flex text-black border dark:border-white border-black px-2 gap-x-1 items-center rounded-sm select-none">
          <Image
            src="/PNG/play.png"
            width={18}
            height={18}
            className="object-contain"
            alt="play"
          />
          {plays ? formatNumber(plays) : 1}
        </span>
        {comments && (
          <span className="text-sm bg-white flex text-black border dark:border-white border-black px-2 gap-x-1 items-center cursor-pointer rounded-sm select-none">
            <Image
              src="/PNG/comment.png"
              width={14}
              height={14}
              className="bp object-contain"
              alt="comment"
            />
            {formatNumber(comments)}
          </span>
        )}
      </div>
    </div>
  );
};

export default AudioMediaBar;
