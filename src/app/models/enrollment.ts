import { Student } from '../models/student';
import { Class } from '../models/class';
import { SchoolYear } from '../models/schoolYear';
export class Enrollment {
  id: number;
  enrollmentDate: Date;
  student: Student;
  levelClass: Class;
  schoolYear: SchoolYear;
  error:string;
}