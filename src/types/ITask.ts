export interface ITask {
  id: string;
  title: string;
  description: string;
  status?: 'pending' | 'in-progress' | 'completed';
  deadline?: string;
  createdAt?: string;
}
