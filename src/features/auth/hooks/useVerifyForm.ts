import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { verifySchema, type VerifyInput } from '../schemas/verifySchema';

export const useVerifyForm = (userId: string) => {
    const methods = useForm<VerifyInput>({
        resolver: zodResolver(verifySchema),
        mode:"all",
        defaultValues: {
            otp: ['', '', '', '', '', '']
        },
    });

    const onSubmit = async (data: VerifyInput) => {
        console.log(data.otp.join(""),userId)
    };

    return { ...methods, onSubmit };
};
