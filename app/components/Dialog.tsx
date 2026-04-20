import {
  Dialog,
  type DialogBackdropProps,
  type DialogDescriptionProps,
  type DialogPopupProps,
  type DialogTitleProps,
} from '@base-ui/react';
import { twMerge } from 'tailwind-merge';
import { heading, text } from '~/styles/text.styles';

export const DialogRoot = Dialog.Root;
export const DialogTrigger = Dialog.Trigger;
export const DialogPortal = Dialog.Portal;
export const DialogClose = Dialog.Close;

interface BackgropProps extends DialogBackdropProps {
  className?: string;
}

export function DialogBackdrop({
  className,
  children,
  ...rest
}: BackgropProps) {
  return (
    <Dialog.Backdrop
      className={twMerge(
        'fixed inset-0 bg-black/50 backdrop-blur-xs',
        className,
      )}
      {...rest}
    >
      {children}
    </Dialog.Backdrop>
  );
}

interface PopupProps extends DialogPopupProps {
  className?: string;
}

export function DialogPopup({ children, className, ...rest }: PopupProps) {
  return (
    <Dialog.Popup
      className={twMerge(
        'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
        'w-full p-4',
      )}
      {...rest}
    >
      <div
        className={twMerge(
          'w-full max-w-md p-4 sm:p-6',
          'bg-surface rounded-lg shadow-lg',
          className,
        )}
      >
        {children}
      </div>
    </Dialog.Popup>
  );
}

interface TitleProps extends DialogTitleProps {
  className?: string;
}

export function DialogTitle({ children, className, ...rest }: TitleProps) {
  return (
    <Dialog.Title
      className={twMerge(heading({ level: 'h5' }), className)}
      {...rest}
    >
      {children}
    </Dialog.Title>
  );
}

interface DescriptionProps extends DialogDescriptionProps {
  className?: string;
}

export function DialogDescription({
  children,
  className,
  ...rest
}: DescriptionProps) {
  return (
    <Dialog.Description
      className={twMerge(text({ color: 'secondary' }), className)}
      {...rest}
    >
      {children}
    </Dialog.Description>
  );
}
