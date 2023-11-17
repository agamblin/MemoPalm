import React, { ComponentProps } from 'react';
import { useFormStatus } from 'react-dom';

import { Button } from './ui/button';

function FormButton({ children, ...delegated }: ComponentProps<typeof Button>) {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" {...delegated} aria-disabled={pending}>
            {children}
        </Button>
    );
}

export default React.memo(FormButton);
