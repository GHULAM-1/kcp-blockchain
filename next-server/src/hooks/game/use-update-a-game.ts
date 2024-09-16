import { useState } from "react";
import axios from "axios";
import { roomType } from "@/types/room-type";

export const useUpdateGame = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const updateGame = async (id: string, gameData: Partial<roomType>) => {
    try {
      setLoading(true);
      const response = await axios.put<roomType>(`/games/${id}`, gameData);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err as Error);
      setLoading(false);
      throw err;
    }
  };

  return { updateGame, loading, error };
};
