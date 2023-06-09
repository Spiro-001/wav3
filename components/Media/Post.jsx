import Image from "next/image";
import React, { useEffect, useState } from "react";
import Photo from "./Photo";
import Slideshow from "./Slideshow";
import Text from "./Text";
import Video from "./Video";
import MediaBar from "@components/EffectBar/MediaBar";

const Post = ({ post }) => {
  const [like, setLike] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [highlights, setHighlights] = useState(0);
  const [views, setViews] = useState("Loading");
  const [body, setBody] = useState(post.body);
  const [images, setImages] = useState(post.images);
  const [video, setVideo] = useState(post.video);

  useEffect(() => {
    fetch(`api/demoviews/${post._id}`, {
      method: "POST",
    })
      .then(async (res) => {
        if (res.ok) return res.json();
        return await fetch(`api/demoviews/${post._id}`)
          .then((res) => res.json())
          .then((views) => views);
      })
      .then((views) => setViews(views.total));
  }, []);

  // const images = [
  //   {
  //     link: "https://picsum.photos/id/0/1920/1080",
  //   },
  //   {
  //     link: "https://picsum.photos/id/1/1920/1080",
  //   },
  //   {
  //     link: "https://picsum.photos/id/2/1920/1080",
  //   },
  //   {
  //     link: "https://picsum.photos/id/3/1920/1080",
  //   },
  // ];

  return (
    <div className="flex flex-col border dark:border-gray-400 border-gray-100 bg-white dark:bg-black p-6 rounded-lg">
      <div className="flex gap-x-6 flex-1">
        <div className="w-12 h-12">
          <img
            src="https://picsum.photos/300/300"
            alt="profile"
            className="object-cover h-full w-full rounded-full select-none"
          />
        </div>
        <div className="flex flex-col flex-1 h-fit content-center">
          <div className="flex gap-x-2 items-center flex-1">
            <div className="text-xl flex gap-x-2">
              <span>EXXSTACY</span>
              <span className="font-light text-gray-400 lt">@daniel</span>
            </div>
            <span className="font-light text-gray-400">•</span>
            <span className="text-lg font-light text-gray-400">1h</span>
            <Image
              src="/PNG/g-more.png"
              width={28}
              height={28}
              className="object-contain ml-auto"
              alt="more"
            />
          </div>
          <div className="flex flex-col gap-y-4 pr-8 pt-2">
            <Text content={body} />
            {post.type.includes("PHOTO") && <Photo />}
            {post.type.includes("VIDEO") && <Video />}
            {post.type.includes("PHOTOS") && <Slideshow images={images} />}
            <MediaBar
              views={views}
              comments={comments}
              highlights={highlights}
              setLike={setLike}
              like={like}
              likes={likes}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
