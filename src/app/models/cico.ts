import { User } from '../models/user';
export class Cico {
  id: Number;
  ci: Date;
  co: Date;
  duration: number;
  matricule: string;
  status: number = 0;
  user: User;
  name: string;
  reason: string;
  phone: string;
  visitee: string;
}