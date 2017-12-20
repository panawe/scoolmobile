import {User} from './user';
export class SDMessage {
  id: number;
  recipient: User;
  sender: User;
  body: string;
  subject: string;
  status: number;
  msgType: number; 
  createDate: Date;
  modDate: Date;
  shortMessage: string; 
}