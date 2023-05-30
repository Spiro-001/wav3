"use client";

import { formatDateAgo, isNew } from "@utils/numbers/dateAgoFormat";
import { formatNumber } from "@utils/numbers/numberFormat";
import Image from "next/image";
import React, { useState } from "react";
import Track from "./Track";

const Album = ({
  title,
  artist,
  tag,
  date,
  likes,
  highlights,
  shares,
  plays,
  comments,
  songs,
}) => {
  const [like, setLike] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const [comment, setComment] = useState(false);
  const [share, setShare] = useState(false);
  const [play, setPlay] = useState(false);

  return (
    <div
      className={`${
        isNew(date) ? "border-red-400" : "border-transparent"
      } border-2 flex gap-x-4 w-full relative`}
    >
      {isNew(date) && (
        <span className="new-song px-1 absolute right-3 -top-3 text-red-100">
          New Upload
        </span>
      )}
      <Track
        title={title}
        artist={artist}
        tag={tag}
        date={date}
        likes={likes}
        highlights={highlights}
        shares={shares}
        plays={plays}
        comments={comments}
        isAlbum={true}
        songs={songs}
      />
    </div>
  );
};

export default Album;
