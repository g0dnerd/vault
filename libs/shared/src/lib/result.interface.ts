import { Player } from './player.interface';

export interface Result {
  player1Wins: number;
  player2Wins: number;
  confirmed?: boolean;
  result?: number;
  matchId: number;
  reportedBy?: Player;
}
