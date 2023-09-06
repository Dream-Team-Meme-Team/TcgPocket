import { createStyles } from '@mantine/core';
import { HeroTitle } from './HomePageHero';
import { FeaturesCards } from './HomePageFeatures';

const useStyles = createStyles((theme) => ({
  gradient: {
    background: theme.fn.linearGradient(
      180,
      '#fdf3d3',
      '#fdf3d3',
      '#fdf3d3',
      '#fdf3d3',
      '#aacae2',
      '#aacae2',
      '#aacae2',
      '#aacae2',
      '#aacae2',
      '#aacae2',
      '#aacae2',
      '#aacae2'
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
