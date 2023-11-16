'use client';
import { SessionProvider as BaseSessionProvider } from 'next-auth/react';

function SessionProvider(
    props: React.ComponentProps<typeof BaseSessionProvider>
) {
    return <BaseSessionProvider {...props} />;
}

export default SessionProvider;
