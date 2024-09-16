import { useState } from "react";
import axios from "axios";
import { playerType } from "@/types/player-type";

export const useUpdatePlayer = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const updatePlayer = async (
    email: string,
    playerData: Partial<playerType>
  ) => {
    try {
      setLoading(true);
      const response = await axios.put<playerType>(
        `http://localhost:3001/players/${email}`,
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

  return { updatePlayer, loading, error };
};
