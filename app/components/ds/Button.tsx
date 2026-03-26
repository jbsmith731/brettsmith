import { cva, type VariantProps } from 'cva';
import { Link, type LinkProps } from 'react-router';
import { twMerge } from 'tailwind-merge';

interface ButtonProps
  extends React.ComponentPropsWithRef<'button'>, ButtonVariants {}

export function Button({
  children,
  className,
  variant,
  size,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={twMerge(buttonVariants({ variant, size, className }))}
    >
      {children}
    </button>
  );
}

interface ButtonLinkProps extends LinkProps, ButtonVariants {}

export function ButtonLink({
  children,
  className,
  variant,
  size,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link
      {...rest}
      className={twMerge(buttonVariants({ variant, size, className }))}
    >
      {children}
    </Link>
  );
}

export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center whitespace-nowrap',
    'rounded-lg font-medium transition-colors duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        // primary:
        //   "bg-signal-700 text-paper-100 hover:bg-signal-800 active:bg-signal-800",
        primary: 'bg-ink-800 text-paper-100 hover:bg-ink-500 active:bg-ink-500',
        outline:
          'border border-border text-text-primary hover:bg-paper-200 active:bg-paper-300',
        ghost: 'text-text-primary hover:bg-paper-200 active:bg-paper-300',
        link: 'text-signal-700 underline-offset-4 hover:underline',
        destructive:
          'bg-danger-500 text-paper-100 hover:bg-danger-600 active:bg-danger-700',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        default: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        auto: [],
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
