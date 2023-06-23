import Post from "@models/post";
import { connectToDB } from "@utils/database/database";

export const POST = async (req, res) => {
  const {
    postOwnerId,
    doc,
    updatedAt,
    body,
    images = [],
    video = [],
    likes = [],
    comments = [],
    highlights = [],
  } = await req.json();
  try {
    await connectToDB();
    if ([images, video, likes, comments, highlights].includes(null))
      throw new Error("Null value found, null is not allowed.");
    let newPost = await Post.create({
      postOwnerId,
      doc,
      updatedAt,
      body,
      images,
      video,
      likes,
      comments,
      highlights,
    });
    newPost = await newPost.populate("postOwnerId");
    newPost.postOwnerId.password_digest = "SECRET";
    return new Response(JSON.stringify(newPost), { status: 200 });
  } catch (error) {
    return new Response("Could not create your post", { status: 500 });
  }
};
