import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { X, ChevronLeft } from 'lucide-react';

interface ModalProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  onBack?: () => void;
  showBackButton?: boolean;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  onBack,
  showBackButton,
}) => {
  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={onClose}
      >
        <div className="min-h-screen px-4 text-center">
          <TransitionChild
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <button
              onClick={onClose}
              className="fixed inset-0 bg-opacity-75 transition-opacity"
            />
          </TransitionChild>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <TransitionChild
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl border-2 border-input bg-popover p-6 text-left align-middle text-popover-foreground shadow-xl transition-all">
              <div className="mb-4 flex items-center justify-between">
                {showBackButton ? (
                  <button
                    onClick={onBack}
                    className="p-1 text-accent-foreground transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </button>
                ) : (
                  <div className="w-8" />
                )}
                <DialogTitle
                  as="h3"
                  className="p-0 text-2xl font-semibold leading-6"
                >
                  {title}
                </DialogTitle>
                <button
                  className="p-1 text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground"
                  onClick={onClose}
                >
                  <X size={24} />
                </button>
              </div>
              <div className="mt-4">{children}</div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
