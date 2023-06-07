"use client";

import { formatDateAgo, isNew } from "@utils/numbers/dateAgoFormat";
import { formatNumber } from "@utils/numbers/numberFormat";
import Image from "next/image";
import React, { useState } from "react";
import AlbumSong from "./AlbumSong";
import AudioMediaBar from "@components/EffectBar/AudioMediaBar";

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
  isHighlight,
  self,
}) => {
  const [like, setLike] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const [comment, setComment] = useState(false);
  const [share, setShare] = useState(false);
  const [play, setPlay] = useState(false);

  return (
    <div
      className={`${
        !isAlbum && isNew(date) ? "border-red-400 border-2" : "border-0"
      } px-4 py-3 flex gap-x-4 w-full relative`}
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
              <span className="text-sm">
                {isHighlight ? (
                  <span className="flex gap-x-1">
                    {self}{" "}
                    <Image
                      src="/PNG/w-highlight.png"
                      width={16}
                      height={16}
                      className="object-contain"
                      alt="highlight"
                    />
                    {artist}
                  </span>
                ) : (
                  artist
                )}
              </span>
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
        <AudioMediaBar
          plays={plays}
          comments={comments}
          likes={likes}
          highlights={highlights}
          setLike={setLike}
          like={like}
        />
      </div>
    </div>
  );
};

export default Track;
