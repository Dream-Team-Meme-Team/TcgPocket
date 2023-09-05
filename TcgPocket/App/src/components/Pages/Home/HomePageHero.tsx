import {
  createStyles,
  Container,
  Text,
  Button,
  Group,
  rem,
} from '@mantine/core';
import { IconClick, IconHandClick } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
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

  return (
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
          </Text>{' '}
        </h1>

        <Text className={classes.description} color="dimmed">
          Presenting a trading card game inventory management system along with
          a deck builder. Just upload images of your MTG, Yu-Gi-Oh!, and Pokémon
          cards and allow our card scanner to add the cards to your inventory.
          Sign up or log in to begin! (*^▽^*)
        </Text>

        <Group className={classes.controls}>
          <Button
            size="xl"
            className={classes.control}
            variant="filled"
            leftIcon={<IconHandClick />}
          >
            Sign Up
          </Button>

          <Button
            size="xl"
            className={classes.control}
            variant="filled"
            leftIcon={<IconClick />}
          >
            Log in
          </Button>
        </Group>
      </Container>
    </div>
  );
}
