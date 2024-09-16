import React, { useEffect } from "react";
import { useGeneralStore } from "@/stores/general-store";
import { socket } from "@/socket";

interface TimerProps {
  roomCode: string;
}

export default function Timer({ roomCode }: TimerProps) {
  const { timeLeft, setTimeLeft, currentTurn, setCurrentTurn } =
    useGeneralStore();

  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    // Listen for startTimer event from the server
    socket.on("startTimer", ({ currentTurn }: { currentTurn: number }) => {
      setCurrentTurn(currentTurn);
      setTimeLeft(30); // Start with 30 seconds

      const intervalId = setInterval(() => {
        setTimeLeft((prevTime: number) => {
          if (prevTime <= 1) {
            clearInterval(intervalId);
            socket.emit("changeTurn", roomCode);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(intervalId); // Cleanup on unmount
    });

    return () => {
      socket.off("startTimer");
    };
  }, [setCurrentTurn, setTimeLeft, roomCode]);

  const strokeDashoffset = circumference - (timeLeft / 30) * circumference;

  return (
    <div className="relative w-30 h-30">
      <svg width="120" height="120" className="block mx-auto">
        <circle
          stroke="gray"
          fill="transparent"
          strokeWidth="5"
          r={radius}
          cx="60"
          cy="60"
        />
        <circle
          stroke="green"
          fill="transparent"
          strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          r={radius}
          cx="60"
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold">
        {timeLeft}s
      </div>
    </div>
  );
}
