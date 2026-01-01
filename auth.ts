import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) {
          throw new Error("Missing email or password");
        }

        // Mock Auth for UI Testing
        // const user = await prisma.user.findUnique({
        //   where: { email },
        // });
        
        // Mock User
        if (email === "admin@edschool.pk" && password === "admin123") {
           return {
             id: "1",
             name: "Test Admin",
             email: email,
             role: "ADMIN",
           };
        }

        return null; 

        // if (!user) {
        //   throw new Error("Invalid email or password");
        // }

        // const isPasswordValid = await compare(password, user.password);

        // if (!isPasswordValid) {
        //   throw new Error("Invalid email or password");
        // }

        // return {
        //   id: user.id,
        //   name: user.name,
        //   email: user.email,
        //   role: user.role,
        // };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
});
