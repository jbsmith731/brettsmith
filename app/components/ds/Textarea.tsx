import type { AnyFieldApi } from '@tanstack/react-form';
import { twMerge } from 'tailwind-merge';
import { inputBase } from '~/styles/input.styles';

interface TextareaProps extends React.ComponentPropsWithRef<'textarea'> {}

export function Textarea({ className, ...rest }: TextareaProps) {
  return (
    <textarea
      className={twMerge(['flex min-h-20 py-2', ...inputBase], className)}
      {...rest}
    />
  );
}

export function getTextareaProps(field: AnyFieldApi) {
  return {
    id: field.name,
    name: field.name,
    value: field.state.value,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      field.handleChange(e.target.value),
    'aria-invalid': !field.state.meta.isValid,
  };
}
