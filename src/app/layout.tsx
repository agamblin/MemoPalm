import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PropsWithChildren } from 'react';

import { Providers } from '@/components/Providers';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'MemoPalm',
    description: 'Generate flashcards',
};

async function RootLayout({ children }: PropsWithChildren<{}>) {
    return (
        <html lang="en">
            <body className={cn(inter.className, 'block min-h-screen')}>
                <Providers>
                    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        {children}
                    </div>
                    <Toaster />
                </Providers>
            </body>
        </html>
    );
}

export default RootLayout;
