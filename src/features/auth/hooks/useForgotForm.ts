import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotSchema, type ForgotInput } from '../schemas/forgotSchema';
import { useForgotPassword} from '@src/hooks/useAuth';
import toast from 'react-hot-toast';

export const useForgotForm = () => {
    const methods = useForm<ForgotInput>({
        resolver: zodResolver(forgotSchema),
    });
    const { mutate: forgotPassword, isPending } = useForgotPassword();

    const onSubmit = async (data: ForgotInput) => {
        forgotPassword(data, {
            onSuccess(data) {
                toast.success(data.data.message)
            },
            onError(error) {
                console.log(error)
            },
        })
    };

    return { ...methods, onSubmit, isPending };
};
