import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@models/user";
import { connectToDB } from "@utils/database/database";
import { isSamePassword } from "@utils/bcrypt/hash";
import OAuthUser from "@models/oauthuser";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials, req) {
        const { username, email, password_digest, password } = credentials;
        try {
          await connectToDB();
          const userExist = await User.findOne({
            $or: [{ username: username }, { email: email }],
          });
          if (!userExist)
            return new Response("User does not exist", { status: 404 });
          const passwordSame = await isSamePassword(
            password,
            userExist.password_digest
          );
          if (userExist && passwordSame) return userExist;
          else return new Response("Password does not match", { status: 401 });
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      await connectToDB();
      let sessionUser = await User.findOne({ email: session.user.email });
      if (!sessionUser) {
        sessionUser = await OAuthUser.findOne({ email: session.user.email });
        session.user.id = sessionUser._id;
        session.user.username = sessionUser.name;
        session.user.dateOfBirth = 0;
        session.user.provider = sessionUser.provider;
      } else {
        session.user.id = sessionUser._id.toString();
        session.user.username = sessionUser.username.toString();
        session.user.dateOfBirth = sessionUser.dateOfBirth.toString();
        session.user.provider = "credentials";
      }
      return session;
    },
    async signIn({ user, profile, account }) {
      switch (user.status) {
        case 404:
          return "/signin?error=404";
        case 401:
          return "/signin?error=401";
        default:
          break;
      }
      try {
        if (account.provider === "google") {
          await connectToDB();
          const userExists = await OAuthUser.findOne({
            email: user.email,
          });
          if (!userExists) {
            await OAuthUser.create({
              id: user.id,
              name: user.name,
              email: user.email,
              provider: account.provider,
            });
          }
          return true;
        } else if (user) return true;
        else return false;
      } catch (error) {
        console.log("Could not sign in", error);
        return error;
      }
    },
  },
  pages: {
    signIn: "/signin",
  },
});

export { handler as GET, handler as POST };
