import Link from 'next/link'

function Home() {
    return (
        <div>
            <h1 className="text-foreground text-3xl tracking-wide text-center pt-24">
                MemoPalm
            </h1>
            <ul>
                <Link href="/signup">Signup</Link>
            </ul>
        </div>
    )
}

export default Home
