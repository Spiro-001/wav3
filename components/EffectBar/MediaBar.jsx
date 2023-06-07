import { formatNumber } from "@utils/numbers/numberFormat";
import Image from "next/image";
import React from "react";

const MediaBar = ({
  likes,
  like,
  setLike,
  comments,
  highlights,
  views = 1,
}) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-x-1.5">
        <span
          className="text-sm bg-white flex text-black px-2 gap-x-1 items-center cursor-pointer rounded-sm select-none"
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
        <span className="text-sm bg-white flex text-black px-2 gap-x-1 items-center cursor-pointer rounded-sm select-none">
          <Image
            src="/PNG/comment.png"
            width={14}
            height={14}
            className="bp object-contain"
            alt="comment"
          />
          {comments ? formatNumber(comments) : "Comment"}
        </span>
        <span className="text-sm bg-white flex text-black px-2 gap-x-1 items-center cursor-pointer rounded-sm select-none">
          <Image
            src="/PNG/highlight.png"
            width={16}
            height={16}
            className="object-contain"
            alt="highlight"
          />
          {highlights ? formatNumber(highlights) : "Highlight"}
        </span>
      </div>
      <div>
        <span className="text-sm bg-white flex text-black px-2 gap-x-1 items-center rounded-sm select-none">
          <Image
            src="/PNG/bar-graph.png"
            width={16}
            height={16}
            className="object-contain"
            alt="highlight"
          />
          {formatNumber(views)}
        </span>
      </div>
    </div>
  );
};

export default MediaBar;
