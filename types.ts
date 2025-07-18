export interface Question {
  id: keyof UserAnswers;
  text: string;
  options: string[];
  isMultiSelect?: boolean;
}

export interface UserAnswers {
  occasion: string;
  relationship: string;
  age: string;
  gender: string;
  budget: string;
  interests: string[];
  personality: string;
  lifestyle: string;
  giftStyle: string;
}

export interface GiftSuggestion {
  nombre: string;
  descripcion: string;
  categoria: string;
}