'use client';

import type { Session } from 'next-auth';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

type ProvidersProps = {
    session: SessionProviderProps['session'];
};

export const Providers = ({
    children,
    session,
}: React.PropsWithChildren<ProvidersProps>) => {
    return (
        <SessionProvider session={session}>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </SessionProvider>
    );
};
