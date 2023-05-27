import OAuthUser from "@models/oauthuser";
import { connectToDB } from "@utils/database/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const findOAuthUser = await OAuthUser.findById(params.id);
    return new Response(JSON.stringify(findOAuthUser), { status: 200 });
  } catch (error) {
    return new Response("Failed to retrieve all prompts", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { wav3 } = await req.json();
  try {
    await connectToDB();
    const findOAuthUser = await OAuthUser.findById(params.id);
    if (!findOAuthUser) return new Response("User not found", { status: 404 });
    findOAuthUser.wav3 = wav3;
    await findOAuthUser.save();
    return new Response("Successfully updated the user", {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to update user", { status: 500 });
  }
};
