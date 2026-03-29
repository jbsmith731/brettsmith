import { formOptions, useForm } from '@tanstack/react-form';
import { Form, type FormProps } from 'react-router';
import { twMerge } from 'tailwind-merge';
import z from 'zod';
import { DialogClose } from '~/components/Dialog';
import { Button } from '~/components/ds/Button';
import { Field, FieldInfo, Label } from '~/components/ds/Field';
import { getInputProps, Input } from '~/components/ds/Input';

interface BookmarkFormProps extends Omit<FormProps, 'onSubmit'> {
  className?: string;
}

export function BookmarkForm({ className, ...rest }: BookmarkFormProps) {
  const form = useForm({
    ...bookmarkOptions,
    validators: {
      onSubmit: BookmarkSchema,
    },
  });

  return (
    <Form
      {...rest}
      className={twMerge('grid gap-4', className)}
      onSubmit={() => form.handleSubmit()}
    >
      <form.Field name="title">
        {(field) => (
          <Field>
            <Label htmlFor={field.name}>Title</Label>
            <Input
              {...getInputProps(field)}
              type="text"
              placeholder="My Bookmark"
            />
            <FieldInfo field={field} />
          </Field>
        )}
      </form.Field>

      <form.Field name="url">
        {(field) => (
          <Field>
            <Label htmlFor={field.name}>URL</Label>
            <Input
              {...getInputProps(field)}
              type="url"
              placeholder="https://example.com"
            />
            <FieldInfo field={field} />
          </Field>
        )}
      </form.Field>

      <form.Field name="description">
        {(field) => (
          <Field>
            <Label htmlFor={field.name}>Description</Label>
            <Input
              {...getInputProps(field)}
              type="text"
              placeholder="A short description"
            />
            <FieldInfo field={field} />
          </Field>
        )}
      </form.Field>

      <div className="flex gap-2 justify-self-end">
        <DialogClose
          render={
            <Button type="button" variant="outline">
              Cancel
            </Button>
          }
        />
        <Button type="submit" disabled={form.state.isSubmitting}>
          Save Bookmark
        </Button>
      </div>
    </Form>
  );
}

export const bookmarkOptions = formOptions({
  defaultValues: {
    title: '',
    url: '',
    description: '',
  },
});

export const BookmarkSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  url: z
    .url({ message: 'A valid URL is required' })
    .min(1, { message: 'URL is required' }),
  description: z.string(),
});
