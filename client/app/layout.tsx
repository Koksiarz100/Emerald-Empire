import type { Metadata } from "next";
import { Inter } from "next/font/google";


import { UserProvider } from "@/components/utility/auth/Auth";
import Nav from "@/components/layout/Nav";

import "./styles/globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Emerald Empire",
  description: "Casino online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={inter.className}>
        <UserProvider>
          <Nav />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
