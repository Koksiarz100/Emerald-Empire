import { RouletteContextType, useRoulette } from "@/components/roulette/roulette-main/utility/RouletteHooks";
import { useBalanceContext, BalanceContextType } from "@/components/balance/BalanceContext";
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
  const { backgroundPosition, setBackgroundPosition, decrement, setDecrement, isWinningPositionSet, setIsWinningPositionSet, setPosition } = useRoulette() as RouletteContextType;
  
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

export function useCheckingWinningPosition() { // Sprawdzanie wygrywającej pozycji
  const { bets, position } = useRoulette() as RouletteContextType;
  const { saldo, setSaldo } = useBalanceContext() as BalanceContextType;

  const checkingWinningPosition = () => {
    if (position === null) {
      console.error("Pozycja jest null, nie można sprawdzić wygrywającej pozycji.");
      return;
    }

    let positivePosition = Math.abs(position);
    if ((positivePosition >= 0 + 1024 && positivePosition < 146 + 1024) || (positivePosition >= 292 + 1024 && positivePosition < 438 + 1024) || (positivePosition > 730 + 1024 && positivePosition <= 876 + 1024)) {
      console.log("Czerwone wygrywają!");
      if (bets.red.length > 0) {
        let totalWin = bets.red.reduce((acc, bet) => acc + bet * 2, 0);
        setSaldo(saldo + totalWin);
      }
    }
    else if (positivePosition > 438 + 1024 && positivePosition <= 584 + 1024) {
      console.log("Zielone wygrywają!");
      if (bets.green.length > 0) {
        let totalWin = bets.green.reduce((acc, bet) => acc + bet * 14, 0);
        setSaldo(saldo + totalWin);
      }
    }
    else if ((positivePosition >= 146 + 1024 && positivePosition < 292 + 1024) || (positivePosition > 584 + 1024 && positivePosition <= 730 + 1024) || (positivePosition > 876 + 1024 && positivePosition <= 1024 + 1024)) {
      console.log("Czarne wygrywają!");
      if (bets.black.length > 0) {
        let totalWin = bets.black.reduce((acc, bet) => acc + bet * 2, 0);
        setSaldo(saldo + totalWin);
      }
    }
  }

  return checkingWinningPosition;
}

export function useTakeBet(color: string) { // Przyjmowanie zakładu
  const { saldo, setSaldo } = useBalanceContext() as BalanceContextType;
  const { setBets, bet } = useRoulette() as RouletteContextType;

  const takeBet = (color: string) => {
    if (bet > 0) {
      if (Number.isInteger(bet)) {
        if(bet <= saldo) {
          if (color === 'red') {
            setSaldo(saldo - bet);
            setBets(prevBets => ({ ...prevBets, red: [...prevBets.red, bet] }));
          } else if (color === 'green') {
            setSaldo(saldo - bet);
            setBets(prevBets => ({ ...prevBets, green: [...prevBets.green, bet] }));
          } else if (color === 'black') {
            setSaldo(saldo - bet);
            setBets(prevBets => ({ ...prevBets, black: [...prevBets.black, bet] }));
          }
        }
        else {
          console.log('Za mało środków na koncie');
        }
      }
      else {
        console.log('Kwota zakładu musi być liczbą całkowitą');
      }
    }
  }

  return takeBet;
}