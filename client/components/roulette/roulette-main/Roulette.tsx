'use client'

import React, { useState, useEffect } from 'react'

import './roulette.scss'

import { useBalanceContext, BalanceContextType } from '@/components/balance/BalanceContext';
import { useResetRoulette, useSpinning, useRouletteTimerOperation, useCheckingWinningPosition, useTakeBet } from '@/components/roulette/roulette-main/utility/RouletteActions';
import { RouletteContextType, useRoulette } from '@/components/roulette/roulette-main/utility/RouletteHooks'
import RouletteInfo from '@/components/roulette/roulette-main/utility/RouletteBets';
import Balance from '@/components/balance/Balance';

export default function Roulette() {
  // Contexty do obsługi ruletki
  const { backgroundPosition, rouletteTimer, isSpinning, setIsSpinning, position, setBet, userBets } = useRoulette() as RouletteContextType;
  const { saldo, setSaldo, setUsername } = useBalanceContext() as BalanceContextType;
  const [selectedColor, setSelectedColor] = useState<string>("red");
  const colorOptions = [
    { colorName: 'Czerwone', colorValue: 'red' },
    { colorName: 'Zielone', colorValue: 'green' },
    { colorName: 'Czarne', colorValue: 'black' }
  ];

  // Hooki do obsługi ruletki
  const startTimer = useRouletteTimerOperation();
  const resetRoulette = useResetRoulette();
  const spinning = useSpinning();
  const checkWinningPosition = useCheckingWinningPosition();
  const takeBet = useTakeBet(selectedColor);

  useEffect(() => { // Inicjalizacja ruletki
    if (position !== null && backgroundPosition > position && isSpinning === true) { // Kręcenie się ruletki
      const timer = setTimeout(() => {
        spinning();
      }, 100);
      return () => clearTimeout(timer);
    }
    if(position !== null && backgroundPosition <= position) { // Sprawdzanie wygrywającej pozycji i resetowanie ruletki
      checkWinningPosition();
      const timer = setTimeout(() => {
        resetRoulette();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [backgroundPosition, position, isSpinning]);

  useEffect(() => { // Timer ruletki
    if (rouletteTimer > 0) {
      startTimer();
    }
    if(rouletteTimer === 0) {
      setIsSpinning(true);
    }
  }, [rouletteTimer]);

  function devLogout() { // DEV, trzeba usunąć!
    localStorage.removeItem('token');
    window.location.reload();
  }

  return (
    <>
      <Balance />
      <div className="roulette-wrapper">
        <div className="roulette-wheel" style={{backgroundPosition: `${backgroundPosition}px`}}>
          <div className="roulette-arrow"></div>
          <div className={isSpinning ? "roulette-timer hidden" : "roulette-timer"}>
            {rouletteTimer/1000} seconds
          </div>
        </div>
        <div className={isSpinning ? "roulette-options disabled" : "roulette-options"}>
          <div className="roulette-input">
            <input className="roulette-bet" type="number" placeholder="Kwota zakładu" onChange={(event) => setBet(Number(event.target.value))}/>
          </div>
          <div className="roulette-buttons">
            {colorOptions.map((option) => (
              <button
                key={option.colorValue}
                className={`roulette-option ${option.colorValue}`}
                onClick={() => takeBet(option.colorValue)}
              >
                {option.colorName}
              </button>
            ))}
          </div>
        </div>
        <RouletteInfo bets={userBets} />
        <div className='dev-buttons' style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px'}}> {/* DEV, trzeba usunąć! */}
          <span>DEV</span>
          <button onClick={() => setSaldo(saldo + 1000)}>Dodaj 1000</button>
          <button onClick={() => setSaldo(saldo - 1000)}>Odejmij 1000</button>
          <button onClick={() => resetRoulette()}>Resetuj ruletkę</button>
          <button onClick={() => devLogout()}>Wyloguj</button>
        </div>
      </div>
    </>
  )
}