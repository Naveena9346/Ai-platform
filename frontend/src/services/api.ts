import axios from 'axios';

export const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: (username: string, password: string) => {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    return api.post('/auth/login', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  },
  register: (data: { username: string; email: string; password: string }) =>
    api.post('/auth/register', data),
  getMe: () => api.get('/users/me'),
};

export const datasetsApi = {
  upload: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/datasets/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  list: () => api.get('/datasets'),
  preview: (id: string) => api.get(`/datasets/${id}`),
};

export const edaApi = {
  getSummary: (datasetId: string) => api.get(`/eda/${datasetId}/summary`),
};

export const mlApi = {
  train: (data: any) => api.post('/ml/train', data),
  listModels: () => api.get('/ml/models'),
  predictSingle: (data: any) => api.post('/ml/predict/single', data),
};

export const gamificationApi = {
  getOverview: () => api.get('/gamification/overview'),
  getLeaderboard: () => api.get('/gamification/leaderboard'),
  listQuests: () => api.get('/quests'),
  submitQuest: (questId: string, modelId: string) =>
    api.post(`/quests/${questId}/submit`, { model_id: modelId }),
};
