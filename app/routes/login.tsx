import { formOptions, useForm } from '@tanstack/react-form';
import {
  createServerValidate,
  ServerValidateError,
} from '@tanstack/react-form-remix';
import { Form, redirect, useActionData } from 'react-router';
import z from 'zod';
import { Button } from '~/components/ds/Button';
import { FieldInfo } from '~/components/ds/FieldInfo';
import { Input } from '~/components/ds/Input';
import { cloudflareContext } from '~/context';
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
  const actionData = useActionData<typeof action>();

  const form = useForm({
    ...loginOptions,
    validators: {
      onSubmit: LoginSchema,
    },
  });

  return (
    <div className="container grid min-h-full place-items-center">
      <div className="mx-auto max-w-sm w-full grid gap-6">
        <h1 className={heading({ level: 'h3', weight: 'regular' })}>Login</h1>

        <Form
          className="grid gap-4"
          method="POST"
          onSubmit={() => form.handleSubmit()}
        >
          <form.Field name="email">
            {(field) => {
              return (
                <div>
                  <Input
                    name={field.name}
                    type="email"
                    placeholder="john.doe@example.com"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={!field.state.meta.isValid}
                  />
                  <FieldInfo field={field} />
                </div>
              );
            }}
          </form.Field>
          <form.Field name="password">
            {(field) => {
              return (
                <div>
                  <Input
                    name={field.name}
                    type="password"
                    placeholder="Enter your password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={!field.state.meta.isValid}
                  />
                  <FieldInfo field={field} />
                </div>
              );
            }}
          </form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </div>
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
  email: z.email(),
  password: z.string().min(1),
});
