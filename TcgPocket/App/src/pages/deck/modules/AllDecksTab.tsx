import { useMemo } from 'react';
import { DeckListingDisplay } from './DeckListingDisplay';
import { useAppSelector } from '../../../store/configureStore';
import { shallowEqual } from 'react-redux';
import { DecksService } from '../../../services/DecksService';
import { responseWrapper } from '../../../services/helpers/responseWrapper';
import { DeckDisplayDto } from '../../../types/decks';
import { GameGetDto } from '../../../types/games';
import { filterDecks } from '../../../helpers/filterDecks';
import { DeckTabProps } from '../DeckPage';

type GameAndDecks = {
  game: GameGetDto;
  decks: DeckDisplayDto[];
};

export const AllDecksTab: React.FC<DeckTabProps> = ({ decks, loading }) => {
  const [games, searchTerm, selectedDeckId] = useAppSelector(
    (state) => [
      state.data.games,
      state.deck.searchTerm,
      state.deck.selectedDeckId,
    ],
    shallowEqual
  );

  const filteredDecks: DeckDisplayDto[] = useMemo(() => {
    return filterDecks(searchTerm, decks ?? []);
  }, [decks, searchTerm]);

  const organizedDecks = useMemo(() => {
    const tempDecks: GameAndDecks[] = [];

    games.forEach((game) => {
      tempDecks.push({ game: game, decks: [] });
    });

    filteredDecks.forEach((deck) => {
      tempDecks.find((x) => x.game.id === deck.gameId)?.decks.push(deck);
    });

    return tempDecks;
  }, [filteredDecks, games]);

  const deleteSelectedDeck = async () => {
    const promise = await DecksService.deleteDeck(selectedDeckId);
    responseWrapper(promise, 'Deck deleted');

    if (!promise.hasErrors) {
      // fetchDecks();
    }

    return promise.data;
  };

  const deckDisplayOrder: GameAndDecks[] = useMemo(() => {
    organizedDecks.sort(function (a, b) {
      return (b.decks.length ?? 99) - (a.decks.length ?? 99);
    });

    return organizedDecks;
  }, [organizedDecks]);

  return (
    <div>
      {deckDisplayOrder.map((gameAndDecks, index) => (
        <DeckListingDisplay
          data={gameAndDecks.decks}
          loading={loading}
          label={gameAndDecks.game.name}
          deleteFn={deleteSelectedDeck}
          tableWidth="99%"
          key={index}
        />
      ))}
    </div>
  );
};
