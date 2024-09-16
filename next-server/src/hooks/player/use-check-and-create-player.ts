import { useState } from "react";
import axios from "axios";
import { playerType } from "@/types/player-type";

type UseCheckAndCreatePlayer = {
  player: playerType | null;
  loading: boolean;
  error: string | null;
  checkAndCreatePlayer: (
    email: string,
    name: string | null,
    image: string
  ) => Promise<void>;
};

export const useCheckAndCreatePlayer = (): UseCheckAndCreatePlayer => {
  const [player, setPlayer] = useState<playerType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const checkAndCreatePlayer = async (
    email: string,
    name: string | null,
    image: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3001/players/checkandcreate",
        {
          email,
          name,
          image,
        }
      );
      setPlayer(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return { player, loading, error, checkAndCreatePlayer };
};
