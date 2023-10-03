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
import { useDisclosure } from '@mantine/hooks';
import { useNavbarHeight } from '../hooks/use-navbar-height';

export function PrimaryNavigation(): React.ReactElement {
  // const navigate = useNavigate();
  const { navbarHeight } = useNavbarHeight();

  const [loginState, login] = useDisclosure(false);
  const [registerState, register] = useDisclosure(false);

  // const onLogoutClick = () => {
  //   console.log('log out');
  // };

  return (
    <>
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

function navbarSx(theme: MantineTheme): CSSObject {
  return {
    borderBottom: `1px solid '#314652'`,
    boxShadow: `0px 0px 4px #314652`,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0rem 2rem 0rem 1rem',
    background: '#13222B',
  };
}

function profileIconSx(theme: MantineTheme): CSSObject {
  return {
    backgroundColor: '#623990',
    color: 'white',
    borderRadius: '5em',
    ':hover': {
      backgroundColor: '#7d48b7',
    },
  };
}

function logoIconSx(theme: MantineTheme): CSSObject {
  return {
    padding: '4px 4px',
    borderRadius: '15px',
    transition: 'ease-in .2s',
    ':hover': {
      backgroundColor: '#314652',
    },
  };
}
