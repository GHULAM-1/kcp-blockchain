import { playerType } from "@/types/player-type";

export function findPlayerByEmail(
  email: string | undefined,
  players: playerType[]
): playerType | undefined {
  return players.find((player) => player.email === email);
}
