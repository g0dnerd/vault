import { Enrollment } from './enrollment.interface';

export interface Player {
  draftId: number;
  enrollment?: Enrollment;
}
