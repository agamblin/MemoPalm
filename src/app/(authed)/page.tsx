import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';

function Home() {
    return (
        <section className="mt-12">
            <div className="mx-auto w-fit flex flex-col gap-4 justify-center items-center">
                <p>No current quiz</p>
                <Link
                    href="/create"
                    className={buttonVariants({ variant: 'default' })}
                >
                    Create one
                </Link>
            </div>
        </section>
    );
}

export default Home;
