import { gamesNames } from "@/data/games-names";
import { gamesNamesType } from "@/types/games-names-type";
import Link from "next/link";
export default function Overview() {
  return (
    <>
      <div className="flex flex-col gap-6">
        {gamesNames.map((gameName: gamesNamesType) => {
          return <Link href={ `/overview/${gameName}`} className="text-green-500">{gameName}</Link>;
        })}
      </div>
    </>
  );
}
