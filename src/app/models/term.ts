import { TermGroup } from './termGroup';

export class Term {
  id: number;
  name: string;
  showFinalRank: boolean;
  code: string;
  description: string;
  termGroup: TermGroup;
}