"use client";
import { ModeToggle } from "./toggle-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Logo from "./logo";
import { UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import { useGetPlayer } from "@/hooks/player/use-get-a-player";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useState } from "react";
import { useGeneralStore } from "@/stores/general-store";
import { usePathname } from "next/navigation";
export default function Nav() {
  const { user } = useUser();
  const { currentPlayer } = useGeneralStore();
  const { player } = useGetPlayer(user?.emailAddresses[0].emailAddress);
  const [isAdmin, setISAdmin] = useState<boolean>(false);
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(false);
  const pathname = usePathname();
  useEffect(() => {
    console.log(currentPlayer, "from nav");
    if (currentPlayer?.isAdmin) {
      setISAdmin(true);
    } else {
      setISAdmin(false);
    }
  }, [currentPlayer]);

  useEffect(() => {
    console.log(pathname, "in useEffext");
    if (pathname === "/admin") setIsAdminRoute(true);
    else setIsAdminRoute(false);
  }, [pathname]);
  return (
    <>
      <div className="w-full flex justify-between items-center py-4 border-b">
        <Logo className="text-primary" />
        <div className="flex gap-4">
          {isAdmin ? (
            <Link href={isAdminRoute ? "/" : "/admin"}>
              <Button className="">
                {isAdminRoute ? "go to app" : "admin dashboard"}
              </Button>
            </Link>
          ) : null}
          <UserButton />
          <ModeToggle />
        </div>
      </div>
    </>
  );
}
