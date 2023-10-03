import {
  createStyles,
  rem,
  Image,
  Text,
  Container,
  Title,
  List,
  ThemeIcon,
  Group,
  Button,
} from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

export function Home2() {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Container size="md">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              A <span className={classes.highlight}>modern</span> React <br />{' '}
              components library
            </Title>
            <Text>
              Build fully functional accessible web applications faster than
              ever – Mantine includes more than 120 customizable components and
              hooks to cover you in any situation
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <IconCheck
                    style={{ width: rem(12), height: rem(12) }}
                    stroke={1.5}
                  />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>TypeScript based</b> – build type safe applications, all
                components and hooks export types
              </List.Item>
              <List.Item>
                <b>Free and open source</b> – all packages have MIT license, you
                can use Mantine in any project
              </List.Item>
              <List.Item>
                <b>No annoying focus ring</b> – focus ring will appear only when
                user navigates with keyboard
              </List.Item>
            </List>

            <Group mt={30}>
              <Button radius="xl" size="md" className={classes.control}>
                Get started
              </Button>
              <Button
                variant="default"
                radius="xl"
                size="md"
                className={classes.control}
              >
                Source code
              </Button>
            </Group>
          </div>
        </div>
      </Container>
      <Container
        maw={rem(2000)}
        miw={rem(50)}
        w={rem(750)}
        mx={40}
        className={classes.imageWrapper}
      >
        <Image
          src="https://images.unsplash.com/photo-1677545215960-071e5290f9db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80"
          className={classes.image}
          radius={15}
        />
      </Container>
    </div>
  );
}

const useStyles = createStyles(() => ({
  wrapper: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-around',
    boxSizing: 'border-box',
    minHeight: rem(550),
    paddingTop: rem(100),
    paddingBottom: rem(100),
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  content: {
    maxWidth: '480rem',
    backgroundColor: 'indigo',
  },

  title: {},

  control: {},

  imageWrapper: {
    verticalAlign: 'middle !important',
    display: 'flex',
    alignItems: 'center',
    padding: 'auto',
    margin: 'auto',
  },

  image: {
    width: 'rem(376px)',
    height: 'rem(356px)',
  },

  highlight: {
    position: 'relative',
    borderRadius: '5',
    padding: '4px 12px',
  },
}));
