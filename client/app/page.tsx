'use client'

import { RouletteProvider } from "@/components/roulette/roulette-main/utility/RouletteHooks";
import { BalanceProvider } from "@/components/balance/BalanceContext";
import "./styles.scss";
import Roulette from "@/components/roulette/roulette-main/Roulette";

export default function Home() {
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