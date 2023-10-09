import {
  createStyles,
  rem,
  Image,
  Container,
  Title,
  List,
  Divider,
  Group,
} from '@mantine/core';
import { IconChevronsRight, IconHeart } from '@tabler/icons-react';

export function Home2() {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Group spacing={'xl'}>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title} p={5} align="center">
              About the Developers
            </Title>
            <Divider color="white" />
            <List p={20} icon={<IconHeart />}>
              <List.Item className={classes.names}>Zoe</List.Item>
              <List
                icon={<IconChevronsRight />}
                withPadding
                listStyleType="disc"
              >
                <List.Item>
                  Team Leader, Senior, Information Technology
                </List.Item>
              </List>
              <List.Item pt={10} className={classes.names}>
                Abby
              </List.Item>
              <List
                icon={<IconChevronsRight />}
                withPadding
                listStyleType="disc"
              >
                <List.Item>Senior, Computer Science</List.Item>
              </List>
              <List.Item pt={10} className={classes.names}>
                Brandon
              </List.Item>
              <List
                icon={<IconChevronsRight />}
                withPadding
                listStyleType="disc"
              >
                <List.Item>Senior, Computer Science</List.Item>
              </List>
              <List.Item pt={10} className={classes.names}>
                Deanna
              </List.Item>
              <List
                icon={<IconChevronsRight />}
                withPadding
                listStyleType="disc"
              >
                <List.Item>Senior, Computer Science</List.Item>
              </List>
              <List.Item pt={10} className={classes.names}>
                Gabe
              </List.Item>
              <List
                icon={<IconChevronsRight />}
                withPadding
                listStyleType="disc"
              >
                <List.Item>Senior, Information Technology</List.Item>
              </List>
            </List>
          </div>
        </div>
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
      </Group>
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
    margin: 'auto',
  },

  content: {
    maxWidth: '480rem',
    padding: '20px 20px',
    minHeight: rem(400),
    maxHeight: rem(500),
    borderRadius: '7px',
    backgroundColor: 'indigo',
    boxShadow: `7px 10px 20px 3px rgba(0,0,0,0.6)`,
  },

  title: {
    textShadow: `4px 4px 5px rgba(0,0,0,0.6)`,
  },

  names: {
    textShadow: `3px 3px 4px rgba(0,0,0,0.6)`,
  },

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
    borderRadius: '15px',
    boxShadow: `7px 10px 20px 3px rgba(0,0,0,0.6)`,
  },

  highlight: {
    position: 'relative',
    borderRadius: '5',
    padding: '4px 12px',
  },
}));
