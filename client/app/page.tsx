'use client'

import React, { useEffect } from "react";
import { useRouter } from 'next/navigation'
import { io } from "socket.io-client";

import "./styles/styles.scss";

import { RouletteProvider } from "@/components/roulette/roulette-main/utility/RouletteHooks";
import { BalanceProvider } from "@/components/balance/BalanceContext";
import Roulette from "@/components/roulette/roulette-main/Roulette";

import { checkToken } from "@/components/utility/auth/actions/checkToken";

const socket = io("http://localhost:4000", {
  reconnectionDelayMax: 10000,
  auth: {
    token: "123"
  },
  query: {
    "my-key": "my-value"
  }
});

socket.on("connect", () => {
  console.log("Connected to server.");
});

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    console.log("Checking token...");
    checkToken();
    router.refresh()
  }, []);

  return (
    <main>
      <BalanceProvider>
        <RouletteProvider>
          <Roulette />
        </RouletteProvider>
      </BalanceProvider>
    </main>
  );
}