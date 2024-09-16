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
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUpdatePlayer } from "@/hooks/player/use-update-a-player";
import { useGeneralStore } from "@/stores/general-store";
import { fetchAllPlayers } from "@/utils/apis/player/fetch-all-players";
import { playerType } from "@/types/player-type";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function Admin() {
  const { setAllPlayersArray, allPlayersArray } = useGeneralStore();
  const { updatePlayer } = useUpdatePlayer();
  const [selectedPlayer, setSelectedPlayer] = useState<playerType | null>(null);

  const handleAdminClick = async (
    email: string | null | undefined,
    isAdminArg: boolean | undefined
  ) => {
    if (email && isAdminArg !== undefined) {
      try {
        console.log("Changing admin status...");
        await updatePlayer(email, {
          isAdmin: !isAdminArg,
        });
        const res = await fetchAllPlayers();
        setAllPlayersArray(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleBlockClick = async (
    email: string | null | undefined,
    isBlockedArg: boolean | undefined
  ) => {
    if (email && isBlockedArg !== undefined) {
      try {
        console.log("Changing block status...");
        await updatePlayer(email, {
          isBlocked: !isBlockedArg,
        });
        const res = await fetchAllPlayers();
        setAllPlayersArray(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const getPlayers = async () => {
      try {
        const fetchedPlayers = await fetchAllPlayers();
        setAllPlayersArray(fetchedPlayers);
      } catch (err) {
        console.log("Failed to fetch players.");
      }
    };

    getPlayers();
  }, []);

  const getRandomColor = () => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Toggle Admin</TableHead>
            <TableHead>Toggle Block</TableHead>
            <TableHead>More Info</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allPlayersArray.map((player: playerType) => (
            <TableRow key={player.email}>
              <TableCell className="font-medium flex items-center gap-3">
                <Avatar>
                  {player.image ? (
                    <AvatarImage src={player.image} alt="/" />
                  ) : (
                    <AvatarFallback
                      className={`${getRandomColor()} text-white`}
                    >
                      {player.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>{player.name}</div>
              </TableCell>
              <TableCell className="font-medium">{player.email}</TableCell>
              <TableCell>{player.mobileNumber}</TableCell>
              <TableCell
                onClick={() => handleAdminClick(player.email, player.isAdmin)}
                className="cursor-pointer underline"
              >
                {player.isAdmin ? "Remove Admin" : "Make Admin"}
              </TableCell>
              <TableCell
                onClick={() => handleBlockClick(player.email, player.isBlocked)}
                className="cursor-pointer underline"
              >
                {player.isBlocked ? "Unblock" : "Block"}
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={() => setSelectedPlayer(player)}>
                      More Info
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <div className="flex flex-col gap-4 justify-start items-start ">
                      {selectedPlayer?.image ? (
                        <img
                          src={selectedPlayer.image}
                          alt="/"
                          className="w-24 h-24 rounded-full mx-auto"
                        />
                      ) : (
                        <div
                          className={`w-24 h-24 flex items-center justify-center rounded-full text-white text-2xl ${getRandomColor()}`}
                        >
                          {selectedPlayer?.name?.charAt(0).toUpperCase()}
                        </div>
                      )}

                      <p>
                        <strong>Name:</strong> {selectedPlayer?.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {selectedPlayer?.email}
                      </p>
                      <p>
                        <strong>Mobile Number:</strong>{" "}
                        {selectedPlayer?.mobileNumber}
                      </p>
                      <p>
                        <strong>Is Admin:</strong>{" "}
                        {selectedPlayer?.isAdmin ? "Yes" : "No"}
                      </p>
                      <p>
                        <strong>Is Blocked:</strong>{" "}
                        {selectedPlayer?.isBlocked ? "Yes" : "No"}
                      </p>
                      <p>
                        <strong>Alias:</strong> {selectedPlayer?.alias}
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
            
          ))}
        </TableBody>
      </Table>

    </>
  );
}
