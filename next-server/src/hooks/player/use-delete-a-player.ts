import { useState } from "react";
import axios from "axios";

export const useDeletePlayer = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const deletePlayer = async (email: string) => {
    try {
      setLoading(true);
      await axios.delete(`/players/${email}`);
      setLoading(false);
    } catch (err) {
      setError(err as Error);
      setLoading(false);
      throw err;
    }
  };

  return { deletePlayer, loading, error };
};
