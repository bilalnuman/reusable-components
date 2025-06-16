import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useRegister } from '@src/hooks/useAuth';
import { resetSchema, type ResetInput } from '../schemas/resetSchema';

interface ApiErrorResponse {
    message?: string;
    errors?: Record<string, any[]>;
}

export const useResetForm = () => {
    const [showPassword, setShowPassword] = useState<Record<string, string>>({});
    const [confirmPasswordError, setConfirmPasswordError] = useState("")
    const { mutate: registerUser, isPending } = useRegister();
    const methods = useForm<ResetInput>({
        resolver: zodResolver(resetSchema),
        mode: "all",
        reValidateMode: 'onChange',
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

    const onSubmit = async (data: ResetInput) => {
        console.log(data)
    };
    return { ...methods, onSubmit, handleTogglePassword, showPassword, confirmPasswordError, isPending };
};
