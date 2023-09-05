import { createStyles } from '@mantine/core';
import { HeroTitle } from './HomePageHero';
import { FeaturesCards } from './HomePageFeatures';

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

export function HomePage(): React.ReactElement {
  const { classes } = useStyles();

  return (
    <div className={classes.gradient}>
      <HeroTitle />
      <FeaturesCards />
    </div>
  );
}
