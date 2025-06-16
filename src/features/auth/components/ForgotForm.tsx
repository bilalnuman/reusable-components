import TextField from "@src/components/widgets/TextField";
import { Controller } from "react-hook-form";
import Button from "@src/components/widgets/Button";
import { useLoginForm } from "../hooks/useLoginForm";
import { useForgotForm } from "../hooks/useForgotForm";

const ForgotForm = () => {
  const { control, handleSubmit, onSubmit, isPending } = useForgotForm();

  return (
    <div className="flex items-center justify-center min-h-screen py-7">
      <form className="w-[500px] shadow-lg rounded-lg border p-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <h2 className="pb-5 font-semibold text-xl">Forgot password</h2>
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
        </fieldset>
        <Button loading={isPending} label="Login" className="w-full mt-4" type="submit" />
      </form>
    </div>
  );
};

export default ForgotForm
