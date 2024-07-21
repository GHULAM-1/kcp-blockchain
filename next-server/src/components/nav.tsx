"use client";
import { ModeToggle } from "./toggle-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Logo from "./logo";
import { UserButton } from "@clerk/nextjs";
export default function Nav() {
  return (
    <>
      <div className="w-full flex justify-between items-center py-4 border-b">
        <Logo className="text-primary" />
        <div className="flex gap-4">
          <UserButton />
          <ModeToggle />
        </div>
      </div>
    </>
  );
}
