import React from 'react'

function Balance({saldo, username} : {saldo: number, username: string}) {
  return (
    <div className="profile-wrapper">
      <span>{username}</span>
      <span>Saldo: {saldo}</span>
    </div>
  )
}

export default Balance