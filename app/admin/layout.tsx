import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";


import { ThemeProvider } from "@/app/components/theme-provaider";
import Header from "./components2/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify - Web Player: Música para todos",
  description:
    "Ouça músicas, crie playlists e descubra novos artistas no Spotify",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme=""
          enableSystem={false}
          disableTransitionOnChange
        >
            <Header/>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}