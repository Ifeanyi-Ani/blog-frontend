import { Link, useNavigate } from "react-router-dom";
import { Input } from "../ui/shared/Input";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUpMutation } from "../features/users/userSlice";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

const SignupSchema = z.object({
  username: z.string().min(3),
  email: z.string().min(5),
  password: z.string().min(8),
  passwordConfirm: z.string().min(8),
  dob: z.string(),
});

type FormValidation = z.infer<typeof SignupSchema>;

export default function SignupPage() {
  const navigate = useNavigate();
  const [signUp, { isLoading, isError, isSuccess, error }] =
    useSignUpMutation();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValidation>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      dob: "",
    },
  });

  const onSubmit: SubmitHandler<FormValidation> = async (data) => {
    await signUp(data);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Sucessfully signed up");
      navigate("/");
    }
    if (isError) {
      toast.error(error.data.message);
      console.error(error);
    }
  }, [isSuccess, isError]);

  return (
    <div className="mx-auto w-full max-w-md space-y-6 p-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tighter text-customBlue-100 sm:text-4xl md:text-5xl">
          Sign Up
        </h1>
        <p className="text-customBlue-300">Create an account to get started</p>
      </div>
      <div className="space-y-4">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="text-sm font-medium text-customBlue-100"
            >
              Username
            </label>
            <Input
              placeholder="johndoe"
              type="text"
              id="username"
              className="w-full rounded-md border border-customBlue-700 bg-customBlue-900 px-3 py-2 text-sm text-customBlue-100 placeholder-customBlue-500 focus:border-customBlue-500 focus:outline-none focus:ring-1 focus:ring-customBlue-500"
              {...register("username")}
            />
            {errors.username && (
              <span className="text-xs text-red-400">
                {errors.username.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-customBlue-100"
            >
              Email
            </label>
            <Input
              placeholder="m@example.com"
              type="email"
              id="email"
              className="w-full rounded-md border border-customBlue-700 bg-customBlue-900 px-3 py-2 text-sm text-customBlue-100 placeholder-customBlue-500 focus:border-customBlue-500 focus:outline-none focus:ring-1 focus:ring-customBlue-500"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-xs text-red-400">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-customBlue-100"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              className="w-full rounded-md border border-customBlue-700 bg-customBlue-900 px-3 py-2 text-sm text-customBlue-100 placeholder-customBlue-500 focus:border-customBlue-500 focus:outline-none focus:ring-1 focus:ring-customBlue-500"
              {...register("password")}
            />
            {errors.password && (
              <span className="text-xs text-red-400">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="passwordConfirm"
              className="text-sm font-medium text-customBlue-100"
            >
              Retype Password
            </label>
            <Input
              id="passwordConfirm"
              type="password"
              className="w-full rounded-md border border-customBlue-700 bg-customBlue-900 px-3 py-2 text-sm text-customBlue-100 placeholder-customBlue-500 focus:border-customBlue-500 focus:outline-none focus:ring-1 focus:ring-customBlue-500"
              {...register("passwordConfirm")}
            />
            {errors.passwordConfirm && (
              <span className="text-xs text-red-400">
                {errors.passwordConfirm.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="dob"
              className="text-sm font-medium text-customBlue-100"
            >
              Date of Birth
            </label>
            <Input
              id="dob"
              type="date"
              className="w-full rounded-md border border-customBlue-700 bg-customBlue-900 px-3 py-2 text-sm text-customBlue-100 placeholder-customBlue-500 focus:border-customBlue-500 focus:outline-none focus:ring-1 focus:ring-customBlue-500"
              {...register("dob")}
            />
            {errors.dob && (
              <span className="text-xs text-red-400">{errors.dob.message}</span>
            )}
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-customBlue-600 px-4 py-2 text-sm font-medium text-customBlue-100 hover:bg-customBlue-500 focus:outline-none focus:ring-2 focus:ring-customBlue-400 focus:ring-offset-2 focus:ring-offset-customBlue-900"
            disabled={isLoading}
          >
            Sign Up
          </button>
          <button className="w-full rounded-md border border-customBlue-600 bg-customBlue-900 px-4 py-2 text-sm font-medium text-customBlue-100 hover:bg-customBlue-800 focus:outline-none focus:ring-2 focus:ring-customBlue-400 focus:ring-offset-2 focus:ring-offset-customBlue-900">
            Sign Up with Google
          </button>
        </form>
        <div className="text-center text-sm text-customBlue-400">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="text-customBlue-300 hover:text-customBlue-200"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
