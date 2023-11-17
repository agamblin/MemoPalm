import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { auth } from '@/auth';
import Navigation from '@/components/Navigation';
import { Providers } from '@/components/Providers';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'MemoPalm',
    description: 'Generate flashcards',
};

async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();

    return (
        <html lang="en">
            <body
                className={cn(
                    inter.className,
                    'max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8'
                )}
            >
                <Providers session={session}>
                    <Navigation signedIn={!!session} />
                    <main>{children}</main>
                    <Toaster />
                </Providers>
            </body>
        </html>
    );
}

export default RootLayout;
