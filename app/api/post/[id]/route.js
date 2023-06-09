import Post from "@models/post";
import { connectToDB } from "@utils/database/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const foundPost = await Post.findById(params.id);
    if (foundPost)
      return new Response(JSON.stringify(foundPost), { status: 200 });
    else return new Response("Post does not exist", { status: 404 });
  } catch (error) {
    console.log(error);
    return new Response("Cannot find post", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    const postToDelete = await Post.findByIdAndDelete(params.id);
    if (postToDelete)
      return new Response(JSON.stringify(postToDelete), { status: 200 });
    return new Response(
      "Post could either not be found or could not be deleted",
      { status: 409 }
    );
  } catch (error) {
    console.log(error);
    return new Response("Post could not be deleted", { status: 409 });
  }
};
