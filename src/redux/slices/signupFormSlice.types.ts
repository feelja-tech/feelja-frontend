export interface SignupFormState {
  height: number;
  politicPreferences: string[];
  religiousPreferences: string[];
  employment: string;
  educationSubject: string;
  educationLevel: string;
  name: string;
  gender: string;
  age: number;
  location: Record<string, number>;
}
