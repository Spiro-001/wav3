import Post from "@models/post";
import { connectToDB } from "@utils/database/database";

export const POST = async (req, res) => {
  const {
    postOwnerId,
    doc,
    updatedAt,
    body,
    images,
    video,
    likes,
    comments,
    highlights,
  } = await req.json();
  console.log(
    postOwnerId,
    doc,
    updatedAt,
    body,
    images,
    video,
    likes,
    comments,
    highlights
  );
  try {
    await connectToDB();
    const newPost = await Post.create({
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
    return new Response(JSON.stringify(newPost), { status: 200 });
  } catch (error) {
    return new Response("Could not create your post", { status: 500 });
  }
};
