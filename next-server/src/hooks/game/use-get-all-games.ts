import { useState, useEffect } from "react";
import axios from "axios";
import { roomType } from "@/types/room-type";

export const useGetAllGames = () => {
  const [games, setGames] = useState<roomType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get<roomType[]>("/games");
        setGames(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return { games, loading, error };
};
