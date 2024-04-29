'use client'

import React, { useState, useEffect } from "react";

import "./styles.scss";
import { start } from "repl";

export default function Home() {
  const [backgroundPosition, setBackgroundPosition] = useState<number>(4096);
  const [position, setPosition] = useState<number>(0);
  const [rouletteTimer, setRouletteTimer] = useState<number>(0);
  const [bets, setBets] = useState<{red: number[], green: number[], black: number[]}>({red: [], green: [], black: []});
  const [bet, setBet] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(true);
  const [decrement, setDecrement] = useState<number>(128);
  const [startPosition, setStartPosition] = useState<number>(4096);
  const [roulettePosition, setRoulettePosition] = useState<number>(4096);
  
  const [saldo, setSaldo] = useState<number>(10000);
  const [username, setUsername] = useState<string>('Koksiarz');

  useEffect(() => {
    if (backgroundPosition > position && isSpinning === true) {
      spinning();
    }
    if(backgroundPosition <= position) {
      resetRoulette();
    }
  }, [backgroundPosition, position, isSpinning, startPosition, decrement, roulettePosition]);

  useEffect(() => {
    if (rouletteTimer > 0) {
      rouletteTimerOperation();
    }
    if(rouletteTimer === 0) {
      setIsSpinning(true);
    }
  }, [rouletteTimer]);

  function randomizePosition() { // Losowanie pozycji
    var random = Math.floor(Math.random() * 1025);

    setPosition(0 - random);
    console.log(random);
  }

  function rouletteTimerOperation() { // Timer ruletki
    const timer = setTimeout(() => {
      setRouletteTimer(rouletteTimer - 100);
    }, 100);
    return () => clearTimeout(timer);
  }

  function resetRoulette() { // Resetowanie ruletki
    const timer = setTimeout(() => {
      setDecrement(128);
      setIsSpinning(false);
      randomizePosition();
      setStartPosition(4096 + Math.abs(position));
      console.log("Start position: " + startPosition);
      setBackgroundPosition(4096);
      setBets({red: [], green: [], black: []});
      setRouletteTimer(10000);
    }, 3000);
    return () => clearTimeout(timer);
  }

  function spinning() { // Kręcenie ruletką
    setIsSpinning(true);
    const timer = setTimeout(() => {
      setBackgroundPosition(backgroundPosition - decrement);
      setRoulettePosition(roulettePosition - decrement);
      console.log(backgroundPosition);
      if (roulettePosition <= startPosition / 2 && decrement > 8) {
        setDecrement(decrement / 2);
        setStartPosition(startPosition / 2);
      }
    }, 100);
    return () => clearTimeout(timer);
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
    <main>
      <div className="profile-wrapper">
        <span>{username}</span>
        <span>Saldo: {saldo}</span>
      </div>
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
      </div>
    </main>
  );
}