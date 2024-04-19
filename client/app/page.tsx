'use client'

import React, { useState, useEffect } from "react";

import "./styles.scss";

export default function Home() {
  const [backgroundPosition, setBackgroundPosition] = useState(5000);
  const [position, setPosition] = useState(5000);

  useEffect(() => {
    if (backgroundPosition > position) {
      const timer = setTimeout(() => {
        setBackgroundPosition(backgroundPosition - 100);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [backgroundPosition, position]);

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