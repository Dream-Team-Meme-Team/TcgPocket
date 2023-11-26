import { Badge, BadgeProps, MantineTheme } from '@mantine/core';
import { HTMLAttributes } from 'react';

type PrimaryBadgeProps = BadgeProps & HTMLAttributes<HTMLDivElement>;

const badgeStyling = (theme: MantineTheme) => ({
  color: theme.colors.primaryBlueColor[0],
  backgroundColor: theme.colors.primaryPurpleColor[0],

  ':hover': {
    cursor: 'pointer',
  },
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
