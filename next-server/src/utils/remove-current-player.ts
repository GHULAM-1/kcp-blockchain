import { playerType } from "@/types/player-type";

export function removeCurrentUser(
  players: playerType[],
  currentUserEmail: string
): playerType[] {
  return players.filter((player) => player.email !== currentUserEmail);
}
