import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';

import { auth } from '@/auth';
import Navigation from '@/components/Navigation';

type LayoutProps = {
    quiz: React.ReactNode;
};

export default async function AuthedLayout({
    children,
    quiz,
}: PropsWithChildren<LayoutProps>) {
    const session = await auth();

    return (
        <SessionProvider session={session}>
            <Navigation signedIn={!!session} />
            <main>
                {quiz}
                {children}
            </main>
        </SessionProvider>
    );
}
