import { useVerifyForm } from '../hooks/useVerifyForm';
import { Controller } from 'react-hook-form';
import Button from '@src/components/widgets/Button';
import { OTPInput } from '@src/components/widgets/OTPInput/OTPInput';

const VerifyForm = () => {
    const userId: string = '1';
    const { control, handleSubmit, formState, onSubmit } = useVerifyForm(userId);
    return (
        <div className="flex items-center justify-center min-h-screen py-7">
            <form className="w-[500px] shadow-lg rounded-lg border p-4" onSubmit={handleSubmit(onSubmit)} noValidate>
                <h2 className="pb-5 font-semibold text-xl">OTP Form</h2>
                <Controller
                    name="otp"
                    control={control}
                    render={({ field }) => (
                        <OTPInput
                            {...field}
                            value={field.value}
                            onChange={field.onChange}
                            error={!Object.keys(formState.errors).length ? "" : "Otp required"}
                        />
                    )}
                />

                <Button label="Verify OTP" className="w-full mt-4" type="submit" />
            </form>
        </div>
    );
};

export default VerifyForm;
