import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import StyledComponentsRegistry from "./StyledComponentsRegistry";

export const metadata: Metadata = {
  title: "Double UU",
  description: "Double UU Project by Wilma Håkansson",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
