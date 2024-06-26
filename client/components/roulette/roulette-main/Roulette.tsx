import React, {useState, useEffect} from 'react'

import './roulette.scss'

import Balance from '@/components/balance/Balance';

export default function Roulette() {
  // Betowanie
  const [rouletteTimer, setRouletteTimer] = useState<number>(0);
  const [bets, setBets] = useState<{red: number[], green: number[], black: number[]}>({red: [], green: [], black: []});
  const [bet, setBet] = useState<number>(0);
  // Ruletka
  const [backgroundPosition, setBackgroundPosition] = useState<number>(8192); // Pozycja ruletki
  const [position, setPosition] = useState<number>(0); // Pozycja wygrywająca
  const [isSpinning, setIsSpinning] = useState<boolean>(true);
  const [decrement, setDecrement] = useState<number>(256);
  const [startPosition, setStartPosition] = useState<number>(8192); // Pozycja startowa
  const [roulettePosition, setRoulettePosition] = useState<number>(8192); // Pozycja ruletki
  const [isWinningPositionSet, setIsWinningPositionSet] = useState<boolean>(false);

  const [saldo, setSaldo] = useState<number>(10000);
  const [username, setUsername] = useState<string>('Koksiarz');

  useEffect(() => { // Inicjalizacja ruletki
    if (backgroundPosition > position && isSpinning === true) {
      spinning();
    }
    if(backgroundPosition <= position) {
      resetRoulette();
    }
  }, [backgroundPosition, position, isSpinning]);

  useEffect(() => { // Timer ruletki
    if (rouletteTimer > 0) {
      rouletteTimerOperation();
    }
    if(rouletteTimer === 0) {
      setIsSpinning(true);
    }
  }, [rouletteTimer]);

  function randomizePosition() { // Losowanie pozycji
    var random = Math.floor(Math.random() * 1025);
    console.log("Winning position: " + -random);
    return random;
  }

  function rouletteTimerOperation() { // Timer ruletki
    const timer = setTimeout(() => {
      setRouletteTimer(rouletteTimer - 100);
    }, 100);
    return () => clearTimeout(timer);
  }

  function resetRoulette() { // Resetowanie ruletki
    checkWinningPosition();
    console.log("Resetting roulette!");
    const timer = setTimeout(() => {
      setDecrement(256);
      setIsSpinning(false);
      setPosition(0);
      setBackgroundPosition(8192);
      setStartPosition(8192);
      setIsWinningPositionSet(false);
      setBets({red: [], green: [], black: []});
      setRouletteTimer(10000);
    }, 3000);
    return () => clearTimeout(timer);
  }

  function spinning() { // Kręcenie ruletką
    setIsSpinning(true);
    const timer = setTimeout(() => {
      setBackgroundPosition(backgroundPosition - decrement);
      if (backgroundPosition === 1024 && isWinningPositionSet === false) {
        const newPosition = -(randomizePosition() + 1024);
        console.log("New position: " + newPosition);
        setPosition(newPosition);
        setStartPosition(newPosition);
        setDecrement(64);
        setIsWinningPositionSet(true);
      }
      if (isWinningPositionSet === true && backgroundPosition <= (startPosition + Math.abs(startPosition / 20))) {
        setDecrement(1);
        console.log("Decrementing!" + decrement);
      }
    }, 100);
    return () => clearTimeout(timer);
  }

  function checkWinningPosition() { // Sprawdzanie wygrywającej pozycji
    let positivePosition = Math.abs(position);
    if ((positivePosition >= 0 + 1024 && positivePosition < 146 + 1024) || (positivePosition >= 292 + 1024 && positivePosition < 438 + 1024) || (positivePosition > 730 + 1024 && positivePosition <= 876 + 1024)) {
      console.log("Czerwone wygrywają!");
      if (bets.red.length > 0) {
        let totalWin = bets.red.reduce((acc, bet) => acc + bet * 2, 0);
        setSaldo(saldo + totalWin);
      }
    }
    else if (positivePosition > 438 && positivePosition <= 584) {
      console.log("Zielone wygrywają!");
      if (bets.green.length > 0) {
        let totalWin = bets.green.reduce((acc, bet) => acc + bet * 14, 0);
        setSaldo(saldo + totalWin);
      }
    }
    else if ((positivePosition >= 146 && positivePosition < 292) || (positivePosition > 584 && positivePosition <= 730) || (positivePosition > 876 && positivePosition <= 1024)) {
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
      <Balance saldo={saldo} username={username} />
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
    </>
  )
}