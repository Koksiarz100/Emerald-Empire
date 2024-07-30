interface RouletteInfoProps {
  bets: {
    bet: number[];
    user: string[];
    color: string[];
  }
}

const redBets: React.FC<RouletteInfoProps> = ({ bets }) => {
  return bets.bet.map((bet, index) => {
    if(bets.color[index] === 'red') {
      return <span key={index}>{bets.user[index]} - {bet}</span>
    }
  })
}

const greenBets: React.FC<RouletteInfoProps> = ({ bets }) => {
  return bets.bet.map((bet, index) => {
    if(bets.color[index] === 'green') {
      return <span key={index}>{bets.user[index]} - {bet}</span>
    }
  })
}

const blackBets: React.FC<RouletteInfoProps> = ({ bets }) => {
  return bets.bet.map((bet, index) => {
    if(bets.color[index] === 'black') {
      return <span key={index}>{bets.user[index]} - {bet}</span>
    }
  })
}

const RouletteInfo: React.FC<RouletteInfoProps> = ({ bets }) => (
  <div className="roulette-info">
    <div className="red">
      <span className="roulette-info-red">Czerwone</span>
      <div className="roulette-info-players">
        {redBets({ bets })}
      </div>
    </div>
    <div className="green">
      <span className="roulette-info-green">Zielone</span>
      <div className="roulette-info-players">
        {greenBets({ bets })}
      </div>
    </div>
    <div className="black">
      <span className="roulette-info-black">Czarne</span>
      <div className="roulette-info-players">
        {blackBets({ bets })}
      </div>
    </div>
  </div>
);

export default RouletteInfo;