import { useEffect, useMemo } from 'react';
import { DeckListingDisplay } from './DeckListingDisplay';
import { useAsyncFn } from 'react-use';
import { useAppSelector } from '../../../store/configureStore';
import { shallowEqual } from 'react-redux';
import { DecksService } from '../../../services/DecksService';
import { responseWrapper } from '../../../services/helpers/responseWrapper';
import { GameGetDto } from '../../../types/games';
import { DeckDetailDto } from '../../../types/decks';

export const DeckTab: React.FC = () => {
  const [games, selectedTab, searchTerm, selectedId] = useAppSelector(
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
  }, [games, selectedTab]);

  const filteredDecks: DeckDetailDto[] = useMemo(() => {
    return (
      decks?.value?.filter((decks) =>
        decks.name.toLowerCase().includes(searchTerm)
      ) ?? []
    );
  }, [decks?.value, searchTerm]);

  const deleteSelectedDeck = async () => {
    const promise = await DecksService.deleteDeck(selectedId);
    responseWrapper(promise, 'Deck deleted');

    if (!promise.hasErrors) fetchDecks();

    return promise.data;
  };

  useEffect(() => {
    fetchDecks();
  }, [selectedTab]);

  return (
    <div>
      <DeckListingDisplay
        data={filteredDecks}
        loading={decks?.loading}
        deleteFn={deleteSelectedDeck}
        label={selectedTab ?? ''}
        tableWidth="97%"
      />
    </div>
  );
};
