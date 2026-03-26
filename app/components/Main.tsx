import { twMerge } from 'tailwind-merge';

export function Main({
  children,
  className,
  ...rest
}: React.ComponentPropsWithRef<'main'>) {
  return (
    <main {...rest} className={twMerge('my-16 md:my-20', className)}>
      {children}
    </main>
  );
}
