import { createStyles } from '@mantine/core';
import { HeroTitle } from './modules/HomePageHero';
import { FeaturesCards } from './modules/HomePageFeatures';
import { useAuth } from '../../hooks/use-auth';

export function HomePage(): React.ReactElement {
  const { classes } = useStyles();
  const auth = useAuth();

  const user = auth.signedInUser;

  if (user !== null) {
    console.log('user: ', user);
  }

  return (
    <div className={classes.gradient}>
      <HeroTitle />
      <FeaturesCards />
    </div>
  );
}

const useStyles = createStyles((theme) => ({
  gradient: {
    background: theme.fn.linearGradient(
      180,
      theme.colors.complimentaryColors[3],
      theme.colors.complimentaryColors[3],
      theme.colors.complimentaryColors[3],
      theme.colors.complimentaryColors[3],
      theme.colors.primaryColor[0],
      theme.colors.primaryColor[0],
      theme.colors.primaryColor[0],
      theme.colors.primaryColor[0],
      theme.colors.primaryColor[0],
      theme.colors.primaryColor[0],
      theme.colors.primaryColor[0],
      theme.colors.primaryColor[0]
    ),
  },
}));
