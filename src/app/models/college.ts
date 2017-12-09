import { Level } from '../models/level';
import { Cycle } from '../models/cycle';
export class College {
  id: Number;
  name: string;
  description: string;
  admission: string;
  fees:string;
  duration:number;
  pic:string;
  openDate:Date;
  credit:number;
  levels:Level[];  
  cycle:Cycle;
}