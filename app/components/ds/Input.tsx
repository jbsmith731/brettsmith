import { twMerge } from 'tailwind-merge';

interface InputProps extends React.ComponentPropsWithRef<'input'> {}

export function Input({ className, ...rest }: InputProps) {
  return (
    <input
      className={twMerge(
        [
          'flex h-10 w-full rounded-md px-3 text-sm',
          'bg-surface text-text-primary placeholder:text-text-muted',
          'border border-border/60',
          'transition-colors duration-150',

          // hover
          'hover:border-border',

          // focus (quiet editorial)
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border focus-visible:border-ink-700',

          // error (via aria-invalid or data-invalid)
          'aria-invalid:border-error aria-invalid:focus-visible:ring-error/40',

          // disabled
          'disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-paper-200',
        ],
        className,
      )}
      {...rest}
    />
  );
}
