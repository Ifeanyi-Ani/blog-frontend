import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';

import { FormField } from '../../ui/shared/FormField';
import { SubmitBtn } from '../../ui/shared/SubmitBtn';
import { useSignUpMutation } from '../users/userSlice';

const SignupSchema = z.object({
  username: z.string().min(3),
  email: z.string().min(5),
  password: z.string().min(8),
  passwordConfirm: z.string().min(8),
  dob: z.string(),
});

type FormValidation = z.infer<typeof SignupSchema>;

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [signUp, { isLoading, isSuccess, error }] = useSignUpMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValidation>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      dob: '',
    },
  });

  const onSubmit: SubmitHandler<FormValidation> = async (data) => {
    await signUp(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Successfully signed up');
      navigate('/');
    }
    if (error) {
      if ('data' in error) {
        toast.error(error.data?.message || 'An error occurred');
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  }, [isSuccess, error, navigate]);
  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <label
          htmlFor="username"
          className="text-sm font-medium text-electricCyan-300"
        >
          Username
        </label>
        <FormField
          name="username"
          type="text"
          placeholder="levia"
          control={control}
        />
        {errors.username && (
          <span className="text-xs text-customRed-400">
            {errors.username.message}
          </span>
        )}
      </div>
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-medium text-electricCyan-300"
        >
          Email
        </label>
        <FormField
          name="email"
          type="email"
          control={control}
          placeholder="m@example.com"
        />
        {errors.email && (
          <span className="text-xs text-customRed-400">
            {errors.email.message}
          </span>
        )}
      </div>
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-sm font-medium text-electricCyan-300"
        >
          Password
        </label>
        <FormField
          name="password"
          type="password"
          control={control}
          placeholder="Enter password"
        />
        {errors.password && (
          <span className="text-xs text-customRed-400">
            {errors.password.message}
          </span>
        )}
      </div>
      <div className="space-y-2">
        <label
          htmlFor="passwordConfirm"
          className="text-sm font-medium text-electricCyan-300"
        >
          Confirm Password
        </label>
        <FormField
          name="passwordConfirm"
          type="password"
          control={control}
          placeholder="Re-type your password"
        />
        {errors.passwordConfirm && (
          <span className="text-xs text-customRed-400">
            {errors.passwordConfirm.message}
          </span>
        )}
      </div>
      <div className="space-y-2">
        <label
          htmlFor="dob"
          className="text-sm font-medium text-electricCyan-300"
        >
          Date of Birth
        </label>
        <FormField name="dob" type="date" control={control} />
        {errors.dob && (
          <span className="text-xs text-customRed-400">
            {errors.dob.message}
          </span>
        )}
      </div>
      <SubmitBtn
        type="submit"
        isLoading={isLoading}
        btnText="Sign Up"
        loadingBtnText="Signing Up..."
      />
    </form>
  );
};
