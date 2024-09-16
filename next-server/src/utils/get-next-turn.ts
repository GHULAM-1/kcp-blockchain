export const getNextTurn = (
  currentTurn: number,
  totalPlayers: number
): number => {
  return currentTurn >= totalPlayers - 1 ? 0 : currentTurn + 1;
};
