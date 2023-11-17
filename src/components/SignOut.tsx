import { signOut } from '@/auth';

import { Button } from './ui/button';

function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
    return (
        <form
            action={async () => {
                'use server';
                await signOut({ redirectTo: '/login' });
            }}
            className="w-full"
        >
            <Button variant="ghost" className="w-full p-0" {...props}>
                Sign Out
            </Button>
        </form>
    );
}

export default SignOut;
