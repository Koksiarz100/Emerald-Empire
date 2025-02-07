'use client'

import React, { useEffect } from "react";
import { useRouter } from 'next/navigation'
import { sendSocketMessage } from "@/components/utility/connection/socket";

import "./styles/styles.scss";

import { RouletteProvider } from "@/components/roulette/utility/RouletteHooks";
import { BalanceProvider } from "@/components/balance/BalanceContext";
import Roulette from "@/components/roulette/Roulette";
import { useUser } from "@/components/utility/auth/Auth"

import { checkToken } from "@/components/utility/auth/actions/checkToken";

export default function Home() {
  const router = useRouter();

  const { username } = useUser();

  useEffect(() => {
    console.log("Checking token...");
    checkToken();
    router.refresh()
  }, []);

  useEffect(() => {
    if (username.length === 0) {
      router.push('/login');
    }
  } , [username]);

  return (
    <main>
      <BalanceProvider>
        <RouletteProvider>
          <Roulette />
        </RouletteProvider>
      </BalanceProvider>
      <button onClick={() => sendSocketMessage("Hello from client!")}>Send message to server</button>
    </main>
  );
}