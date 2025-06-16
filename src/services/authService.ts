import type { RegisterInput } from '@src/features/auth/schemas/registrationSchema';
import apiClient from './apiClient';
import type { LoginInput } from '@src/features/auth/schemas/loginSchema';
import type { ForgotInput } from '@src/features/auth/schemas/forgotSchema';
import type { ResetInput } from '@src/features/auth/schemas/resetSchema';

export const register = (data: RegisterInput) => apiClient.post('/auth/register', data);

export const login = (data:LoginInput) =>
    apiClient.post('/auth/login',data);


export const forgotPassword = (data:ForgotInput) =>
    apiClient.post('/auth/forgot',data);

export const verifyOtp = (email: string, otp: string) =>
    apiClient.post('/auth/verify-otp', { email, otp });

export const resetPassword = (data:ResetInput) => apiClient.post('/auth/reset-password', data);
