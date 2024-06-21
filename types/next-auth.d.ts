import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    role: string;
    id: string;
  }
  interface Session {
    user: {
      id: string;
      role: string;
      coins: number;
      points: number;
    } & DefaultSession["user"];
    id: string;
    role: string;
  }
}
