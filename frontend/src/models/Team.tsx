import { Student } from './Student';

export interface Team {
  readonly ideaStatus: string;
  readonly students: Student[];
}
