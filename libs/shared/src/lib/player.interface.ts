import { Enrollment } from './enrollment.interface';

export interface Player {
  id: number;
  draftId: number;
  checkedIn: boolean;
  checkedOut: boolean;
  enrollment?: Enrollment;
}
