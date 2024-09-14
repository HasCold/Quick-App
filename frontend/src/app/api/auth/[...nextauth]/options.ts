import { LOGIN_URL } from "@/lib/apiEndPoints";
import axios from "axios";
import { Account, AuthOptions, ISODateString } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

export interface CustomSession {
    user?: CustomerUser;
    expires: ISODateString
}

export interface CustomerUser{
    id?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    provider?: string | null;
    token?: string | null;
}

export const authOptions: AuthOptions = {
    pages: {
        signIn: "/"
    },
    callbacks: {
     async signIn({ user, account }: {user: CustomerUser, account: Account | null}) {
        try {
          console.log("The user data is :- ", user);
          console.log("The account data is :- ", account);
         
          const payload = {
            email: user.email,
            name: user.name,
            oauth_id: account?.providerAccountId,
            provider: account?.provider,
            image: user?.image
          }

          const {data} = await axios.post(LOGIN_URL, payload)
          user.id = data?.user?.id.toString()
          user.token = data?.user?.token
          user.provider = data?.user?.provider

          return true

        } catch (error) {
          return false
        }
        
    },
      async session({ session, user, token }: {session: CustomSession, user: CustomerUser, token: JWT}) {
      session.user = token.user as CustomerUser
      return session;
    },
      async jwt({ token, user}) {
      if(user){
        token.user = user
      }
      return token;
    }
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_SECRET_KEY as string,
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
            }
        })
    ]
}