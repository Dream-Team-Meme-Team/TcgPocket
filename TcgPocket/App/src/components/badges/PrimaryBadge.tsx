import { Badge, BadgeProps, MantineTheme } from '@mantine/core';
import { HTMLAttributes } from 'react';

type PrimaryBadgeProps = BadgeProps & HTMLAttributes<HTMLDivElement>;

const badgeStyling = (theme: MantineTheme) => ({
    color: theme.colors.complimentaryColors[1],
    backgroundColor: theme.colors.blue[2],
});

export function PrimaryBadge({
    children,
    sx,
    ...props
}: PrimaryBadgeProps): React.ReactElement {
    return (
        <Badge sx={sx ?? badgeStyling} {...props}>
            {children}
        </Badge>
    );
}
