export interface QuizSubmission {
  name: string;
  email: string;
  phone: string;
  profile: 'alto' | 'medio' | 'baixo';
  quizAnswers: number[];
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}