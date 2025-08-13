// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
});

export const getTestQuestions = () => api.get('/test');
export const submitTest = (answers) => api.post('/test/submit', { answers });

// (admin endpoints if you need them)
export const getAllQuestions = () => api.get('/questions');
export const createQuestion = (data) => api.post('/questions', data);
export const updateQuestion = (id, data) => api.put(`/questions/${id}`, data);
export const deleteQuestion = (id) => api.delete(`/questions/${id}`);
export const getQuestion = (id) => api.get(`/questions/${id}`);
