import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    login,
    register,
    forgotPassword,
    verifyOtp,
    resetPassword,
} from '../services/authService';


export const useRegister = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: register,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['currentUser'] });
        },
    });
};


export const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: login,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['currentUser'] });
        },
    });
};


export const useForgotPassword = () => {
    return useMutation({
        mutationFn:forgotPassword,
    });
};

export const useVerifyOtp = () => {
    return useMutation({
        mutationFn: ({
            email,
            otp,
        }: {
            email: string;
            otp: string;
        }) => verifyOtp(email, otp),
    });
};


export const useResetPassword = () => {
    return useMutation({
        mutationFn: resetPassword,
    });
};
