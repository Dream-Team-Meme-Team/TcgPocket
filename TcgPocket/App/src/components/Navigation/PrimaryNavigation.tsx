import {
  ActionIcon,
  Box,
  CSSObject,
  Center,
  Flex,
  Image,
  MantineTheme,
  Menu,
  Navbar,
} from '@mantine/core';
import { IconLogout, IconSettings, IconUser } from '@tabler/icons-react';
import React from 'react';
import { routes } from '../../routes';
import { NavButton } from './NavButton';
import { useNavigate } from 'react-router-dom';
import {
  ScaleSizeFactor,
  useScaledViewportSize,
} from '../../hooks/use-scaled-viewport-size';

const MIN_NAV_HEIGHT = 60 as const;
const MAX_HEIGHT = 120 as const;

type PrimaryNavigationProps = {
  children?: JSX.Element;
};

export function PrimaryNavigation({
  children,
}: PrimaryNavigationProps): React.ReactElement {
  const navigate = useNavigate();

  const navbarScaleFactor: ScaleSizeFactor = {
    scale: 0.075,
    min: MIN_NAV_HEIGHT,
    max: MAX_HEIGHT,
  };

  const { scaledHeight } = useScaledViewportSize(navbarScaleFactor);

  const onLogoutClick = () => {
    console.log('log out');
  };

  return (
    <Box sx={containerSx}>
      <Navbar height={scaledHeight} sx={navbarSx}>
        <NavButton route={routes.home} sx={logoIconSx}>
          <Image maw={scaledHeight - 16} src="./TcgPocketLogo.svg" />
        </NavButton>
        <Flex align={'center'} gap={25}>
          <Flex gap={10}>
            <NavButton route={routes.inventory}>Inventory</NavButton>
            <NavButton route={routes.cardUpload}>Upload Cards</NavButton>
            <NavButton route={routes.deckBuilder}> Deck Builder</NavButton>
          </Flex>

          <Menu>
            <Menu.Target>
              <ActionIcon size={40} sx={profileIconSx}>
                <IconUser size={30} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                icon={<IconSettings size={14} />}
                onClick={() => navigate(routes.settings)}
              >
                Settings
              </Menu.Item>
              <Menu.Item
                icon={<IconLogout size={14} />}
                onClick={onLogoutClick}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </Navbar>
      <Box sx={childContainerSx}>{children}</Box>
      <Center sx={footerSx}>(≖ᴗ≖✿)</Center>
    </Box>
  );
}

function navbarSx(theme: MantineTheme): CSSObject {
  return {
    borderBottom: `1px solid ${theme.colors.blue[3]}`,
    boxShadow: `0px 0px 4px ${theme.colors.blue[5]}`,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0rem 2rem 0rem 1rem',
    overflow: 'hidden',
    background: '#ffffed',
    position: 'sticky',
    top: 0,
  };
}

function profileIconSx(theme: MantineTheme): CSSObject {
  return {
    backgroundColor: `${theme.colors.blue[0]}`,
    borderRadius: '5em',
    overflow: 'hidden',
  };
}

function logoIconSx(theme: MantineTheme): CSSObject {
  return {
    padding: '4px 4px',
    borderRadius: '15px',
    transition: 'ease-in .2s',
    ':hover': {
      backgroundColor: theme.colors.blue[1],
    },
  };
}

function footerSx(): CSSObject {
  return {
    height: '7.5rem',
    background: '#ffffed',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
  };
}

function containerSx(): CSSObject {
  return {
    paddingBottom: '7.5rem',
  };
}

function childContainerSx(): CSSObject {
  return {
    zIndex: 1,
    position: 'relative',
    boxShadow: '0px 0px 10px black',
  };
}
