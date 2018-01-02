import { SchoolYear } from './schoolYear';
import { ExamType } from './examType';
import { Course } from './course';
import { Term } from './term';
export class Exam {
  id: number;
  name: string;
  examDate: Date;
  schoolYear: SchoolYear;
  examType: ExamType;
  term:Term;
  course: Course;
  ratio: number;
  maxMark: number;
  publishMarks: boolean;
  evaluationType: number;
  modifiedBy:number;
  error:string;
}
