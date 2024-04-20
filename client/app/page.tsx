'use client'

import React, { useState, useEffect } from "react";

import "./styles.scss";

export default function Home() {
  const [backgroundPosition, setBackgroundPosition] = useState(5000);
  const [position, setPosition] = useState(5000);
  const [rouletteTimer, setRouletteTimer] = useState(0);
  const [isHidden, setIsHidden] = useState(true);
  const [players, setPlayers] = useState([]);

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
      setPosition(5000);
      setBackgroundPosition(5000);
      setIsHidden(false);
      setRouletteTimer(5000);
    }, 6000);
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

  const spin = () => {
    setPosition(position - 5000);
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
            <input className="roulette-bet" type="number" placeholder="Kwota zakładu" />
          </div>
          <div className="roulette-buttons">
            <button className="roulette-option red" onClick={spin}>Czerwone</button>
            <button className="roulette-option green" onClick={spin}>Zielone</button>
            <button className="roulette-option black" onClick={spin}>Czarne</button>
          </div>
        </div>
        <div className="roulette-info">
          <div className="roulette-info-red">
            <span>Czerwone</span>
            <div className="roulette-info-players">
              <div className="roulette-info-player"><span>Gracz 1 - 1000</span></div>
            </div>
          </div>
          <div className="roulette-info-green">
            <span>Zielone</span>
            <div className="roulette-info-players">
              <div className="roulette-info-player"><span>Gracz 1 - 1000</span></div>
            </div>
          </div>
          <div className="roulette-info-black">
            <span>Czarne</span>
            <div className="roulette-info-players">
              <div className="roulette-info-player"><span>Gracz 1 - 1000</span></div>
              <div className="roulette-info-player"><span>Gracz 2 - 1000</span></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}