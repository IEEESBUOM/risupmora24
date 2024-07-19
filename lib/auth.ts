


import { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import { JWT } from "next-auth/jwt";
import prisma from "./prisma";
import { compare } from "bcrypt";



export async function comparePassword(password: string, hashPassword: string) {
  const isValid = await compare(password, hashPassword);
  
  return isValid;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "your@email.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials: any) => {
        if (!credentials) {
          return null;
        }

        const user = await prisma.user.findUnique({
            where:{
                email:credentials.email
            }
        })
        

        if (!user) {
          return null;
        }

        return user;
      },
    }),


 
  ],
  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user: any;
      account: any;
    }): Promise<boolean> {
    
      return true;
    },

    
    async session(params: { session: any; token: JWT; user: any }) {
      

      params.session.user.email = params.token.email;
      params.session.user.name = params.token.name;
      return params.session;
    },


    async jwt(params: {
      token: any;
      user: any;
      session?: any;
      // account?: any | null | undefined;
      // profile?: any | undefined;
      // isNewUser?: boolean | undefined;
    }) {
      if (params.user) {
        params.token.id = params.user._id;
        params.token.name = params.user.name;

        // Handle user-related logic here
      } else {
        // Handle the case when the user is undefined
      }
      return params.token;
    },
  },

  pages: {
    signIn: "/auth/login",
    signOut: "/auth/signout",
  },
  session: {
    strategy: "jwt",
  },
};
