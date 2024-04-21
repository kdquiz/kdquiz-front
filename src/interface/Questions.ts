export interface Questions {
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

interface Choice {
  content: string;
  isCorrect: boolean;
}
