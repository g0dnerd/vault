import { Player } from './player.interface';

export interface Result {
  player1Wins: number;
  player2Wins: number;
  resultConfirmed?: boolean;
  result?: number;
  reportedBy?: Player;
  reportedById?: number;
}
