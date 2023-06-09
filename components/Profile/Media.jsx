import Post from "@components/Media/Post";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import Footer from "./Footer";
import { getPostByUserId } from "@utils/fetch/get/post/getPostByUserId";
import { Skeleton, ThemeProvider, createTheme } from "@mui/material";
import LoadingMedia from "./Loading/LoadingMedia";

const Media = ({ user }) => {
  const [posts, setPosts] = useState(null);
  const [spot, setSpot] = useState(0);

  useEffect(() => {
    const getPost = async () => {
      setPosts(await getPostByUserId(user, spot));
      setSpot((prev) => prev + process.env.LOAD_POST_AMOUNT);
    };
    if (user) {
      getPost();
    }
  }, []);

  return (
    <Container>
      {!posts && <LoadingMedia />}
      {posts &&
        posts.map((post, idx) => {
          post.type = [];
          if (post.images.length > 1) type = [...type, "PHOTOS"];
          else if (post.images.length) type = [...type, "PHOTO"];
          if (post.video.length) type = [...type, "VIDEO"];
          return <Post post={post} key={idx} />;
        })}
      <Footer />
    </Container>
  );
};

export default Media;
