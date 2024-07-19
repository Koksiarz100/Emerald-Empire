'use client'

import React, { useEffect } from "react";
import { useRouter } from 'next/navigation'

import "./styles.scss";

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
      <BalanceProvider>
        <RouletteProvider>
          <Roulette />
        </RouletteProvider>
      </BalanceProvider>
    </main>
  );
}