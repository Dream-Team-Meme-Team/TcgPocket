import {
  AspectRatio,
  createStyles,
  Container,
  Text,
  Group,
  rem,
  MantineTheme,
} from '@mantine/core';
import { IconClick, IconHandClick } from '@tabler/icons-react';
import { useState } from 'react';
import { PrimaryButton } from '../../../components/buttons/PrimaryButton';
import { LoginModal } from '../../../components/modals/AuthModals/LoginModal';
import { RegisterModal } from '../../../components/modals/AuthModals/RegisterModal';
import { useAppSelector } from '../../../store/configureStore';

export function HeroTitle() {
  const { classes } = useStyles();

  const [user, loading] = useAppSelector((state) => [
    state.user.user,
    state.user.isLoading,
  ]);

  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);

  const handleLogin = () => {
    setOpenLoginModal(true);
  };

  const handleRegister = () => {
    setOpenRegisterModal(true);
  };

  return (
    <>
      <div className={classes.wrapper}>
        <AspectRatio
          ratio={1 / 1}
          mt={50}
          maw={rem(2000)}
          miw={rem(50)}
          w={rem(625)}
          mx={40}
          className={classes.imageWrapper}
        >
          <img
            className={classes.image}
            src={
              'https://images.unsplash.com/photo-1627693685101-687bf0eb1222?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
            }
          />
        </AspectRatio>
        <Container className={classes.inner} color="blue">
          <h1 className={classes.title}>Welcome to </h1>
          <h1 className={classes.title}>
            <Text component="span" color="#B09AFF" inherit>
              TCG Pocket
            </Text>
          </h1>
          <Text className={classes.description} color="white">
            Presenting a trading card game inventory management system along
            with a deck builder. Just upload images of your MTG, Pokémon, and
            Yu-Gi-Oh! cards and allow our card scanner to add the cards to your
            inventory.{' '}
            {!loading && !user && 'Sign up or log in to begin! (*^▽^*)'}
          </Text>

          {!loading && !user && (
            <Group className={classes.controls}>
              <PrimaryButton
                size="xl"
                className={classes.control}
                variant="filled"
                leftIcon={<IconHandClick />}
                onClick={handleRegister}
              >
                Register
              </PrimaryButton>

              <PrimaryButton
                size="xl"
                className={classes.control}
                variant="filled"
                leftIcon={<IconClick />}
                onClick={handleLogin}
              >
                Log in
              </PrimaryButton>
            </Group>
          )}
        </Container>
      </div>
      <div className={classes.blackDivider} />

      <LoginModal open={openLoginModal} setOpen={setOpenLoginModal} />
      <RegisterModal open={openRegisterModal} setOpen={setOpenRegisterModal} />
    </>
  );
}

const useStyles = createStyles((theme: MantineTheme) => ({
  wrapper: {
    height: rem(700),
    display: 'flex',
    justifyContent: 'space-around',
    backgroundImage:
      'linear-gradient(to bottom, rgba(229, 216, 232,0.1) 0%,rgba(0, 0, 0,0.1) 100%), url(' +
      'https://images.unsplash.com/photo-1654198340681-a2e0fc449f1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' +
      ')',
    backgroundSize: 'cover',
    backgroundPositionY: 'center',
    backgroundRepeat: 'no-repeat',
    filter: 'contrast(110%)',
  },

  imageWrapper: {
    verticalAlign: 'middle !important',
    display: 'flex',
    alignItems: 'end',
    padding: 'auto',
    margin: 'auto',
  },

  image: {
    borderRadius: '9999999rem !important',
    boxShadow: `5px 10px 20px 1px #000`,
    filter: 'contrast(105%)',
  },

  inner: {
    position: 'relative',
    alignItems: 'center',
    paddingTop: rem(75),
    paddingBottom: rem(350),
    margin: 'inherit',

    [theme.fn.smallerThan('sm')]: {
      paddingBottom: rem(80),
      paddingTop: rem(80),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontSize: rem(72),
    fontWeight: 900,
    lineHeight: 1.1,
    textShadow: '7px 7px 10px rgba(0, 0, 0, .12)',
    margin: 0,
    padding: 0,
    color: theme.colors.white,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(42),
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: rem(34),
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(18),
    },
  },

  controls: {
    marginTop: `calc(${theme.spacing.xl} * 2)`,
    display: 'flex',
    justifyContent: 'center',

    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xl,
    },
  },

  control: {
    height: rem(54),
    paddingLeft: rem(38),
    paddingRight: rem(38),

    [theme.fn.smallerThan('sm')]: {
      height: rem(54),
      paddingLeft: rem(18),
      paddingRight: rem(18),
      flex: 1,
    },
  },

  blackDivider: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderColor: 'rgba(0, 0, 0, 0.5)',
    boxShadow: `0px 0px 70px 3.5rem ${'rgba(5, 5, 15, 1)'}`,
    height: '0.05px',
    position: 'relative',
  },
}));
