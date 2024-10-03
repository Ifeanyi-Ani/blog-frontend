import React, { useRef, useEffect } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";

interface PinStepProps {
  onSubmit: () => void;
  control: Control<
    { pin: string; newPassword: string; confirmNewPassword: string },
    { pin: string }
  >;
  errors: FieldErrors<{ pin: string }>;
  trigger: any;
}

export const PinStep: React.FC<PinStepProps> = ({
  onSubmit,
  control,
  errors,
  trigger,
}) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace" && !event.currentTarget.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleInput = (
    index: number,
    value: string,
    onChange: (value: string) => void,
    currentValue: string
  ) => {
    const newPin = value.slice(-1); // Only keep the last entered character
    const updatedPin = currentValue.split("");
    updatedPin[index] = newPin;
    const newPinString = updatedPin.join("");
    onChange(newPinString);

    if (newPin && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // If all 6 digits are filled, automatically submit
    // if (newPinString.length === 6) {
    //   handleSubmit(onSubmit);
    // }
  };

  const handleSubmit = () => {
    console.log("complete 6");
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Controller
        name="pin"
        control={control}
        render={({ field: { onChange, value } }) => (
          <div className="flex justify-between">
            {[0, 1, 2, 3, 4, 5].map((num) => (
              <input
                key={num}
                type="text"
                maxLength={1}
                className="w-12 h-12 text-center text-2xl bg-customBlue-800 border-2 border-electricCyan-500 rounded-lg focus:outline-none focus:border-neonPink-500 text-electricCyan-300"
                value={value?.[num] || ""}
                onKeyDown={(e) => handleKeyDown(e, num)}
                onChange={(e) =>
                  handleInput(num, e.target.value, onChange, value)
                }
                ref={(el) => (inputRefs.current[num] = el)}
              />
            ))}
          </div>
        )}
      />
      {errors.pin && (
        <span className="text-xs text-customRed-400">{errors.pin.message}</span>
      )}
      <button
        type="button"
        onClick={() => {
          trigger("pin").then((result) => {
            if (result) {
              handleSubmit();
            } else {
              console.log(errors);
            }
          });
        }}
        className="w-full bg-neonPink-600 text-customBlue-900 font-semibold py-3 px-4 rounded-lg flex justify-center items-center transition-colors duration-200 hover:bg-neonPink-500"
      >
        Verify PIN
      </button>
    </form>
  );
};