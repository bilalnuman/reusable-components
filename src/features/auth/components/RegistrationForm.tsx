import TextField from "@src/components/widgets/TextField";
import { useRegisterForm } from "../hooks/useRegistrationForm";
import { Controller } from "react-hook-form";
import Button from "@src/components/widgets/Button";
import Icon from "@src/components/widgets/Icon";
import Select from "@src/components/widgets/Select";
import TextArea from "@src/components/widgets/Textarea";

const RegistrationForm = () => {
    const { control, handleSubmit, onSubmit, showPassword, handleTogglePassword, confirmPasswordError, isPending } = useRegisterForm();
    return (
        <div className="flex items-center justify-center min-h-screen py-7">
            <form className="w-[500px] shadow-lg rounded-lg border p-4" onSubmit={handleSubmit(onSubmit)} noValidate>
                <h2 className="pb-5 font-semibold text-xl">Registration</h2>
                <fieldset className="flex flex-col gap-3">
                    <Controller
                        name="name"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Enter name"
                                type="text"
                                required
                                isFloating
                                error={fieldState.error?.message}
                            />
                        )}
                    />
                    <Controller
                        name="email"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Enter email"
                                type="email"
                                isFloating
                                error={fieldState.error?.message}
                                required
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                required
                                label="Enter password"
                                type={showPassword?.["password"] ? "text" : "password"}
                                error={fieldState.error?.message}
                                icon={<Icon name={showPassword?.["password"] ? "hideEye" : "fillEye"} />}
                                handleTogglePassword={handleTogglePassword}
                            />
                        )}
                    />
                    <Controller
                        name="confirmPassword"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                required
                                label="Retype password"
                                type={showPassword?.["confirmPassword"] ? "text" : "password"}
                                error={fieldState.error?.message ?? confirmPasswordError}
                                icon={<Icon name={showPassword?.["confirmPassword"] ? "hideEye" : "fillEye"} />}
                                handleTogglePassword={handleTogglePassword}
                            />
                        )}
                    />
                    <Controller
                        name="number"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                required
                                label="Enter number"
                                type="text"
                                error={fieldState.error?.message}
                            />
                        )}
                    />
                    <Controller
                        name="role_id"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Select
                                {...field}
                                label="User role"
                                required
                                options={[{ value: "1", label: "Admin" }, { value: "2", label: "User" }]}
                                error={fieldState.error?.message}
                                placeholder="Enter number"
                            />
                        )}
                    />
                    <Controller
                        name="note"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextArea
                                {...field}
                                required
                                label="Write note"
                                error={fieldState.error?.message}
                            />
                        )}
                    />
                </fieldset>
                <Button loading={isPending} label="Register" className="w-full mt-4" type="submit" />
            </form>
        </div>
    );
};

export default RegistrationForm