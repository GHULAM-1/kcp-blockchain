import { playerType } from "./player-type";
import { gamesNamesType } from "./games-names-type";
import { watcherType } from "./watcher-type";
export type roomType = {
  roomCode: string;
  players: playerType[];
  maxPlayers: number;
  roomCreatorId: string;
  roomName: string;
  creationDate: Date;
  roomCreatorEmail: string;
  gameType: gamesNamesType;
  creatorName: string;
  gameStatus: "public" | "private";
  watchers: watcherType[];
};
