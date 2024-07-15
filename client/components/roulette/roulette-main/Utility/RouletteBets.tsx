interface BetInfoProps {
  color: string;
  bets: number[];
}

const BetInfo: React.FC<BetInfoProps> = ({ color, bets }) => (
  <div className={`roulette-info-${color}`}>
    <span>{color.charAt(0).toUpperCase() + color.slice(1)}</span>
    <div className="roulette-info-players">
      {bets.map((bet, index) => (
        <div className="roulette-info-player" key={index}>
          <span>Gracz {index + 1} - {bet}</span>
        </div>
      ))}
    </div>
  </div>
);

interface RouletteInfoProps {
  bets: Record<string, number[]>;
}

const RouletteInfo: React.FC<RouletteInfoProps> = ({ bets }) => (
  <div className="roulette-info">
    {Object.entries(bets).map(([color, bets]) => (
      <BetInfo key={color} color={color} bets={bets} />
    ))}
  </div>
);

export default RouletteInfo;