import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema, type RegistrationFormValues } from '../schemas/registrationSchema';

export const useRegistrationForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<RegistrationFormValues>({
        resolver: zodResolver(registrationSchema),
    });

    const onSubmit = (data: RegistrationFormValues) => {
        console.log('Registering user:', data);
        reset();
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        errors,
        isSubmitting
    };
};
