import { useEffect, useMemo } from 'react';
import {
  DeckListingDisplay,
  DeckListingDisplayProps,
} from './DeckListingDisplay';
import { useAsyncFn } from 'react-use';
import { useAppSelector } from '../../../store/configureStore';
import { shallowEqual } from 'react-redux';
import { DecksService } from '../../../services/DecksService';
import { responseWrapper } from '../../../services/helpers/responseWrapper';
import { DeckDisplayDto } from '../../../types/decks';
import { GameGetDto } from '../../../types/games';

type DeckListData = Omit<DeckListingDisplayProps, 'deleteFn'>;

export const AllDecksTab: React.FC = () => {
  const [games, selectedTab, searchTerm, selectedDeckId] = useAppSelector(
    (state) => [
      state.data.games,
      state.deck.selectedTab,
      state.deck.searchTerm,
      state.deck.selectedDeckId,
    ],
    shallowEqual
  );

  const magicGame: GameGetDto = useMemo(() => {
    const game = games.find((game) => game.name === 'Magic');
    return game ?? { id: 1, name: 'Magic' };
  }, [games]);

  const yugiohGame: GameGetDto = useMemo(() => {
    const game = games.find((game) => game.name === 'Yu-Gi-Oh');
    return game ?? { id: 2, name: 'Yu-Gi-Oh' };
  }, [games]);

  const pokemonGame: GameGetDto = useMemo(() => {
    const game = games.find((game) => game.name === 'Pokémon');
    return game ?? { id: 3, name: 'Pokémon' };
  }, [games]);

  const [magicDecks, fetchMagicDecks] = useAsyncFn(async () => {
    const promise = await DecksService.getAllDecksByGameId(magicGame.id);
    responseWrapper(promise);

    return promise.data;
  }, [games, magicGame, selectedTab]);

  const [yugiohDecks, fetchYugiohDecks] = useAsyncFn(async () => {
    const promise = await DecksService.getAllDecksByGameId(yugiohGame.id);
    responseWrapper(promise);

    return promise.data;
  }, [games, yugiohGame, selectedTab]);

  const [pokemonDecks, fetchPokemonDecks] = useAsyncFn(async () => {
    const promise = await DecksService.getAllDecksByGameId(pokemonGame.id);
    responseWrapper(promise);

    return promise.data;
  }, [games, pokemonGame, selectedTab]);

  const filteredYugiohDecks: DeckDisplayDto[] = useMemo(() => {
    return (
      yugiohDecks?.value?.filter(
        (decks) =>
          decks.name.toLowerCase().includes(searchTerm) ||
          decks.cards.find((card) =>
            card.cardDisplay.name.toLowerCase().includes(searchTerm)
          )
      ) ?? []
    );
  }, [yugiohDecks, searchTerm]);

  const filteredMagicDecks: DeckDisplayDto[] = useMemo(() => {
    return (
      magicDecks?.value?.filter(
        (decks) =>
          decks.name.toLowerCase().includes(searchTerm) ||
          decks.cards.find((card) =>
            card.cardDisplay.name.toLowerCase().includes(searchTerm)
          )
      ) ?? []
    );
  }, [magicDecks, searchTerm]);

  const filteredPokemonDecks: DeckDisplayDto[] = useMemo(() => {
    return (
      pokemonDecks?.value?.filter(
        (decks) =>
          decks.name.toLowerCase().includes(searchTerm) ||
          decks.cards.find((card) =>
            card.cardDisplay.name.toLowerCase().includes(searchTerm)
          )
      ) ?? []
    );
  }, [pokemonDecks, searchTerm]);

  const deleteSelectedDeck = async () => {
    const promise = await DecksService.deleteDeck(selectedDeckId);
    responseWrapper(promise, 'Deck deleted');

    if (!promise.hasErrors) {
      fetchYugiohDecks();
      fetchMagicDecks();
      fetchPokemonDecks();
    }

    return promise.data;
  };

  const deckDisplayOrder: DeckListData[] = useMemo(() => {
    const magic: DeckListData = {
      data: filteredMagicDecks,
      loading: magicDecks?.loading,
      label: magicGame.name,
    };
    const yugioh: DeckListData = {
      data: filteredYugiohDecks,
      loading: yugiohDecks?.loading,
      label: yugiohGame.name,
    };
    const pokemon: DeckListData = {
      data: filteredPokemonDecks,
      loading: pokemonDecks?.loading,
      label: pokemonGame.name,
    };

    const deckData: DeckListData[] = [magic, yugioh, pokemon];

    deckData.sort(function (a, b) {
      return (b.data?.length ?? 99) - (a.data?.length ?? 99);
    });

    return deckData;
  }, [
    filteredMagicDecks,
    filteredPokemonDecks,
    filteredYugiohDecks,
    magicDecks?.loading,
    magicGame.name,
    pokemonDecks?.loading,
    pokemonGame.name,
    yugiohDecks?.loading,
    yugiohGame.name,
  ]);

  useEffect(() => {
    fetchYugiohDecks();
    fetchMagicDecks();
    fetchPokemonDecks();
  }, [fetchMagicDecks, fetchPokemonDecks, fetchYugiohDecks]);

  return (
    <div>
      {deckDisplayOrder.map((decks, index) => (
        <DeckListingDisplay
          data={decks.data}
          loading={decks.loading}
          label={decks.label}
          deleteFn={deleteSelectedDeck}
          tableWidth="99%"
          key={index}
        />
      ))}
    </div>
  );
};
