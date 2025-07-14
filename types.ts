export interface Question {
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
}

export type QuizStatus = 'not-started' | 'in-progress' | 'completed' | 'review' | 'certificate';

export interface User {
  name: string;
  email: string;
  password?: string; // Password is used for registration, but not stored in the currentUser state
  isPro: boolean;
}