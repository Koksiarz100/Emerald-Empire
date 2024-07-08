import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

export interface BalanceContextType {
  saldo: number;
  username: string;
  setSaldo: Dispatch<SetStateAction<number>>;
  setUsername: Dispatch<SetStateAction<string>>;
}

const BalanceContext = createContext<BalanceContextType>({
  saldo: 0,
  username: '',
  setSaldo: () => {},
  setUsername: () => {},
});

const useBalance = () => useContext(BalanceContext);

function BalanceProvider({ children }: { children: ReactNode }) {
  const [saldo, setSaldo] = useState(0);
  const [username, setUsername] = useState('');

  return (
    <BalanceContext.Provider value={{ saldo, setSaldo, username, setUsername }}>
      {children}
    </BalanceContext.Provider>
  );
}

function Balance() {
  const { saldo, username } = useContext(BalanceContext);

  return (
    <div className="profile-wrapper">
      <span>{username}</span>
      <span>Saldo: {saldo}</span>
    </div>
  );
}

export { BalanceProvider, Balance, useBalance };