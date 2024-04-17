'use client'

import React, { useState } from "react";

import "./styles.scss";

export default function Home() {
  return (
    <main>
      <h1>Emerald Empire</h1>
      <p>Casino online</p>
      <div className="roulette-wrapper">
        <div className="roulette-wheel">

        </div>
        <button className="test-button">Spin</button>
      </div>
    </main>
  );
}