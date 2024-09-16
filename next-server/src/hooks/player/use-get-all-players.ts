import { useState, useEffect } from "react";
import axios from "axios";
import { playerType } from "@/types/player-type";

export const useGetAllPlayers = () => {
  const [players, setPlayers] = useState<playerType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get<playerType[]>(
          "http://localhost:3001/players"
        );
        setPlayers(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  return { players, loading, error };
};
