import {
  ActionIcon,
  CSSObject,
  Flex,
  Image,
  MantineTheme,
  Menu,
  Navbar,
} from '@mantine/core';
import { IconLogin, IconRegistered, IconUser } from '@tabler/icons-react';
import React from 'react';
import { routes } from '../routes';
import { NavButton } from './NavButton';
import { LoginModal } from '../components/modals/LoginModal';
import { RegisterModal } from '../components/modals/RegisterModal';
import {
  ScaleSizeFactor,
  useScaledViewportSize,
} from '../hooks/use-scaled-viewport-size';
import { useDisclosure } from '@mantine/hooks';

const MIN_NAV_HEIGHT = 60 as const;
const MAX_NAV_HEIGHT = 120 as const;

export function PrimaryNavigation(): React.ReactElement {
  // const navigate = useNavigate();
  const scaledHeight = useNavbarHeight();

  const [loginState, login] = useDisclosure(false);
  const [registerState, register] = useDisclosure(false);

  // const onLogoutClick = () => {
  //   console.log('log out');
  // };

  return (
    <>
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
              <Menu.Item icon={<IconLogin size={14} />} onClick={login.open}>
                Login
              </Menu.Item>
              <Menu.Item
                icon={<IconRegistered size={14} />}
                onClick={register.open}
              >
                Register
              </Menu.Item>

              {/* when a user is logged in, these should be displayed */}

              {/* <Menu.Item
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
              </Menu.Item> */}
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </Navbar>

      <LoginModal openModal={loginState} setOpenModal={login.close} />
      <RegisterModal openModal={registerState} setOpenModal={register.close} />
    </>
  );
}

export function useNavbarHeight() {
  const navbarScaleFactor: ScaleSizeFactor = {
    scale: 0.075,
    min: MIN_NAV_HEIGHT,
    max: MAX_NAV_HEIGHT,
  };

  const { scaledHeight } = useScaledViewportSize(navbarScaleFactor);
  return scaledHeight;
}

function navbarSx(theme: MantineTheme): CSSObject {
  return {
    borderBottom: `1px solid ${theme.colors.blue[3]}`,
    boxShadow: `0px 0px 4px ${theme.colors.blue[5]}`,
    position: 'sticky',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0rem 2rem 0rem 1rem',
    overflow: 'hidden',
    background: '#ffffed',
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
