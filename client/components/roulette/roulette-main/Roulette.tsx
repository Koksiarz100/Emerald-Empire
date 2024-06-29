'use client'

import React, { useState, useEffect } from 'react'

import './roulette.scss'

import { Balance, useBalance, BalanceContextType } from '@/components/balance/Balance';
import { useResetRoulette, useSpinning, useRouletteTimerOperation } from '@/components/roulette/roulette-main/Utility/RouletteActions';
import { RouletteContextType, useRoulette } from '@/components/roulette/roulette-main/Utility/RouletteHooks'

export default function Roulette() {
  const { backgroundPosition, bets, setBets, rouletteTimer, isSpinning, setIsSpinning, position } = useRoulette() as RouletteContextType;
  const { saldo, setSaldo, setUsername, username } = useBalance() as BalanceContextType;
  const startTimer = useRouletteTimerOperation();
  const resetRoulette = useResetRoulette();
  const spinning = useSpinning();

  // Betowanie
  const [bet, setBet] = useState<number>(0);
  // Użtkownik

  useEffect(() => { // Inicjalizacja ruletki
    if (position !== null && backgroundPosition > position && isSpinning === true) {
      spinning();
    }
    if(position !== null && backgroundPosition <= position) {
      checkWinningPosition();
      console.log("Resetting roulette!");
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


  function checkWinningPosition() { // Sprawdzanie wygrywającej pozycji
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

  function takeBet(color: string) { // Przyjmowanie zakładu
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
            <button className="roulette-option red" onClick={() => takeBet('red')}>Czerwone</button>
            <button className="roulette-option green" onClick={() => takeBet('green')}>Zielone</button>
            <button className="roulette-option black" onClick={() => takeBet('black')}>Czarne</button>
          </div>
        </div>
        <div className="roulette-info">
          <div className="roulette-info-red">
            <span>Czerwone</span>
            <div className="roulette-info-players">
              {
                bets.red.map((bet, index) => (
                  <div className="roulette-info-player" key={index}><span>Gracz {index + 1} - {bet}</span></div>
                ))
              }
            </div>
          </div>
          <div className="roulette-info-green">
            <span>Zielone</span>
            <div className="roulette-info-players">
              {
                bets.green.map((bet, index) => (
                  <div className="roulette-info-player" key={index}><span>Gracz {index + 1} - {bet}</span></div>
                ))
              }
            </div>
          </div>
          <div className="roulette-info-black">
            <span>Czarne</span>
            <div className="roulette-info-players">
              {
                bets.black.map((bet, index) => (
                  <div className="roulette-info-player" key={index}><span>Gracz {index + 1} - {bet}</span></div>
                ))
              }
            </div>
          </div>
        </div>
        <div className='dev-buttons' style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px'}}>
          <input type="text" placeholder="Username" onChange={(event) => setUsername(event.target.value)} />
          <button onClick={() => setSaldo(saldo + 1000)}>Dodaj 1000</button>
          <button onClick={() => setSaldo(saldo - 1000)}>Odejmij 1000</button>
          <button onClick={() => resetRoulette()}>Resetuj ruletkę</button>
        </div>
      </div>
    </>
  )
}