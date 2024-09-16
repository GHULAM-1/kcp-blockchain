import { cardType } from "./card-type";
export type playerType = {
  alias?: string;
  isAdmin?: boolean;
  isBlocked?: boolean;
  name?: string | null;
  email?: string | null;
  mobileNumber?: string;
  image?: string | null;
  gamesPlayed: {
    gameId?: string;
    isWon?: boolean;
    isDraw?: boolean;
    isNoResult?: boolean;
    startingDate?: Date;
  }[];
  playerState?: {
    turnNumber?: number;
    cards?: cardType[];
  };
};
