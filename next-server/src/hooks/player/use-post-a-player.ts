import { useState } from "react";
import axios from "axios";
import { playerType } from "@/types/player-type";

export const usePostPlayer = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const postPlayer = async (playerData: Omit<playerType, "email">) => {
    try {
      setLoading(true);
      const response = await axios.post<playerType>(
        "http://localhost:3001/players",
        playerData
      );
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err as Error);
      setLoading(false);
      throw err;
    }
  };

  return { postPlayer, loading, error };
};
