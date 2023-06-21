import Post from "@models/post";
import { connectToDB } from "@utils/database/database";

export const GET = async (req, { params }) => {
  const { searchParams } = new URL(req.url);
  const postLimit = parseInt(searchParams.get("amount"));
  const spot = parseInt(searchParams.get("spot"));

  try {
    await connectToDB();
    const clusterOfPost = await Post.find({ postOwnerId: params.userId })
      .populate("postOwnerId")
      .sort({
        doc: "desc",
      })
      .limit(postLimit) // AMOUNT OF POST TO RETRIEVE
      .skip(spot); // AMOUNT TO SKIP AFTER SORTED
    return new Response(JSON.stringify(clusterOfPost), { status: 200 });
  } catch (error) {}
};
