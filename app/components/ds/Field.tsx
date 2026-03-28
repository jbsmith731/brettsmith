import { twMerge } from 'tailwind-merge';
import { label } from '~/styles/text.styles';

export function Field({
  children,
  className,
  ...rest
}: React.ComponentPropsWithRef<'div'>) {
  return (
    <div className={twMerge('grid gap-1.5', className)} {...rest}>
      {children}
    </div>
  );
}

export function Label({
  className,
  ...rest
}: React.ComponentPropsWithRef<'label'>) {
  return <label className={twMerge('block', label, className)} {...rest} />;
}
