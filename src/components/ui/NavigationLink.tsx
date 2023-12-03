import Link, { LinkProps } from 'next/link';
import { PropsWithChildren } from 'react';

function NavigationLink({
    children,
    ...linkProps
}: PropsWithChildren<LinkProps>) {
    return (
        <li className="uppercase tracking-wide text-sm text-gray-400 hover:text-foreground transition-colors font-semibold">
            <Link {...linkProps}>{children}</Link>
        </li>
    );
}

export default NavigationLink;
