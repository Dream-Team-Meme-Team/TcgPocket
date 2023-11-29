import { useMemo } from 'react';
import { DeckListingDisplay } from './DeckListingDisplay';
import { useAsyncFn, useEffectOnce } from 'react-use';
import { useAppSelector } from '../../../store/configureStore';
import { shallowEqual } from 'react-redux';
import { DecksService } from '../../../services/DecksService';
import { responseWrapper } from '../../../services/helpers/responseWrapper';
import { GameGetDto } from '../../../types/games';
import { DeckDisplayDto } from '../../../types/decks';
import { filterDecks } from '../../../helpers/filterDecks';

export const DeckTab: React.FC = () => {
  const [games, selectedTab, searchTerm, selectedDeckId] = useAppSelector(
    (state) => [
      state.data.games,
      state.deck.selectedTab,
      state.deck.searchTerm,
      state.deck.selectedDeckId,
    ],
    shallowEqual
  );

  const gameId: number = useMemo(() => {
    const game: GameGetDto | undefined = games.find(
      (game) => game.name === selectedTab
    );

    return game?.id ?? 0;
  }, [games, selectedTab]);

  const [decks, fetchDecks] = useAsyncFn(async () => {
    const promise = await DecksService.getAllDecksByGameId(gameId);
    responseWrapper(promise);

    return promise.data;
  }, [gameId]);

  const filteredDecks: DeckDisplayDto[] = useMemo(() => {
    return filterDecks(searchTerm, decks?.value ?? []);
  }, [decks?.value, searchTerm]);

  const deleteSelectedDeck = async () => {
    const promise = await DecksService.deleteDeck(selectedDeckId);
    responseWrapper(promise, 'Deck deleted');

    if (!promise.hasErrors) fetchDecks();

    return promise.data;
  };

  useEffectOnce(() => {
    fetchDecks();
  });

  return (
    <div>
      <DeckListingDisplay
        data={filteredDecks}
        loading={decks?.loading}
        deleteFn={deleteSelectedDeck}
        label={selectedTab ?? ''}
        tableWidth="99%"
      />
    </div>
  );
};
