type LogoPropsTypes = React.HTMLAttributes<HTMLDivElement>;
import { cn } from "@/lib/utils";
export default function Logo({ className }: LogoPropsTypes) {
  return (
    <>
      <div className={cn(`font-poker`, className)}>KCP RUNG</div>
    </>
  );
}
