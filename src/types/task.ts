export type TaskStatus = 'active' | 'done';

export type TaskPreview = {
  id: number;
  text: string;
  status: TaskStatus;
  created: string;
};
