"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchAllPlayers } from "@/utils/apis/player/fetch-all-players";
import { playerType } from "@/types/player-type";

export default function Leaderboard() {
  const [players, setPlayers] = useState<playerType[]>([]);

  useEffect(() => {
    const getPlayers = async () => {
      try {
        const fetchedPlayers = await fetchAllPlayers();
        setPlayers(fetchedPlayers);
      } catch (err) {
        console.log("Failed to fetch players.");
      }
    };

    getPlayers();
  }, []);

  const calculateWinPercentage = (player: playerType) => {
    const totalMatches = player.gamesPlayed?.length || 0;
    const totalWins =
      player.gamesPlayed?.filter((game) => game.isWon)?.length || 0;
    return totalMatches > 0
      ? ((totalWins / totalMatches) * 100).toFixed(2)
      : "0.00";
  };

  const getRandomColor = () => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-orange-500",
      "bg-amber-500",
      "bg-lime-500",
      "bg-emerald-500",
      "bg-teal-500",
      "bg-cyan-500",
      "bg-fuchsia-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Rank</TableHead>
          <TableHead>Player</TableHead>
          <TableHead>Total Matches</TableHead>
          <TableHead>Wins</TableHead>
          <TableHead>Draws</TableHead>
          <TableHead>Losses</TableHead>
          <TableHead>Win Percentage</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {players
          .sort(
            (a, b) =>
              parseFloat(calculateWinPercentage(b)) -
              parseFloat(calculateWinPercentage(a))
          )
          .map((player, index) => {
            const totalMatches = player.gamesPlayed?.length || 0;
            const totalWins =
              player.gamesPlayed?.filter((game) => game.isWon)?.length || 0;
            const totalDraws =
              player.gamesPlayed?.filter((game) => game.isDraw)?.length || 0;
            const totalLosses = totalMatches - totalWins - totalDraws;

            return (
              <TableRow key={player.email}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="flex items-center">
                  {player.image ? (
                    <img
                      src={player.image}
                      alt={player.name || "Player Image"}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  ) : (
                    <div
                      className={`w-12 h-12 flex items-center justify-center rounded-full font-bold text-xl text-white ${getRandomColor()}`}
                    >
                      {player.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="ml-4">
                    <div className="font-bold">{player.name}</div>
                    <div className="text-sm text-gray-400">{player.email}</div>
                  </div>
                </TableCell>
                <TableCell>{totalMatches}</TableCell>
                <TableCell>{totalWins}</TableCell>
                <TableCell>{totalDraws}</TableCell>
                <TableCell>{totalLosses}</TableCell>
                <TableCell>{calculateWinPercentage(player)}%</TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
}
