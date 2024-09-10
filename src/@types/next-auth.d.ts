import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    userId?: string;
  }

  interface User {
    accessToken?: string;
    userId?: string;
  }

  interface JWT {
    accessToken?: string;
    userId?: string;
  }
}
