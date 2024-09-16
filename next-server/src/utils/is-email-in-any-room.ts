import { playerType } from "@/types/player-type";
import { roomType } from "@/types/room-type";
export default function isEmailInAnyRoom(
  rooms: roomType[],
  email: string | undefined
): boolean {
    console.log( email);

  return rooms.some((room) =>
    room.players.some((player: playerType) => player.email === email)
  );
}
