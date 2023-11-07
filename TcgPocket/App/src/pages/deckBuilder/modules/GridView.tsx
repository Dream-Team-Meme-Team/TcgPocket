import { createStyles } from '@mantine/styles';
import { dispatch, useAppSelector } from '../../../store/configureStore';
import { CardDisplay } from '../../../components/cardDisplay/CardDisplay';
import { useEffectOnce } from 'react-use';
import { CardFilterDto } from '../../../types/cards';
import { getAllCards } from '../../../services/CardsService';
import { responseWrapper } from '../../../services/helpers/responseWrapper';
import { CardImageDisplay } from '../../../components/cardDisplay/modules/CardImageDisplay';
import { useNavbarHeight } from '../../../hooks/useNavbarHeight';

export function GridView(): React.ReactElement {
  const { classes } = useStyles();

  const [cards, loading] = useAppSelector((state) => [
    state.inventory.cards,
    state.inventory.loading,
  ]);

  const [pagination, selectedGame] = useAppSelector((state) => [
    state.deckBuilder.pagination,
    state.deckBuilder.selectedGame,
  ]);

  useEffectOnce(() => {
    const gameId = selectedGame ? [selectedGame.id] : undefined;

    const filtered: CardFilterDto = {
      gameIds: gameId,
      currentPage: pagination.currentPage,
      pageSize: pagination.pageSize,
    };

    dispatch(getAllCards(filtered)).then(({ payload }) => {
      responseWrapper(payload);
    });
  });

  return (
    <div className={classes.container}>
      {cards?.items.map((card, index) => (
        <CardImageDisplay key={index} imageUrl={card.imageUrl} />
      ))}
    </div>
  );
}

const useStyles = createStyles(() => {
  const { remainingHeight } = useNavbarHeight();

  return {
    container: {
      display: 'grid',

      //   height: remainingHeight,
      //   overflow: 'auto',
    },
  };
});
