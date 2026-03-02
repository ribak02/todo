export type DayKey = string; // "YYYY-MM-DD"

export interface Task {
  id: string;
  dayKey: DayKey;
  title: string;
  description: string;
  completed: boolean;
  order: number;
  createdAt: string; // ISO 8601
}

export type DayStorage = Task[];
