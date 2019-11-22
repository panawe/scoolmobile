import { User } from '../models/user';
export class Cico {
  id: Number;
  ci: Date;
  co: Date;
  status: number = 0;
  user: User;
}