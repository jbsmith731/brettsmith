import type { AnyFieldApi } from '@tanstack/react-form';

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
