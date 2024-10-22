export enum Role {
  Player = 'PLAYER',
  Admin = 'ADMIN',
}

export interface User {
  id: number;
  username: string;
  email: string;
  password?: string;
  token?: string;
  roles?: Role[];
}
