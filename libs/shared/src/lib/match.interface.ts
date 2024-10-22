import { Player } from "./tournaments.interface";

export interface Match {
  game: {
    id: number;
    roundId: number;
    player1Id: number;
    player2Id: number;
    tableNumber: number;
    player1: Player;
    player2: Player;
  },
  opponent?: Player,
  result: Result,
}

export interface Result {
  player1Wins: number,
  player2Wins: number,
  confirmed?: boolean,
  result?: number,
  matchId: number
}
