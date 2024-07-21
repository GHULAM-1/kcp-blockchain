import { cardType } from "./card-type";
export type playerType = {
  name: string | null;
  email: string | null;
  mobileNumber: string;
  image: string | null;
  playerState: {
    turnNumber: 0;
    cards: cardType[];
  };
};
