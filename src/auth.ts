import NextAuth from 'next-auth';
import type { NextAuthConfig, User as AuthUser } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { connectToDatabase } from './lib/connectToDatabase';
import User from './models/User';
import { verifyPassword } from './lib/verifyPassword';

declare module 'next-auth' {
    interface Session {
        user: {
            picture?: string;
        } & Omit<AuthUser, 'id'>;
    }
}

export const authConfig = {
    debug: true,
    providers: [
        Credentials({
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                    placeholder: 'john@doe.com',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                },
            },
            async authorize(credentials) {
                await connectToDatabase();

                const user = await User.findOne({ email: credentials.email });

                if (!user) {
                    throw new Error('No user found');
                }
                const isValid = await verifyPassword(
                    credentials.password as string,
                    user.password
                );
                if (!isValid) {
                    throw new Error('Invalid password');
                }

                return { id: user.id, email: user.email };
            },
        }),
    ],
    callbacks: {
        authorized(params) {
            console.log('AUTHORIZED', params);
            return !!params.auth?.user;
        },
    },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
