import {
    Badge,
    BadgeProps,
    MantineTheme,
    createPolymorphicComponent,
} from '@mantine/core';
import { forwardRef } from 'react';

const badgeStyling = (theme: MantineTheme) => ({
    color: theme.colors.complimentaryColors[1],
    backgroundColor: theme.colors.blue[2],
});

const _PrimaryBadge = forwardRef<HTMLDivElement, BadgeProps>(
    ({ ...props }, ref) => (
        <Badge component="div" ref={ref} {...props} sx={badgeStyling} />
    )
);

export const PrimaryBadge = createPolymorphicComponent<'div', BadgeProps>(
    _PrimaryBadge
);
