import { Player } from './player.interface';
import { Round } from './round.interface';

export interface Match {
  id: number;
  roundId: number;
  player1Id: number;
  player1: Player | null;
  player2Id: number;
  player2: Player | null;
  tableNumber: number;
  player1Wins: number | null;
  player2Wins: number | null;
  result: number | null;
  reportedById: number | null;
  reportedBy: Player | null;
  resultConfirmed: boolean;
  round: Round | null;
}
