import { formOptions, useForm } from '@tanstack/react-form';
import {
  createServerValidate,
  ServerValidateError,
} from '@tanstack/react-form-remix';
import { Form, redirect } from 'react-router';
import z from 'zod';
import { Button } from '~/components/ds/Button';
import { Field, FieldInfo, Label } from '~/components/ds/Field';
import { getInputProps, Input } from '~/components/ds/Input';
import { cloudflareContext } from '~/context';
import { createMetaTitle } from '~/helpers/seo.helpers';
import { getSupabaseServerClient } from '~/lib/supabase.server';
import { heading } from '~/styles/text.styles';
import type { Route } from './+types/login';

export async function action({ request, context }: Route.ActionArgs) {
  const responseHeaders = new Headers();
  const formData = await request.formData();

  const { SUPABASE_ANON_KEY, SUPABASE_URL } =
    context.get(cloudflareContext).env;

  try {
    const validatedData = await serverValidate(formData);
    const supabase = await getSupabaseServerClient({
      request,
      headers: responseHeaders,
      supabaseAnonKey: SUPABASE_ANON_KEY,
      supabaseUrl: SUPABASE_URL,
    });

    await supabase.auth.signInWithPassword({
      email: validatedData.email,
      password: validatedData.password,
    });

    return redirect('/admin', { headers: responseHeaders });
  } catch (e) {
    if (e instanceof ServerValidateError) {
      return e.formState;
    }

    // Some other error occurred while validating your form
    throw e;
  }

  // Your form has successfully validated!
  return null;
}

export default function Login() {
  const form = useForm({
    ...loginOptions,
    validators: {
      onSubmit: LoginSchema,
    },
  });

  return (
    <>
      <title>{createMetaTitle('Login')}</title>
      <meta name="robots" content="noindex, nofollow" />

      <main className="container grid min-h-full place-items-center">
        <div className="mx-auto max-w-sm w-full grid gap-5">
          <h1 className={heading({ level: 'h3', weight: 'regular' })}>Login</h1>

          <Form
            className="grid gap-4"
            method="POST"
            onSubmit={() => form.handleSubmit()}
          >
            <form.Field name="email">
              {(field) => {
                return (
                  <Field>
                    <Label htmlFor={field.name}>Email</Label>
                    <Input
                      {...getInputProps(field)}
                      type="email"
                      placeholder="john.doe@example.com"
                    />
                    <FieldInfo field={field} />
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="password">
              {(field) => {
                return (
                  <Field>
                    <Label htmlFor={field.name}>Password</Label>
                    <Input
                      {...getInputProps(field)}
                      type="password"
                      placeholder="Enter your password"
                    />
                    <FieldInfo field={field} />
                  </Field>
                );
              }}
            </form.Field>
            <Button type="submit" disabled={form.state.isSubmitting}>
              Login
            </Button>
          </Form>
        </div>
      </main>
    </>
  );
}

const loginOptions = formOptions({
  defaultValues: {
    email: '',
    password: '',
  },
});

const serverValidate = createServerValidate({
  ...loginOptions,
  onServerValidate: async ({ value }) => {
    try {
      LoginSchema.parse(value);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error;
      }
    }
  },
});

const LoginSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});
