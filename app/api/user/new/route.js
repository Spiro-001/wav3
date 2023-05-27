import User from "@models/user";
import { hashPass } from "@utils/bcrypt/hash";
import { connectToDB } from "@utils/database/database";

export const POST = async (req, res) => {
  const { username, email, dateOfBirth, password } = await req.json();

  try {
    await connectToDB();
    const userExists = await User.findOne({
      email: email,
    });
    if (!userExists) {
      const passwordDigest = await hashPass(password);
      const newUser = await User.create({
        email: email,
        username: username,
        dateOfBirth: dateOfBirth,
        password_digest: passwordDigest,
      });
      return new Response(JSON.stringify(newUser), { status: 200 });
    } else {
      return new Response("User found with that email", { status: 409 });
    }
  } catch (error) {
    console.log(error);
    return new Response("Could not create your account", { status: 500 });
  }
};
