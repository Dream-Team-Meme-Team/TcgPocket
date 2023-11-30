import { useMemo } from 'react';
import { DeckListingDisplay } from './DeckListingDisplay';
import { useAppSelector } from '../../../store/configureStore';
import { shallowEqual } from 'react-redux';
import { DecksService } from '../../../services/DecksService';
import { responseWrapper } from '../../../services/helpers/responseWrapper';
import { GameGetDto } from '../../../types/games';
import { DeckDisplayDto } from '../../../types/decks';
import { filterDecks } from '../../../helpers/filterDecks';
import { DeckTabProps } from '../DeckPage';
import eventBus from '../../../helpers/eventBus';

export const DeckTab: React.FC<DeckTabProps> = ({ decks, loading }) => {
  const [games, selectedTab, searchTerm, selectedDeckId] = useAppSelector(
    (state) => [
      state.data.games,
      state.deck.selectedTab,
      state.deck.searchTerm,
      state.deck.selectedDeckId,
    ],
    shallowEqual
  );

  const game: GameGetDto = useMemo(() => {
    const game: GameGetDto = games.find(
      (game) => game.name === selectedTab
    ) ?? { id: 0, name: '' };

    return game;
  }, [games, selectedTab]);

  const gameDeck = useMemo(() => {
    return decks.filter((deck) => deck.gameId === game.id);
  }, [decks, game.id]);

  const filteredDecks: DeckDisplayDto[] = useMemo(() => {
    return filterDecks(searchTerm, gameDeck ?? []);
  }, [gameDeck, searchTerm]);

  const deleteSelectedDeck = async () => {
    const promise = await DecksService.deleteDeck(selectedDeckId);
    responseWrapper(promise, 'Deck deleted');

    if (!promise.hasErrors) eventBus.publish('fetchDecks', promise);

    return promise.data;
  };

  return (
    <div>
      <DeckListingDisplay
        data={filteredDecks}
        loading={loading}
        deleteFn={deleteSelectedDeck}
        label={selectedTab ?? ''}
        tableWidth="99%"
      />
    </div>
  );
};
