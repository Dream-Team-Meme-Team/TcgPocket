import {
  ActionIcon,
  CSSObject,
  Flex,
  Image,
  MantineTheme,
  Menu,
  Navbar,
} from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { IconLogout, IconSettings, IconUser } from '@tabler/icons-react';
import React, { useMemo } from 'react';
import { routes } from '../../routes';
import { NavButton } from './NavButton';
import { useNavigate } from 'react-router-dom';

const MIN_HEIGHT = 60;
const MAX_HEIGHT = 120;

type PrimaryNavigationProps = {
  children?: JSX.Element;
};

export function PrimaryNavigation({
  children,
}: PrimaryNavigationProps): React.ReactElement {
  const navigate = useNavigate();
  const { height } = useViewportSize();

  const navbarHeight = useMemo(() => {
    const absoluteHeight = height * 0.075;

    if (absoluteHeight < MIN_HEIGHT) {
      return MIN_HEIGHT;
    }

    if (absoluteHeight > MAX_HEIGHT) {
      return MAX_HEIGHT;
    }

    return absoluteHeight;
  }, [height]);

  const onLogoutClick = () => {
    console.log('log out');
  };

  return (
    <div>
      <Navbar height={navbarHeight} sx={navbarSx}>
        <NavButton route={routes.home} sx={logoIconSx}>
          <Image maw={navbarHeight - 16} src="./TcgPocketLogo.svg" />
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
      {children}
    </div>
  );
}

function navbarSx(theme: MantineTheme): CSSObject {
  return {
    borderBottom: `2px solid ${theme.colors.blue[3]}`,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0rem 2rem 0rem 1rem',
    overflow: 'hidden',
    background: '#ffffed',
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