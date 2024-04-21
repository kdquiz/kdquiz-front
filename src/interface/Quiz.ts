import { Questions } from "@/interface/Questions.ts";

export interface Quiz {
  id: number;
  title: string;
  type?: string;
  questions?: Questions[];
}
