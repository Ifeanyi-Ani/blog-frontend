import { Link, useNavigate } from "react-router-dom";
import { Input } from "../ui/shared/Input";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "../features/users/userSlice";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

const LoginSchema = z.object({
  email: z.string().min(3),
  password: z.string().min(8),
});

type FormValidation = z.infer<typeof LoginSchema>;

export default function LoginPage() {
  const [login, { isLoading, isError, isSuccess, error }] = useLoginMutation();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<FormValidation>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormValidation> = async (data) => {
    if (!data.email && !data.password) {
      return toast.error("Please fill the necessary field");
    }
    await login(data);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully logged in");
      // return navigate("/");
    }

    if (isError) {
      toast.error(error.data.message);
    }
  }, [isSuccess, isError]);

  return (
    <div className="mx-auto w-full max-w-md space-y-6 p-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tighter text-customBlue-100 sm:text-4xl md:text-5xl">
          Login
        </h1>
        <p className="text-customBlue-300">
          Enter your credentials below to login to your account
        </p>
      </div>
      <div className="space-y-4">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-customBlue-100"
              >
                Password
              </label>
              <Link
                to="#"
                className="text-sm text-customBlue-400 hover:text-customBlue-300"
              >
                Forgot password?
              </Link>
            </div>
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
          <button
            type="submit"
            className="w-full rounded-md bg-customBlue-600 px-4 py-2 text-sm font-medium text-customBlue-100 hover:bg-customBlue-500 focus:outline-none focus:ring-2 focus:ring-customBlue-400 focus:ring-offset-2 focus:ring-offset-customBlue-900"
          >
            Login
          </button>
          <button className="w-full rounded-md border border-customBlue-600 bg-customBlue-900 px-4 py-2 text-sm font-medium text-customBlue-100 hover:bg-customBlue-800 focus:outline-none focus:ring-2 focus:ring-customBlue-400 focus:ring-offset-2 focus:ring-offset-customBlue-900">
            Login with Google
          </button>
        </form>
        <div className="text-center text-sm text-customBlue-400">
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            className="text-customBlue-300 hover:text-customBlue-200"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
