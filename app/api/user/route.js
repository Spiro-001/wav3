import User from "@models/user";
import { connectToDB } from "@utils/database/database";

export const POST = async (req) => {
  const { username, email } = await req.json();
  try {
    await connectToDB();
    const findUser = await User.findOne(
      username ? { username: username } : { email: email }
    );
    return new Response(JSON.stringify(findUser), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to find user.", { status: 404 });
  }
};
