import {
  createStyles,
  Container,
  Text,
  Group,
  rem,
  MantineTheme,
} from '@mantine/core';
import { IconClick, IconHandClick } from '@tabler/icons-react';
import { useState } from 'react';
import { LoginModal } from '../../loginOrRegisterModals/LoginModal';
import { RegisterModal } from '../../loginOrRegisterModals/RegisterModal';
import { PrimaryButton } from '../../mantineComponentsStyling/PrimaryButton';

const useStyles = createStyles((theme: MantineTheme) => ({
  wrapper: {
    position: 'relative',
    boxSizing: 'border-box',
    background: 'transparent',
  },

  inner: {
    position: 'relative',
    alignItems: 'space-between',
    paddingTop: rem(50),
    paddingBottom: rem(50),

    [theme.fn.smallerThan('sm')]: {
      paddingBottom: rem(80),
      paddingTop: rem(80),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(62),
    fontWeight: 900,
    lineHeight: 1.1,
    textShadow: '7px 7px 10px rgba(0, 0, 0, .12)',
    margin: 0,
    padding: 0,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(42),
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: rem(24),

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(18),
    },
  },

  controls: {
    marginTop: `calc(${theme.spacing.xl} * 2)`,

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
}));

export function HeroTitle() {
  const { classes } = useStyles();

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
        <Container size={800} className={classes.inner} color="blue">
          <h1 className={classes.title}>Welcome to </h1>
          <h1 className={classes.title}>
            <Text
              component="span"
              variant="gradient"
              gradient={{ from: 'blue', to: '#aacae2' }}
              inherit
            >
              TCG Pocket
            </Text>
          </h1>

          <Text className={classes.description} color="dimmed">
            Presenting a trading card game inventory management system along
            with a deck builder. Just upload images of your MTG, Pokémon, and
            Yu-Gi-Oh! cards and allow our card scanner to add the cards to your
            inventory. Sign up or log in to begin! (*^▽^*)
          </Text>

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
        </Container>
      </div>

      <LoginModal openModal={openLoginModal} setOpenModal={setOpenLoginModal} />
      <RegisterModal
        openModal={openRegisterModal}
        setOpenModal={setOpenRegisterModal}
      />
    </>
  );
}
