'use server'

export async function getWinningPosition() {
  var randomPosition = -((Math.floor(Math.random() * 1025) + 1024));
  console.log("Winning position: " + randomPosition);
  return randomPosition;
}