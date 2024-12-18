import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';

import { PinStep } from '../../ui/PinStep';
import { FormField } from '../../ui/shared/FormField';
import Modal from '../../ui/shared/Modal';
import { SubmitBtn } from '../../ui/shared/SubmitBtn';
import { VerifyEmail } from '../../ui/VerifyEmail';
import { useMutistepForm } from '../../utils/useMutistepForm';
import { useResetPasswordMutation } from '../users/userSlice';
import { Button } from '@headlessui/react';

const FormSchema = z.object({
  pin: z.string().length(6),
  newPassword: z.string().min(8),
  confirmNewPassword: z.string().min(8),
});

type FormType = z.infer<typeof FormSchema>;

export const ForgotPassword = ({ children }: { children?: ReactNode }) => {
  const navigate = useNavigate();
  const [resetPassword, { isLoading, isSuccess, error, data: response }] =
    useResetPasswordMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
    trigger,
  } = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const handleResetPassword: SubmitHandler<FormType> = async (data) => {
    await resetPassword(data).unwrap();
  };

  const NewPasswordStep = ({
    onSubmit,
  }: {
    onSubmit: SubmitHandler<FormType>;
  }) => (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        control={control}
        name="newPassword"
        type="password"
        label="New Password"
        placeholder="Enter your new password"
      />
      <FormField
        control={control}
        name="confirmNewPassword"
        type="password"
        label="Confirm New Password"
        placeholder="Confirm your new password"
      />
      <SubmitBtn
        type="button"
        onClick={handleSubmit(onSubmit)}
        loadingBtnText="Saving..."
        btnText="Reset Password"
        isLoading={isLoading}
      />
    </form>
  );

  const { currentStepIndex, step, isFirstStep, next, back } = useMutistepForm([
    <VerifyEmail nextField={() => next()} key={1} />,
    <PinStep
      onSubmit={() => next()}
      control={control}
      trigger={trigger}
      errors={errors}
      key={2}
    />,
    <NewPasswordStep onSubmit={handleResetPassword} key={3} />,
  ]);

  const stepTitles = ['Enter Email', 'Verify PIN', 'Set New Password'];

  useEffect(
    function () {
      if (isSuccess) {
        toast.success(
          response?.data?.message || 'Password successfully changed'
        );
        setIsModalOpen(false);
        navigate('/');
      }
      if (error) {
        if ('data' in error) {
          toast.error(
            error?.data?.message || 'An error occured while resetting password'
          );
        } else {
          toast.error('An unexpected error occured');
        }
      }
    },
    [isSuccess, error]
  );

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        className="text-sm text-accent-foreground hover:underline"
      >
        {children}
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBack={back}
        showBackButton={!isFirstStep}
        title={`Reset Password - ${stepTitles[currentStepIndex]}`}
      >
        {step}
      </Modal>
    </>
  );
};
