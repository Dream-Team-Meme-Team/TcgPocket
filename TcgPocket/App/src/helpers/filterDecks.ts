/**
 * Takes in a search term string and deckDisplayDto array, then performs
 * filtering on deck name and card names within the deck. Returns the decks.
 */
import { DeckDisplayDto } from '../types/decks';

export function filterDecks(searchTerm: string, decks: DeckDisplayDto[]) {
  return decks.filter(
    (deck) =>
      deck.name.toLowerCase().includes(searchTerm) ||
      deck.cards.find((card) =>
        card.cardDisplay.name.toLowerCase().includes(searchTerm)
      )
  );
}
