// app/api/auth/[...nextauth]/route.ts
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin login",
      credentials: {
        email: { label: "E-post", type: "email" },
        password: { label: "Lösenord", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
          console.error("ADMIN_EMAIL or ADMIN_PASSWORD not set in env");
          return null;
        }

        const email = credentials.email?.toLowerCase().trim();
        const password = credentials.password;

        if (
          email === ADMIN_EMAIL.toLowerCase() &&
          password === ADMIN_PASSWORD
        ) {
          return {
            id: "admin",
            name: "Admin",
            email: ADMIN_EMAIL,
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.email) {
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.email) {
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
