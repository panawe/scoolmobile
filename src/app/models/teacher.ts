import { User } from '../models/user';
import { Position } from '../models/position';
import { Department } from './department';

export class Teacher {
  id:         number;
  matricule:  string;
  comments:   string;
  resume:     string;
  hiredDate:  Date;
  status:     boolean;
  user:       User;
  position:   Position;
  name:       string;
  department: Department;
}