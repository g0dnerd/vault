import { Player } from './player.interface';
import { Result } from './result.interface';

export interface Match {
  game: {
    id: number;
    roundId: number;
    player1Id: number;
    player2Id: number;
    tableNumber: number;
    player1: Player;
    player2: Player;
  };
  opponent?: Player;
  result: Result;
}
