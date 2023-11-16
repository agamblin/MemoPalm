import React, { ComponentProps } from 'react';
import { Button } from './ui/button';
import { useFormStatus } from 'react-dom';

function FormButton({ children, ...delegated }: ComponentProps<typeof Button>) {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" {...delegated} aria-disabled={pending}>
            {children}
        </Button>
    );
}

export default React.memo(FormButton);
