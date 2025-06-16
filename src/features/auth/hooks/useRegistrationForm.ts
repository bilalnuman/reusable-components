import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterInput } from '../schemas/registrationSchema';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useRegister } from '@src/hooks/useAuth';
import toast from 'react-hot-toast';

interface ApiErrorResponse {
    message?: string;
    errors?: Record<string, any[]>;
}

export const useRegisterForm = () => {
    const [showPassword, setShowPassword] = useState<Record<string, string>>({});
    const [confirmPasswordError, setConfirmPasswordError] = useState("")
    const { mutate: registerUser, isPending } = useRegister();
    const methods = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
        mode: "all",
        reValidateMode: 'onChange'
    });
    useEffect(() => {
        const subscription = methods.watch((values) => {
            const { password, confirmPassword } = values;

            if (confirmPassword && password !== confirmPassword) {
                setConfirmPasswordError("Password not matched");
            } else {
                setConfirmPasswordError("");
            }
        });

        return () => subscription.unsubscribe();
    }, [methods]);



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

    const onSubmit = async (data: RegisterInput) => {
        registerUser(data, {
            onSuccess(data) {
                toast.success(data?.data?.message)
                methods.reset()
            },
            onError: (error) => {
                const axiosError = error as AxiosError<ApiErrorResponse>;
                if (axiosError.response?.data?.errors) {
                    const apierrors: any = axiosError.response.data.errors
                    const errors = apierrors?.map((error) => `${error.path?.slice(5).replace("_", " ")}:${error.message}`)
                    toast.error(errors?.join(","))
                } else {
                    console.error(axiosError.message);
                }
            },
        });
    };
    return { ...methods, onSubmit, handleTogglePassword, showPassword, confirmPasswordError, isPending };
};
