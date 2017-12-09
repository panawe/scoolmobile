import { User } from '../models/user';

export class Student {
  id:         number;
  matricule:  string;
  registrationDate:  Date;
  status:     boolean;
  user:       User;
}