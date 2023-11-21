import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import prisma from '@/prisma';

import { authConfig } from './auth.config';
import verifyPassword from './lib/verifyPassword';

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string },
                });

                if (!user) {
                    return null;
                }
                const isValid = await verifyPassword(
                    credentials.password as string,
                    user.password
                );
                if (!isValid) {
                    return null;
                }

                return user;
            },
        }),
    ],
});
