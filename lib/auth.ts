import NextAuth, { NextAuthOptions, User as NextAuthUser, Account, Profile, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connect } from "./connect"
import User from "@/models/user"
import { JWT } from "next-auth/jwt";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({

            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and Password are required")
                }
                try {
                    await connect()
                    let user = await User.findOne({ email: credentials.email })
                    if (!user) {
                        throw new Error("No such user found with this email")
                    }
                    const valid = await bcrypt.compare(credentials.password, user.password);

                    if (!valid) {
                        throw new Error("Invalid password!")
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email
                    }

                } catch (error) {
                    console.error("Error while logging in ", error)
                    throw error
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
    ], callbacks: {
        async signIn({ user, account, profile }: { user: NextAuthUser; account: Account | null; profile?: Profile }) {
            await connect();
            console.log("Sign In callback called");

            if (!account) {
                console.log("Account is null");
                return false;
            }

            if (account.provider === "google") {
                try {
                    const existingUser = await User.findOne({ email: user.email });
                    console.log("existing user", existingUser)
                    if (!existingUser) {
                        const newUser = new User({ email: user.email, profileName:user.name,password:user.email });
                        await newUser.save();
                        console.log("New user created:", newUser);
                    }
                    return true;
                } catch (error) {
                    console.error("Error during sign-in:", error);
                    return false;
                }
            }

            return true;
        },

        async jwt({ token, user }: { token: JWT; user?: NextAuthUser }) {

            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            if (token) {
                session.user = {
                    id: token.id as string,         
                    name: token.name || null,
                    email: token.email || null,
                    image: token.picture || null    
                };
            }
            return session;
        },
    }, pages: {
        signIn: "/login",
        error: "/error"
    }, session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    }, secret: process.env.AUTH_SECRET
}