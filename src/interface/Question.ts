export interface Question {
  content: string;
  options: {
    useHint: boolean;
    hintTime: number;
    hintContent?: string;
    useAiFeedback: boolean;
    aiQuestion?: string;
    commentary?: string;
    score: 0;
  };
  choices: Choice[];
}

export interface Choice {
  id: number;
  content: string;
  isCorrect: boolean;
  shortAnswer: string;
}
