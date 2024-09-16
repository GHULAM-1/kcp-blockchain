import { playerType } from "@/types/player-type";

export function isCurrentUserAPlayer(
  players: playerType[],
  currentUserEmail: string
): boolean {
  for (let i = 0; i < players.length; i++) {
    if (players[i].email === currentUserEmail) {
      return true;
    }
  }
  return false;
}
