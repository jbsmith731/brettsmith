import { type AnyFieldApi } from '@tanstack/react-form';
import { twMerge } from 'tailwind-merge';

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
  children,
  className,
  ...rest
}: React.ComponentPropsWithoutRef<'label'>) {
  return (
    <label
      className={twMerge(
        'block font-mono font-medium text-xs uppercase text-text-muted tracking-wide',
        className,
      )}
      {...rest}
    >
      {children}
    </label>
  );
}

export function FieldInfo({ field }: { field: AnyFieldApi }) {
  const { isTouched, isValid, errors, isValidating } = field.state.meta;
  return (
    <>
      {isTouched && !isValid ? (
        <small className="text-error font-medium text-sm">
          {errors.map((err) => err.message).join(',')}
        </small>
      ) : null}

      {isValidating ? 'Validating...' : null}
    </>
  );
}
