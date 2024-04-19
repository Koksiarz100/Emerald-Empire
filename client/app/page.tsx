'use client'

import React, { useState, useEffect } from "react";

import "./styles.scss";

export default function Home() {
  const [backgroundPosition, setBackgroundPosition] = useState(5000);
  const [position, setPosition] = useState(5000);

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
    }, 5000);
    return () => clearTimeout(timer);
  }, [position, backgroundPosition]);

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
        </div>
        <button className="test-button" onClick={() => spin()}>Spin</button>
      </div>
    </main>
  );
}