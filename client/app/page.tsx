'use client'

import { RouletteProvider } from "@/components/roulette/roulette-main/Utility/RouletteHooks";
import { BalanceProvider, Balance } from "@/components/balance/Balance";
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