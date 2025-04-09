import { ITask } from "./ITask";

export interface ISprint {
  id?: string;
  title: string;
  startDate: string;
  closingDate: string;
  tasks: ITask[];
}
