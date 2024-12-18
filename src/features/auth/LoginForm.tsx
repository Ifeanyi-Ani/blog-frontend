import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';
import { motion } from 'framer-motion';

import { ForgotPassword } from './ForgotPassword';
import { FormField } from '../../ui/shared/FormField';
import { SubmitBtn } from '../../ui/shared/SubmitBtn';
import { useLoginMutation } from '../users/userSlice';

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
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormValidation> = async (data) => {
    await login(data).unwrap();
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
    <motion.form
      className="space-y-6"
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-medium text-accent-foreground"
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
          <span className="text-xs text-destructive">
            {errors.email.message}
          </span>
        )}
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="text-sm font-medium text-accent-foreground"
          >
            Password
          </label>
          <ForgotPassword>Forgot password?</ForgotPassword>
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
    </motion.form>
  );
};
