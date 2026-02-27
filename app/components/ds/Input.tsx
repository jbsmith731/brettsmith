import { twMerge } from 'tailwind-merge';

interface InputProps extends React.ComponentPropsWithRef<'input'> {}

export function Input({ className, ...rest }: InputProps) {
  return (
    <input
      className={twMerge(
        [
          'flex h-10 w-full rounded-md px-3 text-sm',
          'bg-paper-100 text-ink-900 placeholder:text-muted-400',
          'border border-ink-600/20',
          'transition-colors duration-150',

          // hover
          'hover:border-ink-600/40',

          // focus (quiet editorial)
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-600/30 focus-visible:border-ink-700',

          // error (via aria-invalid or data-invalid)
          'aria-invalid:border-danger-500 aria-invalid:focus-visible:ring-danger-500/40',

          // disabled
          'disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-paper-200',
        ],
        className,
      )}
      {...rest}
    />
  );
}
