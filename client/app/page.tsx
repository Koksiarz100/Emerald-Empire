'use client'

import React, { useEffect } from "react";
import { useRouter } from 'next/navigation'
import { sendSocketMessage } from "@/components/utility/connection/socket";

import "./styles/styles.scss";

import { RouletteProvider } from "@/components/roulette/roulette-main/utility/RouletteHooks";
import { BalanceProvider } from "@/components/balance/BalanceContext";
import Roulette from "@/components/roulette/roulette-main/Roulette";

import { checkToken } from "@/components/utility/auth/actions/checkToken";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    console.log("Checking token...");
    checkToken();
    router.refresh()
  }, []);

  return (
    <main>
      <button onClick={() => sendSocketMessage("Hello from client!")}>Send message to server</button>
      <BalanceProvider>
        <RouletteProvider>
          <Roulette />
        </RouletteProvider>
      </BalanceProvider>
    </main>
  );
}