import { api } from '../api';

export interface Challenge {
  id: string;
  title: string;
  difficulty: string;
  type: string;
}

export interface TrainingProgress {
  id: string;
  challengeId: string;
  challengeType: string;
  status: string;
  score: number;
  attempts: number;
  createdAt: string;
}

export const trainingService = {
  async getChallenges(): Promise<Challenge[]> {
    const { data } = await api.get('/training/challenges');
    return data;
  },

  async getProgress(): Promise<TrainingProgress[]> {
    const { data } = await api.get('/training/progress');
    return data;
  },

  async submitChallenge(
    challengeId: string,
    solution: string
  ): Promise<TrainingProgress> {
    const { data } = await api.post('/training/submit', {
      challengeId,
      solution,
    });
    return data;
  },
};