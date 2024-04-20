'use client'

import React, { useState, useEffect } from "react";

import "./styles.scss";

export default function Home() {
  const [backgroundPosition, setBackgroundPosition] = useState(5000);
  const [position, setPosition] = useState(5000);
  const [rouletteTimer, setRouletteTimer] = useState(0);
  const [isHidden, setIsHidden] = useState(true);
  const [bets, setBets] = useState<{red: number[], green: number[], black: number[]}>({red: [], green: [], black: []});
  const [bet, setBet] = useState(0);

  useEffect(() => {
    if (backgroundPosition > position) {
      const decrement = backgroundPosition <= 500 ? 20 : 100;
      const timer = setTimeout(() => {
        setBackgroundPosition(backgroundPosition - decrement);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [backgroundPosition, position]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if(position <= 0) {
        setPosition(5000);
        setBackgroundPosition(5000);
        setBets({red: [], green: [], black: []});
        setIsHidden(false);
        setRouletteTimer(10000);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [position, backgroundPosition]);

  useEffect(() => {
    if (rouletteTimer > 0) {
      const timer = setTimeout(() => {
        setRouletteTimer(rouletteTimer - 100);
      }, 100);
      return () => clearTimeout(timer);
    }
    setIsHidden(true);
    spin();
  }, [rouletteTimer]);

  function reset() {
    
  }

  const spin = () => {
    setPosition(position - 5000);
  }

  function takeBet(color: string) {
    if (bet > 0) {
      if (color === 'red') {
        setBets(prevBets => ({ ...prevBets, red: [...prevBets.red, bet] }));
      } else if (color === 'green') {
        setBets(prevBets => ({ ...prevBets, green: [...prevBets.green, bet] }));
      } else if (color === 'black') {
        setBets(prevBets => ({ ...prevBets, black: [...prevBets.black, bet] }));
      }
    }
  }

  return (
    <main>
      <h1>Emerald Empire</h1>
      <p>Casino online</p>
      <div className="roulette-wrapper">
        <div className="roulette-wheel" style={{backgroundPosition: `${backgroundPosition}px`}}>
          <div className="roulette-arrow"></div>
          <div className={isHidden ? "roulette-timer hidden" : "roulette-timer"}>
            {rouletteTimer/1000} seconds
          </div>
        </div>
        <div className="roulette-options">
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