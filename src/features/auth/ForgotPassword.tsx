import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../ui/shared/Modal";
import { FormField } from "../../ui/shared/FormField";
import { useMutistepForm } from "../../utils/useMutistepForm";

export const ForgotPassword = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, control } = useForm();

  const handleResetPassword = (data) => {
    console.log("Password reset:", data);
    setIsModalOpen(false);
  };
  const onVerifyEmail = (data) => {
    console.log(data);
  };
  const EmailStep = ({ onSubmit }) => (
    <form onSubmit={handleSubmit(onVerifyEmail)} className="space-y-4">
      <FormField
        control={control}
        name="email"
        type="email"
        placeholder="Enter your email address"
      />
      <button
        type="button"
        className="w-full bg-neonPink-600 text-customBlue-900 font-semibold py-3 px-4 rounded-lg flex justify-center items-center transition-colors duration-200 hover:bg-neonPink-500"
        onClick={onSubmit}
      >
        Send Reset Link
      </button>
    </form>
  );

  const PinStep = ({ onSubmit }) => (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex justify-between">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <input
            key={num}
            {...register(`pin${num}`, { required: true, maxLength: 1 })}
            type="text"
            maxLength={1}
            className="w-12 h-12 text-center text-2xl bg-customBlue-800 border-2 border-electricCyan-500 rounded-lg focus:outline-none focus:border-neonPink-500 text-electricCyan-300"
          />
        ))}
      </div>
      <button
        type="submit"
        className="w-full bg-neonPink-600 text-customBlue-900 font-semibold py-3 px-4 rounded-lg flex justify-center items-center transition-colors duration-200 hover:bg-neonPink-500"
      >
        Verify PIN
      </button>
    </form>
  );

  const NewPasswordStep = ({ onSubmit }) => (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        control={control}
        name="newPassword"
        type="password"
        placeholder="Enter your new password"
      />
      <FormField
        control={control}
        name="confirmNewPassword"
        type="password"
        placeholder="Confirm your new password"
      />
      <button
        type="submit"
        className="w-full bg-neonPink-600 text-customBlue-900 font-semibold py-3 px-4 rounded-lg flex justify-center items-center transition-colors duration-200 hover:bg-neonPink-500"
      >
        Reset Password
      </button>
    </form>
  );

  const { currentStepIndex, step, isFirstStep, isLastStep, next, back } =
    useMutistepForm([
      <EmailStep onSubmit={() => next()} />,
      <PinStep onSubmit={() => next()} />,
      <NewPasswordStep onSubmit={handleResetPassword} />,
    ]);

  const stepTitles = ["Enter Email", "Verify PIN", "Set New Password"];

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-sm text-neonPink-400 hover:text-neonPink-300 transition-colors"
      >
        {children}
      </button>
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
