'use client'

import React, { useState, useEffect } from "react";

import "./styles.scss";

import Roulette from "@/components/roulette/roulette-main/Roulette";

export default function Home() {
  return (
    <main>
      <Roulette />
    </main>
  );
}