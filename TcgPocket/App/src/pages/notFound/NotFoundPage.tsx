import { createStyles, Title, Text, rem, Image, Center } from '@mantine/core';
import { routes } from '../../routes';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../components/buttons/PrimaryButton';
import { IconHome } from '@tabler/icons-react';
import { Illustration } from './Illustration';

export function NotFoundPage(): React.ReactElement {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <Center>
        <Image
          src="https://mystickermania.com/cdn/stickers/pokemon/pkm-togepi-sad-512x512.png"
          className={classes.headerImage}
          height={rem(400)}
          width={rem(400)}
        />
      </Center>
      <div className={classes.content}>
        <Illustration className={classes.image404} />
        <Title className={classes.title}>Page Not Found</Title>
        <Text
          color="black"
          size="lg"
          align="center"
          className={classes.description}
        >
          The page you are trying to reach does not exist. Please check the
          address. The page may have been moved to another URL.
        </Text>
        <Center>
          <PrimaryButton
            size="lg"
            variant="filled"
            leftIcon={<IconHome />}
            onClick={() => {
              navigate(routes.home);
            }}
          >
            Return to Home Page
          </PrimaryButton>
        </Center>
      </div>
    </div>
  );
}

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(225),
    paddingBottom: rem(80),
    position: 'inherit',
  },

  headerImage: {
    display: 'flex !important',
    justifyContent: 'center !important',
    position: 'absolute',
    zIndex: 1,
  },

  image404: {
    ...theme.fn.cover(),
    opacity: 0.3,
    margin: 'auto !important',
    position: 'absolute',
    paddingTop: rem(75),
    fill: 'true',
    zIndex: -1,
  },

  content: {
    paddingTop: rem(200),
    position: 'relative',
    zIndex: 0,

    [theme.fn.smallerThan('sm')]: {
      paddingTop: rem(120),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(50),
    zIndex: 1,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(32),
    },
  },

  description: {
    maxWidth: rem(540),
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    zIndex: 1,
  },
}));
