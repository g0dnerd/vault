import { User } from "./user.interface";

export interface Tournament {
  id?: number;
  name: string;
  public: boolean;
  playerCapacity: number;
  description?: string | null;
};

export interface Enrollment {
  id?: number;
  tournament?: Tournament;
  tournamentId: number;
  userId: number;
  user?: User;
};

export interface Draft {
  id: number;
  phaseId: number;
  cubeId: number;
  tableFirst?: number;
  tableLast?: number;
  started?: boolean;
  finished?: boolean;
  seated?: boolean;
  players?: Player[]
}

export interface CreateEnrollmentDto {
  tournamentId: number;
  userId: number;
}

export interface Player {
  draftId: number;
  enrollment: Enrollment;
}
