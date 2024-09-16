import { useState } from "react";
import axios from "axios";

export const useDeleteGame = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteGame = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`/games/${id}`);
      setLoading(false);
    } catch (err) {
      setError(err as Error);
      setLoading(false);
      throw err;
    }
  };

  return { deleteGame, loading, error };
};
