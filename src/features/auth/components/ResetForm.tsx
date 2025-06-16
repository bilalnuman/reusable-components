import TextField from "@src/components/widgets/TextField";
import { Controller } from "react-hook-form";
import Button from "@src/components/widgets/Button";
import Icon from "@src/components/widgets/Icon";
import { useResetForm } from "../hooks/useResetForm";

const ResetForm = () => {
  const { control, handleSubmit, onSubmit, showPassword, handleTogglePassword, confirmPasswordError, isPending } = useResetForm();

  return (
    <div className="flex items-center justify-center min-h-screen py-7">
      <form className="w-[500px] shadow-lg rounded-lg border p-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <h2 className="pb-5 font-semibold text-xl">Reset password</h2>
        <fieldset className="flex flex-col gap-4">
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
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                required
                label="Retype password"
                type={showPassword?.["confirmPassword"] ? "text" : "password"}
                isFloating={false}
                error={fieldState.error?.message ?? confirmPasswordError}
                icon={<Icon name={showPassword?.["confirmPassword"] ? "hideEye" : "fillEye"} />}
                handleTogglePassword={handleTogglePassword}
              />
            )}
          />
        </fieldset>
        <Button loading={isPending} label="Reset" className="w-full mt-4" type="submit" />
      </form>
    </div>
  );
};

export default ResetForm
