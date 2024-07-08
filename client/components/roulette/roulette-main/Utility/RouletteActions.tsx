import React from "react";
import { RouletteContextType, useRoulette } from "@/components/roulette/roulette-main/utility/RouletteHooks";
import { getWinningPosition } from "@/components/roulette/roulette-main/connection/ServerConnection";

export function useRouletteTimerOperation() {
  const { rouletteTimer, setRouletteTimer } = useRoulette() as RouletteContextType;

  const startTimer = () => {
    const timer = setTimeout(() => {
      setRouletteTimer(rouletteTimer - 100);
    }, 100);
    return () => clearTimeout(timer);
  };

  return startTimer;
}

export function useResetRoulette() {
  const { setDecrement, setIsSpinning, setPosition, setBackgroundPosition, setIsWinningPositionSet, setBets, setRouletteTimer } = useRoulette() as RouletteContextType;

  const reset = () => {
    setDecrement(256);
    setIsSpinning(false);
    setPosition(0);
    setBackgroundPosition(8192);
    setIsWinningPositionSet(false);
    setBets({red: [], green: [], black: []});
    setRouletteTimer(10000);
  };

  return reset;
}

export function useSpinning() { // Kręcenie ruletką
  const { backgroundPosition, setBackgroundPosition, decrement, setDecrement, isWinningPositionSet, setIsWinningPositionSet, setPosition, setIsSpinning } = useRoulette() as RouletteContextType;
  
  const spinning = () => {
    if (decrement !== null) {
      setBackgroundPosition(backgroundPosition - decrement);
      if (backgroundPosition === 1024 && isWinningPositionSet === false) {
        getWinningPosition().then(newPosition => {
          setPosition(newPosition);
          setDecrement(64);
          setIsWinningPositionSet(true);
        });
      }
      if (isWinningPositionSet === true && backgroundPosition <= 0) {
        if(backgroundPosition <= 0 && decrement === 64) {
          setDecrement(32);
        }
      }
    }
  }

  return spinning;
}