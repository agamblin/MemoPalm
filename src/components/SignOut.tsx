import { auth, signOut } from '@/auth';
import { Button } from './ui/button';

async function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
    const session = await auth();

    if (!session) return null;
    return (
        <form
            action={async () => {
                'use server';
                await signOut();
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
