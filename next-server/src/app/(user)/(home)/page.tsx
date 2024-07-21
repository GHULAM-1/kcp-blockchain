import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ModeToggle } from "@/components/toggle-button";

export default function Home() {
  return (
    <>
      <div className="h-screen  flex w-full justify-center items-center flex-col">
        <div className="text-8xl font-poker">KCP RUNG</div>
        <div className="font-baskerville text-center w-[800px] mt-5">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et numquam
          odio illo corporis quia voluptatum tenetur exercitationem Lorem ipsum
          dolor sit amet, consectetur adipisicing elit. Eaque, aperiam. Veniam
          blanditiis quis, at dicta repudiandae a magni nam! Quia!
        </div>

        <Link href="/overview">
          <SignInButton forceRedirectUrl={"/overview"}>
            <Button className="font-baskerville mt-4">Get started</Button>
          </SignInButton>
        </Link>
        <ModeToggle />
      </div>
    </>
  );
}
