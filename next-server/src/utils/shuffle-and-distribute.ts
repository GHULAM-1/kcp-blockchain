import { cardType } from "@/types/card-type";
export function shuffleDeck(deck: cardType[]): cardType[] {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// Function to distribute cards into partitions
export function distributeCards(
  deck: cardType[],
  partitions: number 
): cardType[][] {
  // Shuffle the deck
  const shuffledDeck = shuffleDeck(deck);

  // Create an array of empty arrays for partitions
  const result: cardType[][] = Array.from({ length: partitions }, () => []);

  // Distribute the cards
  shuffledDeck.forEach((card, index) => {
    result[index % partitions].push(card);
  });

  return result;
}
// Example usage
// const partitions = 4;
// const distributedCards = distributeCards(deckOfCards, partitions);

// console.log(distributedCards);
