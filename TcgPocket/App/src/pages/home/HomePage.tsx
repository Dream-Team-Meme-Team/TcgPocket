import { createStyles } from '@mantine/core';
import { HeroTitle } from './modules/HomePageHero';
import { FeaturesCards } from './modules/HomePageFeatures';
import { CardGetDto } from '../../types/cards';
import { PageDto } from '../../types/shared';
import { useAsync } from 'react-use';
import { apiRoutes } from '../../routes';
import { apiCall } from '../../services/api';

export function HomePage(): React.ReactElement {
  const { classes } = useStyles();

  useAsync(async () => {
    const params: PageDto = {
      pageSize: 10,
      currentPage: 1,
    };

    const response = await apiCall<CardGetDto>('GET', apiRoutes.cards, params);

    console.log('data: ', response.data);
  }, []);

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
