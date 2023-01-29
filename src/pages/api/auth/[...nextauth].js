import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async jwt(token, user) {
      if (user?.id) {
        token.userId = user.id
      }
      return token
    },
    async session(session, token) {
      if (token?.userId) {
        session.user.id = token.userId
      }
      return session
    },
  },
  adapter: MongoDBAdapter(clientPromise),
  debug: false,
}

export default NextAuth(authOptions)
