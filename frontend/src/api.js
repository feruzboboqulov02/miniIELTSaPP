import axios from 'axios';

const API_BASE = 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_BASE,
});

// Test endpoints
export const getTestQuestions = () => api.get('/test');
export const submitTest = (answers) => api.post('/test/submit', { answers });

// Admin endpoints
export const getAllQuestions = () => api.get('/questions');
export const createQuestion = (questionData) => api.post('/questions', questionData);
export const updateQuestion = (id, questionData) => api.put(`/questions/${id}`, questionData);
export const deleteQuestion = (id) => api.delete(`/questions/${id}`);
export const getQuestion = (id) => api.get(`/questions/${id}`);