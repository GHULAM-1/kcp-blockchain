import { useState, useEffect } from "react";
import axios from "axios";
import { playerType } from "@/types/player-type";

export const useGetPlayer = (email: string | undefined) => {
  const [player, setPlayer] = useState<playerType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isFound, setIsFound] = useState<boolean>(true);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/players/${email}`
        );

        if (response.status === 200) {
          setPlayer(response.data);
          setIsFound(true);
        } else if (response.status === 404) {
          setMessage(response.data.message);
          setIsFound(false);
        }
      } catch (err: any) {
        setError(err.message);
        setIsFound(false);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchPlayer();
    }
  }, [email]);

  return { player, loading, error, message, isFound, setIsFound };
};
