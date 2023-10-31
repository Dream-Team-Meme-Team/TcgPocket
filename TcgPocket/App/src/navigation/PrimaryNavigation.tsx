import {
  ActionIcon,
  CSSObject,
  Flex,
  Image,
  MantineTheme,
  Menu,
  Navbar,
} from '@mantine/core';
import {
  IconLogin,
  IconLogout,
  IconRegistered,
  IconSettings,
  IconUser,
} from '@tabler/icons-react';
import React, { useMemo } from 'react';
import { NavButton } from './NavButton';
import { LoginModal } from '../components/modals/AuthModals/LoginModal';
import { RegisterModal } from '../components/modals/AuthModals/RegisterModal';
import { useDisclosure } from '@mantine/hooks';
import { useNavbarHeight } from '../hooks/useNavbarHeight';
import { useNavigate } from 'react-router-dom';
import { signOutUser } from '../services/AuthServices';
import { dispatch, useAppSelector } from '../store/ConfigureStore';
import { routes } from '../routes/Index';

export function PrimaryNavigation(): React.ReactElement {
  const navigate = useNavigate();
  const { navbarHeight } = useNavbarHeight();

  const signedInUser = useAppSelector((state) => state.user.user);

  const [loginState, login] = useDisclosure(false);
  const [registerState, register] = useDisclosure(false);

  const handleSignOut = () => {
    dispatch(signOutUser());
    navigate(routes.home);
  };

  const determineUserState = useMemo(() => {
    return signedInUser === undefined || signedInUser === null ? false : true;
  }, [signedInUser]);

  const isAdmin: boolean | undefined = useMemo(() => {
    if (!determineUserState || !signedInUser) {
      return false;
    }
    const isAdmin: number = signedInUser.roles.findIndex(
      (r) => r.name === 'Admin'
    );
    return isAdmin !== -1;
  }, [determineUserState, signedInUser?.roles]);

  return (
    <>
      <Navbar height={navbarHeight} sx={navbarSx}>
        <NavButton route={routes.home} sx={logoIconSx}>
          <Image maw={navbarHeight - 16} src="./TcgPocketLogo2.svg" />
        </NavButton>
        <Flex align={'center'} gap={25}>
          {determineUserState && (
            <Flex gap={10}>
              <NavButton route={routes.inventory}>Inventory</NavButton>
              <NavButton route={routes.cardUpload}>Upload Cards</NavButton>
              {/* <NavButton route={routes.deckBuilder}> Deck Builder</NavButton> */}
              {isAdmin && (
                <NavButton route={routes.adminPortal}> Admin Portal </NavButton>
              )}
            </Flex>
          )}

          <Menu>
            <Menu.Target>
              <ActionIcon size={40} aria-label="Account" sx={profileIconSx}>
                <IconUser size={30} />
              </ActionIcon>
            </Menu.Target>

            {!determineUserState && (
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
              </Menu.Dropdown>
            )}

            {determineUserState && (
              <Menu.Dropdown>
                <Menu.Item
                  icon={<IconSettings size={14} />}
                  onClick={() => navigate(routes.settings)}
                >
                  Settings
                </Menu.Item>
                <Menu.Item
                  icon={<IconLogout size={14} />}
                  onClick={handleSignOut}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            )}
          </Menu>
        </Flex>
      </Navbar>

      <LoginModal open={loginState} setOpen={login.close} />
      <RegisterModal open={registerState} setOpen={register.close} />
    </>
  );
}

function navbarSx(theme: MantineTheme): CSSObject {
  return {
    borderBottom: `1px solid ${theme.colors.primaryPurpleColor[0]}`,
    boxShadow: `0px 0px 4px #314652`,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0rem 2rem 0rem 1rem',
    background: theme.colors.primaryBlueColor[0],
  };
}

function profileIconSx(theme: MantineTheme): CSSObject {
  return {
    backgroundColor: theme.colors.secondaryPurpleColors[0],
    color: 'white',
    borderRadius: '5em',
    ':hover': {
      backgroundColor: theme.colors.primaryPurpleColor[0],
    },
  };
}

function logoIconSx(theme: MantineTheme): CSSObject {
  return {
    padding: '4px 4px',
    borderRadius: '15px',
    transition: 'ease-in .2s',
    ':hover': {
      backgroundColor: theme.colors.secondaryBlueColors[2],
    },
  };
}
