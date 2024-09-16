import { create } from "zustand";
import { roomType } from "@/types/room-type";
import { playerType } from "@/types/player-type";

type generalStoreTypes = {
  currentTurn: number;
  currentRoom: roomType;
  timeLeft: number;
  isDistributed: boolean;
  setTimeLeft: (newTimeLeft: number | ((prevTime: number) => number)) => void;
  setCurrentRoom: (newCurrentRoom: roomType) => void;
  rooms: roomType[];
  setRooms: (newRooms: roomType[]) => void;
  setCurrentTurn: (newTurn: number) => void;
  toggleIsDistributed: () => void;
  currentPlayer: playerType | null;
  setCurrentPlayer: (updatedPlayer: Partial<playerType>) => void;
  allPlayersArray: playerType[];
  setAllPlayersArray: (newPAllPlayersArray: playerType[]) => void;
};

export const useGeneralStore = create<generalStoreTypes>((set) => ({
  allPlayersArray: [],
  currentPlayer: null,
  currentRoom: {
    creationDate: new Date(),
    creatorImage: "jkj",
    creatorName: "dmsd",
    gameCode: "dms",
    gameStatus: "private",
    gameType: "bhabhi",
    maxPlayers: 2,
    players: [],
    roomCode: "212",
    roomCreatorEmail: "dds",
    roomCreatorId: "212",
    roomName: "dds",
    watchers: [],
    currentGlobalTurn: 0,
    isDistributed: false,
  },
  currentTurn: 0,
  timeLeft: 30, // Initial timer value
  isDistributed: false, // Initial state for isDistributed
  setTimeLeft: (newTimeLeft: number | ((prevTime: number) => number)) =>
    set((state) => ({
      timeLeft:
        typeof newTimeLeft === "function"
          ? newTimeLeft(state.timeLeft)
          : newTimeLeft,
    })),
  setCurrentTurn: (newTurn: number) => set(() => ({ currentTurn: newTurn })),
  setCurrentRoom: (newCurrentRoom: roomType) =>
    set(() => ({ currentRoom: newCurrentRoom })),
  rooms: [],
  setRooms: (newRooms: roomType[]) => set(() => ({ rooms: newRooms })),
  toggleIsDistributed: () =>
    set((state) => ({ isDistributed: !state.isDistributed })),

  setCurrentPlayer: (updatedPlayer: Partial<playerType>) =>
    set(() => ({ currentPlayer: updatedPlayer })),
  setAllPlayersArray: (newAllPlayerArray: playerType[]) =>
    set(() => ({ allPlayersArray: newAllPlayerArray })),
}));
