export enum Role {
  Player = 'PLAYER',
  Admin = 'ADMIN',
}

export interface User {
  email: string;
  username: string;
  roles?: Role[];
  profilePicture?: string;
}
