import * as z from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

import { FormField } from './shared/FormField';
import { SubmitBtn } from './shared/SubmitBtn';
import { useVerifyEmailMutation } from '../features/users/userSlice';

const VerifiyEmailSchema = z.object({
  email: z.string().email(),
});

type FormType = z.infer<typeof VerifiyEmailSchema>;

export const VerifyEmail = ({ nextField }: { nextField: () => void }) => {
  const [verifyEmail, { data: response, isLoading, isSuccess, error }] =
    useVerifyEmailMutation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(VerifiyEmailSchema),
    defaultValues: {
      email: '',
    },
  });

  const onVerifyEmail: SubmitHandler<FormType> = async (data) => {
    await verifyEmail(data).unwrap();
  };
  useEffect(function () {
    if (isSuccess) {
      toast.success(response.message || 'Reset code sent to Email');
      nextField();
    }
    if (error) {
      if ('data' in error) {
        toast.error(
          error.data.message || 'An error occured while verifying email'
        );
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  });

  return (
    <form onSubmit={handleSubmit(onVerifyEmail)} className="space-y-4">
      <FormField
        control={control}
        name="email"
        type="email"
        placeholder="Enter your email address"
        label="Email"
      />
      {errors.email && (
        <span className="text-xs text-destructive">{errors.email.message}</span>
      )}
      <SubmitBtn
        type="button"
        onClick={handleSubmit(onVerifyEmail)}
        loadingBtnText="Verifying..."
        btnText="Verify Email"
        isLoading={isLoading}
      />
    </form>
  );
};
