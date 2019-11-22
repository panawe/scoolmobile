import { User } from "./user";

export class Payment{  
  paymentDate:Date;
  amount:number;
  rebate:number;
  reference: string;
  modifiedBy:number;
  caissier: User;
}