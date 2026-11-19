export interface SyllabusProject {
  id: string;
  discipline: string;
  disciplineIcon: string;
  eyebrow: string;
  title: string;
  stack: string;
  description: string;
  highlights: string[];
  tags: string[];
}

export interface Spell {
  id: string;
  name: string;
  type: string;
  skills: string;
  desc: string;
  tags: string[];
  colSpanFull?: boolean;
}

export interface OwlPostRequest {
  name: string;
  email: string;
  message: string;
  botcheck?: string;
}

export interface OwlPostResponse {
  success: boolean;
  message: string;
  totalOwls?: number;
  data?: {
    id?: number | string;
    createdAt?: string;
  };
  errors?: string[];
}
