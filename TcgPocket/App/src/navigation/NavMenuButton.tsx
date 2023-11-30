import { CSSObject, Group, MantineTheme, UnstyledButton } from '@mantine/core';
import { forwardRef, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { routes } from '../routes/Index';
import { IconChevronDown } from '@tabler/icons-react';

export type NavMenuButtonProps = {
  children?: JSX.Element | string;
  itemRoutes: string[];
  icon?: React.ReactNode;
  sx?: (theme: MantineTheme) => CSSObject;
} & React.ComponentPropsWithoutRef<'button'>;

export const NavMenuButton = forwardRef<HTMLButtonElement, NavMenuButtonProps>(
  (
    { itemRoutes: routes, children, name, sx, ...props }: NavMenuButtonProps,
    ref
  ) => {
    const navMenuButtonSx = useNavMenuButtonSx(routes);

    return (
      <UnstyledButton sx={sx ?? navMenuButtonSx} ref={ref} {...props}>
        <Group spacing="xs">
          {name}
          {children}
          {<IconChevronDown size="1.25rem" />}
        </Group>
      </UnstyledButton>
    );
  }
);

function useNavMenuButtonSx(itemRoutes: string[]) {
  const { pathname } = useLocation();

  const isActivePath = useMemo(() => {
    const [pathSegment] = pathname.split('/[^/]*', 1);
    let isActiveRoute: boolean = false;

    itemRoutes.forEach((route) => {
      isActiveRoute =
        pathSegment === route && route !== routes.home ? true : isActiveRoute;
    });

    return isActiveRoute;
  }, [itemRoutes, pathname]);

  return (theme: MantineTheme): CSSObject => {
    return {
      padding: '10px 20px',
      borderRadius: '4px',
      transition: 'ease-in .2s',
      color: 'white',
      backgroundColor: `${
        isActivePath
          ? theme.colors.secondaryBlueColors[3]
          : theme.colors.secondaryBlueColors[1]
      }`,
      ':hover': {
        backgroundColor: theme.colors.secondaryBlueColors[2],
      },
    };
  };
}
