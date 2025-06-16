import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import {useState } from 'react';
import { useRegister } from '@src/hooks/useAuth';
import toast from 'react-hot-toast';
import { loginSchema, type LoginInput } from '../schemas/loginSchema';

interface ApiErrorResponse {
    message?: string;
    errors?: Record<string, any[]>;
}

export const useLoginForm = () => {
    const [showPassword, setShowPassword] = useState<Record<string, string>>({});
    const { mutate: registerUser, isPending } = useRegister();
    const methods = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
        mode: "all",
        reValidateMode: 'onChange',
    });
    const handleTogglePassword = (name: string) => {
        setShowPassword(prev => {
            const newState = { ...prev };
            if (newState[name]) {
                delete newState[name];
            } else {
                newState[name] = name;
            }
            return newState;
        });
    };

    const onSubmit = async (data: LoginInput) => {
        registerUser(data, {
            onSuccess(data) {
                toast.success(data?.data?.message)
                methods.reset()
            },
            onError: (error) => {
                const axiosError = error as AxiosError<ApiErrorResponse>;
                if (axiosError.response?.data?.errors) {
                    const apierrors: any = axiosError.response.data.errors
                    const errors = apierrors?.map((error) => `${error.path?.slice(5).replace("_"," ")}:${error.message}`)
                    toast.error(errors?.join(","))
                } else {
                    console.error(axiosError.message);
                }
                methods.reset()
                setShowPassword({})
            },
        });
    };
    return { ...methods, onSubmit, handleTogglePassword, showPassword, isPending };
};
