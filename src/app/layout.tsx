import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ThemeProvider from '@/components/ThemeProvider';
import SignOut from '@/components/SignOut';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'MemoPalm',
    description: 'Generate flashcards',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ul className="flex gap-4">
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/signup">Signup</Link>
                        </li>
                        <li>
                            <Link href="/signin">Signin</Link>
                        </li>
                        <li>
                            <SignOut />
                        </li>
                    </ul>
                    <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                        {children}
                    </main>
                </ThemeProvider>
            </body>
        </html>
    );
}
