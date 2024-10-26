import { User } from './user.interface';

export interface Cube {
  creator?: User;
  name: string;
  cardNumber: number;
  description?: string;
}
