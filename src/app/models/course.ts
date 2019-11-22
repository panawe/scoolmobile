import { Class } from '../models/class';
import { Teacher } from '../models/teacher';
import { Subject } from '../models/subject';
import { Term } from '../models/term';

export class Course {
  id: number;
  subject: Subject;
  classe: Class;
  teacher: Teacher;
  maxMark: number;
  credit: number;
  cost: number;
  duration: number;
  beginDate: Date;
  endDate: Date;
  selected: boolean;
  term: Term;
  sessionType: number = 0;
}