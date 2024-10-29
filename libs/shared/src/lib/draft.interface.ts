import { Cube } from './cube.interface';
import { Player } from './player.interface';

export interface Draft {
  id: number;
  phaseId: number;
  cubeId: number;
  tableFirst?: number;
  tableLast?: number;
  started?: boolean;
  finished?: boolean;
  seated?: boolean;
  players?: Player[];
  cube: Cube;
}