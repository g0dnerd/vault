export interface AuthInterface {
  token: string;
  isAdmin?: boolean;
}

export interface AuthPayload {
  email: string;
  password: string;
  username?: string;
}
