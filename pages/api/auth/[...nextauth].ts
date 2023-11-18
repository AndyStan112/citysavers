import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
 import prisma from "../../../lib/prismadb";
 import { User } from "next-auth";
 import { AdapterUser } from "next-auth/adapters";
import Google from "next-auth/providers/google";
const handleLink = async (user : User | AdapterUser, profile : User | AdapterUser, prop:"image"|"name"|"role") => {
  if (!user[prop] && profile[prop]) {
    await prisma.user.update({
      where: { id: user.id },
      data: { [`${prop}`]: profile[prop] },
    });
  }
};

export default NextAuth({
   session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  callbacks: {
        async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user.role = token.role as string;
      return session;
    },
    redirect({ url }) {
      return url;
    },
  },
  events: {
    async linkAccount({ user, profile }) {
      await handleLink(user, profile, "image");
      await handleLink(user, profile, "name");
      await handleLink(user, profile, "role");
    },
  },
  providers: [

    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    GoogleProvider({  
      profile(profile) {
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          image: profile.picture,
          role: profile.role ? profile.role : "user",
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      clientId: process.env.GITHUB_CLIENT_ID!,
    }),
  ],
});
