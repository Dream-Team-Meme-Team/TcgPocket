import {
  ActionIcon,
  Button,
  CSSObject,
  Flex,
  Image,
  MantineTheme,
  Navbar,
  UnstyledButton,
} from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { router } from '../../constants/router';
import { routes } from '../../constants/routes';

type FooProps = {
  children?: JSX.Element;
};

export function Foo({ children }: FooProps): React.ReactElement {
  return (
    <div>
      <Navbar height={50} sx={navbarSx}>
        <div>
          <Image
            maw={25}
            src="https://www.pokemon.com/static-assets/app/static3/img/og-default-image.jpeg"
          />
        </div>
        <Flex align={'center'} gap={25}>
          <Flex gap={10}>
            <NavButton route={routes.inventory}>Inventory</NavButton>
            <NavButton route={routes.notFound}>Upload Cards</NavButton>
            <NavButton route={routes.notFound}> Deck Builder</NavButton>
          </Flex>

          <ActionIcon>
            <IconUser size={100} />
          </ActionIcon>
        </Flex>
      </Navbar>
      {children}
    </div>
  );
}

type NavButtonProps = {
  children: JSX.Element | string;
  route: string;
};

const NavButton: React.FC<NavButtonProps> = ({ route, children }) => {
  //   const navigate = useNavigate();

  const sx = (): CSSObject => {
    return {
      padding: '10px 20px',
    };
  };
  return (
    <UnstyledButton
      sx={sx}
      // onClick={() => navigate(route)}
    >
      <Navigate to={route} replace={true} />
      {children}
    </UnstyledButton>
  );
};

const navbarSx = (theme: MantineTheme): CSSObject => {
  return {
    borderBottom: `2px solid ${theme.colors.blue[3]}`,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0rem 2rem 0rem 1rem',
  };
};
