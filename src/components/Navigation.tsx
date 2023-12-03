import Image from 'next/image';
import Link from 'next/link';

import NavigationLink from './ui/NavigationLink';

type NavigationProps = {
    signedIn?: boolean;
};

function Navigation({ signedIn = false }: NavigationProps) {
    return (
        <nav className="flex gap-8 align-baseline">
            <Link href="/">
                <Image
                    src="/memopalm.svg"
                    width={24}
                    height={24}
                    alt="MemoPalm Logo"
                    className="fill-foreground"
                />
            </Link>
            <ul className="flex gap-4 items-center">
                {signedIn ? (
                    <>
                        <NavigationLink href="/">Home</NavigationLink>
                        <NavigationLink href="/api/auth/signout">
                            Sign Out
                        </NavigationLink>
                    </>
                ) : (
                    <>
                        <NavigationLink href="/register">
                            Register
                        </NavigationLink>
                        <NavigationLink href="/login">Log In</NavigationLink>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navigation;
