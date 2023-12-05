'use client';
import { useRouter } from 'next/navigation';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

export default function CreateQuiz() {
    const router = useRouter();
    function _onOpenChange(open: boolean) {
        if (!open) {
            router.back();
        }
    }

    return (
        <Dialog open={true} defaultOpen={true} onOpenChange={_onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a new quiz</DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
