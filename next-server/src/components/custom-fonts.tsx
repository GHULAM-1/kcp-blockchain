import localFont from "next/font/local";

const poker = localFont({
  src: [
    {
      path: "../assets/fonts/poker-in-october/PokerInOctoberDemo-Dxm3.otf",
      weight: "700",
      style: "normal",
    }
  ],
  variable: "--font-poker",
});

export { poker };
