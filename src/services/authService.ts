import apiClient from './apiClient';

export const login = (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password });

export const logout = () => apiClient.post('/auth/logout');

export const getCurrentUser = () =>
    apiClient.get('/auth/me').then(res => res.data);
