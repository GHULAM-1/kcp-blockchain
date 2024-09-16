export default function isGameCreatorSocket(
  gameCreatorEmail: string,
  currentSocketEmail: string | undefined
): boolean {
  if (currentSocketEmail) {
    return gameCreatorEmail === currentSocketEmail;
  }
  return false;
}
