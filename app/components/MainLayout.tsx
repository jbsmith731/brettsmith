import { twMerge } from 'tailwind-merge';

export function MainLayout({
  children,
  className,
  ...rest
}: React.ComponentPropsWithRef<'main'>) {
  return (
    <main
      {...rest}
      className={twMerge('max-sm:px-4 sm:max-w-3xl mx-auto', className)}
    >
      {children}
    </main>
  );
}
