import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';

import checkCredentials from '../utility/auth/actions/checkCredentials';

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

const useBalanceContext = () => useContext(BalanceContext);

function BalanceProvider({ children }: { children: ReactNode }) {
  const [saldo, setSaldo] = useState(1000);
  const [username, setUsername] = useState('');

  useEffect(() => {
    async function fetchUsername() {
      const username = checkCredentials();
      if (username) {
        setUsername(username);
      }
    }
  
    fetchUsername();
  }, []);

  return (
    <BalanceContext.Provider value={{ saldo, setSaldo, username, setUsername }}>
      {children}
    </BalanceContext.Provider>
  );
}

export { BalanceProvider, useBalanceContext };