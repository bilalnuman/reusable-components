import TextField from "@src/components/widgets/TextField";
import { Controller } from "react-hook-form";
import Button from "@src/components/widgets/Button";
import Icon from "@src/components/widgets/Icon";
import { useLoginForm } from "../hooks/useLoginForm";

const LoginForm = () => {
    const { control, handleSubmit, onSubmit, handleTogglePassword, isPending, showPassword } = useLoginForm();

    return (
        <div className="flex items-center justify-center min-h-screen py-7">
            <form className="w-[500px] shadow-lg rounded-lg border p-4" onSubmit={handleSubmit(onSubmit)} noValidate>
                <h2 className="pb-5 font-semibold text-xl">Registration</h2>
                <fieldset className="flex flex-col gap-4">
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Enter email"
                                type="email"
                                isFloating={false}
                                error={fieldState.error?.message}
                                required
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                required
                                label="Enter password"
                                type={showPassword?.["password"] ? "text" : "password"}
                                isFloating={false}
                                error={fieldState.error?.message}
                                icon={<Icon name={showPassword?.["password"] ? "hideEye" : "fillEye"} />}
                                handleTogglePassword={handleTogglePassword}
                            />
                        )}
                    />
                </fieldset>
                <Button loading={isPending} label="Login" className="w-full mt-4" type="submit" />
            </form>
        </div>
    );
};

export default LoginForm