"use client";

import { formatDateAgo, isNew } from "@utils/numbers/dateAgoFormat";
import { formatNumber } from "@utils/numbers/numberFormat";
import Image from "next/image";
import React, { useState } from "react";
import AlbumSong from "./AlbumSong";

const Track = ({
  title,
  artist,
  tag,
  date,
  likes,
  highlights,
  shares,
  plays,
  comments,
  isAlbum,
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
        !isAlbum && isNew(date) ? "border-red-400" : "border-0"
      } border-2 px-4 py-3 flex gap-x-4 w-full relative`}
    >
      {!isAlbum && isNew(date) && (
        <span className="new-song px-1 absolute right-3 -top-3 text-red-400">
          New Upload
        </span>
      )}
      <div className="image-container h-36 w-36 flex">
        <img
          src="https://picsum.photos/500/500"
          alt="song-pic"
          className="object-cover w-full h-full rounded-sm"
        />
      </div>
      <div className="song-info flex flex-col flex-1">
        <div className="flex flex-row gap-x-2 items-center mb-1">
          <span className="text-sm bg-white flex text-black p-2 gap-x-1 items-center cursor-pointer rounded-sm">
            <Image
              src="/PNG/playbutton.png"
              width={30}
              height={30}
              className="object-contain"
              alt="play-button"
            />
          </span>
          <div className="flex flex-col flex-1">
            <div className="flex justify-between items-center">
              <span className="text-sm">{artist}</span>
              <span className="text-sm">{formatDateAgo(date)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-2xl">{title}</span>
              <span className="text-sm bg-white text-black font-semibold border rounded-sm px-3">
                {tag && "#" + tag}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center relative w-full h-16">
          <Image
            src="/PNG/tempwav.png"
            fill={true}
            alt="wav-form"
            className="h-16"
          />
        </div>
        {isAlbum && (
          <div className="album-container p-2 border-white border mt-1 flex flex-col gap-y-2 rounded-sm">
            {songs.map((song, idx) => (
              <AlbumSong
                key={idx}
                title={song.title}
                order={song.order}
                plays={song.plays}
                lastChild={song.order === songs.length}
              />
            ))}
          </div>
        )}
        <div className="flex items-center justify-between mt-auto pt-1">
          <div className="flex gap-x-1 items-center">
            <span
              className="text-sm bg-white flex text-black px-2 gap-x-1 items-center cursor-pointer rounded-sm"
              onClick={() => setLike((prev) => !prev)}
            >
              <Image
                src="/PNG/liked.png"
                width={16}
                height={16}
                className="object-contain"
                alt="liked"
              />
              {likes ? formatNumber(likes + like) : "Like"}
            </span>
            <span className="text-sm bg-white flex text-black px-2 gap-x-1 items-center cursor-pointer rounded-sm">
              <Image
                src="/PNG/highlight.png"
                width={16}
                height={16}
                className="object-contain"
                alt="highlight"
              />
              {highlights ? formatNumber(highlights) : "Highlight"}
            </span>
            <span className="text-sm bg-white flex text-black px-2 gap-x-1 items-center cursor-pointer rounded-sm">
              <Image
                src="/PNG/share.png"
                width={16}
                height={16}
                className="object-contain"
                alt="share"
              />
              Share
            </span>
            <span className="text-sm bg-white flex text-black px-2 gap-x-1 items-center cursor-pointer rounded-sm">
              <Image
                src="/PNG/edit.png"
                width={16}
                height={16}
                className="object-contain"
                alt="edit"
              />
              Edit
            </span>
            <span className="text-sm bg-white flex text-black px-2 gap-x-1 items-center cursor-pointer rounded-sm">
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
            <span className="text-sm bg-white flex text-black px-2 gap-x-1 items-center cursor-pointer rounded-sm">
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
              <span className="text-sm bg-white flex text-black px-2 gap-x-1 items-center cursor-pointer rounded-sm">
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
      </div>
    </div>
  );
};

export default Track;
