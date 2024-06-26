'use client'

import { RouletteProvider } from "@/components/roulette/roulette-main/Utility/RouletteHooks";
import "./styles.scss";
import Roulette from "@/components/roulette/roulette-main/Roulette";

export default function Home() {
  return (
    <main>
      <RouletteProvider>
        <Roulette />
      </RouletteProvider>
    </main>
  );
}