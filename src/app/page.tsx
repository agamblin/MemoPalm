import { auth } from '@/auth';
import Link from 'next/link';

async function Home() {
    const session = await auth();

    console.log('session:', session);
    return (
        <div>
            <h1 className="text-foreground text-3xl tracking-wide text-center pt-24">
                MemoPalm
            </h1>
        </div>
    );
}

export default Home;
