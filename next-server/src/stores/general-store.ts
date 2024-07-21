import { create } from "zustand";
import { roomType } from "@/types/room-type";

type generalStoreTypes = {
  rooms: roomType[];
  setRooms: (newRooms: roomType[]) => void;
};

export const useGeneralStore = create<generalStoreTypes>((set) => ({
  rooms: [],
  setRooms: (newRooms) => set(() => ({ rooms: newRooms })),
}));
