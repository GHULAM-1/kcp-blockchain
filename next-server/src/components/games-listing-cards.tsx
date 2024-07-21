import { GlareCard } from "@/components/ui/glare-card";
type GamesListingCardsPropsTypes = {
  gameName: string;
  activeGames: number;
};
export default function GamesListingCards({
  gameName,
  activeGames,
}: GamesListingCardsPropsTypes) {
  return (
    <>
      <div className="min-w-[300px] h-[100px] bg-secondary rounded-md font-baskerville p-3 flex justify-between flex-col hover:opacity-75 transition-all ease-linear hover:scale-110">
        <div className="text-secondary-foreground text-2xl w-full ">
          {gameName}
        </div>
        <div className="flex  justify-end text-primary text-sm font-semibold">
          {/* <span className="text-muted-foreground">active games : </span>/ */}
          {activeGames}
        </div>
      </div>
    </>
  );
}
