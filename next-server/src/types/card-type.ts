export type cardType = {
  cardName: string;
  cardNumber: number;
  cardColor: "red" | "black";
  cardType: "hearts" | "diamonds" | "clubs" | "spades";
  cardStrength: number;
  cardImage: string;
  isFaceCard: boolean;
};
