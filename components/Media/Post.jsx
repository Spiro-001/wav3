import Image from "next/image";
import React, { useEffect, useState } from "react";
import Photo from "./Photo";
import Slideshow from "./Slideshow";
import Text from "./Text";
import Video from "./Video";
import MediaBar from "@components/EffectBar/MediaBar";
import MoreOptions from "@components/Window/MoreOptions";
import { deletePostById } from "@utils/fetch/delete/post/deletePostById";
import { formatDateAgo } from "@utils/numbers/dateAgoFormat";

const Post = ({ post, idx }) => {
  const [like, setLike] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [highlights, setHighlights] = useState(0);
  const [views, setViews] = useState("Loading");
  const [body, setBody] = useState(post.body);
  const [images, setImages] = useState(post.images);
  const [video, setVideo] = useState(post.video);
  const [openMoreOptions, setOpenMoreOptions] = useState(false);

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

  const handleMoreOptions = () => {
    setOpenMoreOptions((prev) => !prev);
  };

  const handleDeletePost = (post) => {
    setOpenMoreOptions(false);
    return deletePostById(post._id);
  };

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
              <span className="font-light text-gray-400 lt">
                @{post.postOwnerId.username}
              </span>
            </div>
            <span className="font-light text-gray-400">•</span>
            <span className="text-lg font-light text-gray-400">
              {formatDateAgo(post.doc)}
            </span>
            <div className="ml-auto relative">
              <Image
                src="/PNG/g-more.png"
                width={28}
                height={28}
                className="object-contain cursor-pointer"
                alt="more"
                onClick={handleMoreOptions}
              />
              <MoreOptions
                options={[
                  {
                    name: "Delete Post",
                    function: () => handleDeletePost(post),
                    confirm: true,
                  },
                  { name: "Edit Post", function: () => {}, confirm: false },
                ]}
                open={setOpenMoreOptions}
                opened={openMoreOptions}
                idx={idx}
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-4 pr-8 pt-2">
            <Text content={post.body} />
            {post.type.includes("PHOTO") && <Photo images={post.images} />}
            {post.type.includes("VIDEO") && <Video />}
            {post.type.includes("PHOTOS") && <Slideshow images={post.images} />}
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
