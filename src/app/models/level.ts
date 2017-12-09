import { College } from '../models/college';
export class Level {
  id: number;
  name: string;
  description: string;
  college: College; 
  admission: string;
  fees: string;
  duration: number;
  pic: string;
  openDate: Date;
}