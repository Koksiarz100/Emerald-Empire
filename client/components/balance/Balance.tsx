import React from 'react';

import { useBalanceContext } from './BalanceContext';

export default function Balance() {
  const { saldo, username } = useBalanceContext();

  return (
    <div className="profile-wrapper">
      <span>{username}</span>
      <span>Saldo: {saldo}</span>
    </div>
  );
}