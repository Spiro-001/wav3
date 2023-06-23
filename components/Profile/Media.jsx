import Post from "@components/Media/Post";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import Footer from "./Footer";
import LoadingMedia from "./Loading/LoadingMedia";
import { getPostByUserId } from "@utils/fetch/get/post/getPostByUserId";
import { useDispatch } from "react-redux";
import { addPost, clearNull, post } from "@redux/features/postSlice";
import { useAppSelector } from "@redux/store";

const Media = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [spot, setSpot] = useState(0);
  const [loading, setLoading] = useState(true);
  const postState = useAppSelector((state) => state.postReducer.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    const getPost = async () => {
      const posts = await getPostByUserId(user, spot);
      dispatch(addPost(posts));
      setSpot((prev) => prev + process.env.LOAD_POST_AMOUNT);
      setLoading(false);
    };
    if (!postState && user) {
      getPost();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (postState) {
      setPosts(postState);
    }
  }, [postState]);

  return (
    <Container>
      {!postState && <LoadingMedia />}
      {!loading &&
        posts &&
        postState.map((post, idx) => {
          if (post) {
            let type = [];
            if (post.images.length > 1) type = [...type, "PHOTOS"];
            else if (post.images.length) type = [...type, "PHOTO"];
            if (post.video.length) type = [...type, "VIDEO"];
            return <Post post={{ ...post, type }} idx={idx} key={idx} />;
          }
        })}
      {posts.length === 0 && !loading && (
        <span className="flex flex-1 justify-center items-center text-lg text-gray-300 font-light">
          This user does not have any post yet.
        </span>
      )}
      <Footer />
    </Container>
  );
};

export default Media;
