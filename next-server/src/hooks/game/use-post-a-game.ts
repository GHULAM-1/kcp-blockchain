import { useState } from "react";
import axios from "axios";
import { roomType } from "@/types/room-type";

export const usePostGame = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const postGame = async (gameData: Omit<roomType, "_id">) => {
    try {
      setLoading(true);
      const response = await axios.post<roomType>("/games", gameData);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err as Error);
      setLoading(false);
      throw err;
    }
  };

  return { postGame, loading, error };
};
