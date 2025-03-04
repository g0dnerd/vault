import { User } from './user.interface';

export interface Cube {
  id: number;
  creator?: User;
  name: string;
  cardNumber: number;
  description?: string;
  url: string;
}
