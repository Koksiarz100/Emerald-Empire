import React, { useContext, useState, ReactNode } from 'react';

const RouletteContext = React.createContext<RouletteContextType | null>(null);

export const useRoulette = () => useContext(RouletteContext);

interface RouletteProviderProps {
  children: ReactNode;
}

export interface RouletteContextType {
  backgroundPosition: number;
  setBackgroundPosition: React.Dispatch<React.SetStateAction<number>>;

  isWinningPositionSet: boolean;
  setIsWinningPositionSet: React.Dispatch<React.SetStateAction<boolean>>;

  bets: {
    red: number[];
    green: number[];
    black: number[];
  };
  setBets: React.Dispatch<React.SetStateAction<{
    red: number[];
    green: number[];
    black: number[];
  }>>;

  rouletteTimer: number;
  setRouletteTimer: React.Dispatch<React.SetStateAction<number>>;

  isSpinning: boolean;
  setIsSpinning: React.Dispatch<React.SetStateAction<boolean>>;

  position: number | null;
  setPosition: React.Dispatch<React.SetStateAction<number | null>>;

  decrement: number | null;
  setDecrement: React.Dispatch<React.SetStateAction<number | null>>;

  bet: number;
  setBet: React.Dispatch<React.SetStateAction<number>>;

  userBets: {
    bet: number[];
    user: string[];
    color: string[];
  };
  setUserBets: React.Dispatch<React.SetStateAction<{
    bet: number[];
    user: string[];
    color: string[];
  }>>;
}

export const RouletteProvider: React.FC<RouletteProviderProps> = ({ children }) => {
  const [backgroundPosition, setBackgroundPosition] = useState(8192);
  const [isWinningPositionSet, setIsWinningPositionSet] = useState(false);
  const [bets, setBets] = React.useState<{red: number[]; green: number[]; black: number[]}>({ red: [], green: [], black: [] });
  const [userBets, setUserBets] = useState<{bet: number[], user: string[], color: string[]}>({ bet: [], user: [], color: [] });
  const [rouletteTimer, setRouletteTimer] = useState(10000);
  const [isSpinning, setIsSpinning] = useState(false);
  const [position, setPosition] = useState<number | null>(0);
  const [decrement, setDecrement] = useState<number | null>(256);
  const [bet, setBet] = useState<number>(0);

  const value = {
    backgroundPosition, setBackgroundPosition,
    isWinningPositionSet, setIsWinningPositionSet,
    bets, setBets,
    rouletteTimer, setRouletteTimer,
    isSpinning, setIsSpinning,
    position, setPosition,
    decrement, setDecrement,
    bet, setBet,
    userBets, setUserBets
  };

  return <RouletteContext.Provider value={value}>{children}</RouletteContext.Provider>;
};

export default RouletteContext;