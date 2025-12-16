import { Bodoni_Moda, Lato } from "next/font/google";

export const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-title",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const lato = Lato({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["100", "300", "400", "700", "900"],
});
