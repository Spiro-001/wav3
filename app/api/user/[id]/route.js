import User from "@models/user";

// export const PATCH = async (req, { params }) => {
//   const { wav3 } = await req.json();
//   try {
//     await connectToDB();
//     const findOAuthUser = await OAuthUser.findById(params.id);
//     if (!findOAuthUser) return new Response("User not found", { status: 404 });
//     findOAuthUser.wav3 = wav3;
//     await findOAuthUser.save();
//     return new Response("Successfully updated the user", {
//       status: 200,
//     });
//   } catch (error) {
//     return new Response("Failed to update user", { status: 500 });
//   }
// };
