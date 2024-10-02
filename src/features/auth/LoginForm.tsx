import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { zodResolver } from "@hookform/resolvers/zod";

import { FormField } from "../../ui/shared/FormField";
import { SubmitBtn } from "../../ui/shared/SubmitBtn";
import { useLoginMutation } from "../users/userSlice";
import { useEffect } from "react";
import { ForgotPassword } from "./ForgotPassword";

const LoginSchema = z.object({
  email: z.string().min(3),
  password: z.string().min(8),
});

type FormValidation = z.infer<typeof LoginSchema>;

export const LoginForm = () => {
  const [login, { isLoading, error, isSuccess }] = useLoginMutation();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValidation>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormValidation> = async (data) => {
    await login(data).unwrap();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully signed up");
      navigate("/");
    }
    if (error) {
      if ("data" in error) {
        toast.error(error.data?.message || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  }, [isSuccess, error, navigate]);

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-medium text-electricCyan-300"
        >
          Email
        </label>

        <FormField
          control={control}
          name="email"
          type="email"
          placeholder="my@example.com"
        />
        {errors.email && (
          <span className="text-xs text-customRed-400">
            {errors.email.message}
          </span>
        )}
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="text-sm font-medium text-electricCyan-300"
          >
            Password
          </label>
          <ForgotPassword>Forgot password</ForgotPassword>
          {/* <Link */}
          {/*   to="#" */}
          {/*   className="" */}
          {/* > */}
          {/*   Forgot password? */}
          {/* </Link> */}
        </div>

        <FormField
          control={control}
          name="password"
          type="password"
          placeholder="Enter your password"
        />
        {errors.password && (
          <span className="text-xs text-customRed-400">
            {errors.password.message}
          </span>
        )}
      </div>

      <SubmitBtn
        type="submit"
        isLoading={isLoading}
        btnText="Login"
        loadingBtnText="Logging in"
      />
    </form>
  );
};
