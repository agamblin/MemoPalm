import { auth } from '@/auth';

async function Home() {
    const session = await auth();

    return (
        <div>
            <h1 className="text-foreground text-3xl tracking-wide text-center pt-24">
                MemoPalm
            </h1>
        </div>
    );
}

export default Home;
