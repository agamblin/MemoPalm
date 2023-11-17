import Link from 'next/link';

import SignOut from './SignOut';

type NavigationProps = {
    signedIn?: boolean;
};

function Navigation({ signedIn = false }: NavigationProps) {
    return (
        <nav>
            <ul className="flex gap-4 items-center">
                <li>
                    <Link href="/">Home</Link>
                </li>
                {signedIn ? (
                    <li>
                        <SignOut />
                    </li>
                ) : (
                    <>
                        <li>
                            <Link href="/register">Register</Link>
                        </li>
                        <li>
                            <Link href="/login">Login</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navigation;
