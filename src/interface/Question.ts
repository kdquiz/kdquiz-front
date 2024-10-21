export interface Question {
  id: number;
  content: string;
  ord: number;
  shortAnswer: "string";
  type: number;
  options: {
    useHint: boolean;
    hintTime: number;
    hintContent?: string;
    useAiFeedback: boolean;
    aiQuestion?: string;
    commentary?: string;
    score: 0;
    time: 0;
  };
  choices: Choice[];
  uploadFileNames: { fileName: string }[];
}

export interface Choice {
  id: number;
  content: string;
  isCorrect: boolean;
  shortAnswer: string;
}
