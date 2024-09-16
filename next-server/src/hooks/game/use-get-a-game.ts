import { useState, useEffect } from "react";
import axios from "axios";
import { roomType } from "@/types/room-type";

export const useGetGame = (id: string) => {
  const [game, setGame] = useState<roomType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get<roomType>(`/games/${id}`);
        setGame(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  return { game, loading, error };
};
