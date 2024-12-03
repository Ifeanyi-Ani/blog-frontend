import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Fieldset, Label } from '@headlessui/react';

import { FormField } from '../../ui/shared/FormField';
import { SubmitBtn } from '../../ui/shared/SubmitBtn';
import { useSignUpMutation } from '../users/userSlice';

const SignupSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
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
    <motion.form
      className="space-y-6"
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Fieldset className="space-y-2">
        <FormField
          label="Username"
          name="username"
          type="text"
          placeholder="levia"
          control={control}
        />
        {errors.username && (
          <span className="text-xs font-medium text-destructive">
            {errors.username.message}
          </span>
        )}
      </Fieldset>
      <div className="space-y-2">
        <FormField
          label="Email"
          name="email"
          type="email"
          control={control}
          placeholder="m@example.com"
        />
        {errors.email && (
          <span className="text-xs text-destructive">
            {errors.email.message}
          </span>
        )}
      </div>
      <div className="space-y-2">
        <FormField
          label="Password"
          name="password"
          type="password"
          control={control}
          placeholder="Enter password"
        />
        {errors.password && (
          <span className="text-xs text-destructive">
            {errors.password.message}
          </span>
        )}
      </div>
      <div className="space-y-2">
        <FormField
          label="Confirm Password"
          name="passwordConfirm"
          type="password"
          control={control}
          placeholder="Re-type your password"
        />
        {errors.passwordConfirm && (
          <span className="text-xs text-destructive">
            {errors.passwordConfirm.message}
          </span>
        )}
      </div>
      <div className="space-y-2">
        <FormField
          label="Date of Birth"
          name="dob"
          type="date"
          control={control}
        />
        {errors.dob && (
          <span className="text-xs text-destructive">{errors.dob.message}</span>
        )}
      </div>
      <SubmitBtn
        type="submit"
        isLoading={isLoading}
        btnText="Sign Up"
        loadingBtnText="Signing Up..."
      />
    </motion.form>
  );
};
