export interface Workout {
  id: string | number;
  name?: string;
  title?: string;
  description?: string;
  image?: string;
  thumbnail?: string;
  category?: string | string[];
  categories?: string[];
  equipment?: string | string[];
  difficulty?: string;
  sets?: number | string;
  reps?: string;
  duration?: number | string;
  calories?: number | string;
  rating?: number | string;
  instructions?: string[];
  isDone?: boolean;
}


export const parseNumber = (val?: number | string): number => {
  if (typeof val === "number") return val;
  if (!val) return 0;
  const match = val.toString().match(/\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : 0;
};