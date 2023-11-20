import type { NextAuthConfig, User as AuthUser } from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            picture?: string;
        } & Omit<AuthUser, 'id'>;
    }
}

const UNPROTECTED_ROUTES = ['/login', '/register'];

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    providers: [],
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            if (UNPROTECTED_ROUTES.includes(nextUrl.pathname)) {
                return true;
            }
            return !!auth?.user;
        },
    },
} satisfies NextAuthConfig;
