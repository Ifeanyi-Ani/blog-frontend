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

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  onBack,
  showBackButton,
}: ModalProps) => {
  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={onClose}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
          <TransitionChild
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity" />
          </TransitionChild>
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <TransitionChild
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block w-full max-w-md transform overflow-hidden rounded-2xl border border-border bg-card p-6 text-left align-bottom shadow-xl transition-all sm:my-8 sm:align-middle">
              <div className="absolute right-0 top-0 pr-4 pt-4">
                <button
                  type="button"
                  className="rounded-md bg-card text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  onClick={onClose}
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="">
                {showBackButton && (
                  <button
                    onClick={onBack}
                    className="mr-2 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    <ChevronLeft size={24} />
                  </button>
                )}
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-foreground"
                  >
                    {title}
                  </DialogTitle>
                  <div className="mt-2">{children}</div>
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
