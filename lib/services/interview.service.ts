import { api } from '../api';

export interface Interview {
  id: string;
  role: string;
  questions: Array<{
    question: string;
    answer: string;
    feedback: string;
    score: number;
  }>;
  overallScore: number;
  summary: string;
  createdAt: string;
}

export const interviewService = {
  async getAll(): Promise<Interview[]> {
    const { data } = await api.get('/interviews');
    return data;
  },

  async getOne(id: string): Promise<Interview> {
    const { data } = await api.get(`/interviews/${id}`);
    return data;
  },

  async start(role: string, cvId: string): Promise<Interview> {
    const { data } = await api.post('/interviews/start', { role, cvId });
    return data;
  },

  async submitAnswer(
    interviewId: string,
    questionIndex: number,
    answer: string
  ): Promise<Interview> {
    const { data } = await api.post(`/interviews/${interviewId}/answer`, {
      questionIndex,
      answer,
    });
    return data;
  },
};