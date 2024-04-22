import { Question } from "@/interface/Question.ts";

export interface Quiz {
  id: number;
  title: string;
  type?: string;
  update_at?: string;
  create_at: string;
  questions?: Question[];
}
