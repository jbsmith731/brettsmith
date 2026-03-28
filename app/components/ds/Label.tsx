export function Label({
  children,
  ...rest
}: React.ComponentPropsWithoutRef<'label'>) {
  return (
    <label
      className="block font-mono font-medium text-xs uppercase text-text-muted tracking-wide"
      {...rest}
    >
      {children}
    </label>
  );
}
