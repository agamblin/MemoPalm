import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { authConfig } from './auth.config';
import { connectToDatabase } from './lib/connectToDatabase';
import { verifyPassword } from './lib/verifyPassword';
import User from './models/User';

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                await connectToDatabase();

                const user = await User.findOne({ email: credentials.email });

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
