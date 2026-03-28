import { Form, Outlet } from 'react-router';
import { cloudflareContext } from '~/context';
import { getSupabaseServerClient } from '~/lib/supabase.server';
import { label } from '~/styles/text.styles';
import type { Route } from './+types/admin';

const authMiddleware: Route.MiddlewareFunction = async ({
  request,
  context,
}) => {
  const responseHeaders = new Headers();
  const { SUPABASE_ANON_KEY, SUPABASE_URL } =
    context.get(cloudflareContext).env;

  const supabase = await getSupabaseServerClient({
    request,
    headers: responseHeaders,
    supabaseAnonKey: SUPABASE_ANON_KEY,
    supabaseUrl: SUPABASE_URL,
  });

  const user = await supabase.auth.getUser();

  if (!user.data.user) {
    throw new Response('Not Found', { status: 404 });
  }
};

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export async function action({ request, context }: Route.LoaderArgs) {
  const responseHeaders = new Headers();
  const { SUPABASE_ANON_KEY, SUPABASE_URL } =
    context.get(cloudflareContext).env;

  const supabase = await getSupabaseServerClient({
    request,
    headers: responseHeaders,
    supabaseAnonKey: SUPABASE_ANON_KEY,
    supabaseUrl: SUPABASE_URL,
  });

  const formData = await request.formData();
  const intent = formData.get('intent');

  if (intent === '_LOGOUT') {
    await supabase.auth.signOut();
    return new Response(null, {
      status: 302,
      headers: {
        ...responseHeaders,
        Location: '/login',
      },
    });
  }

  return null;
}

export default function Admin() {
  return (
    <div>
      <meta name="robots" content="noindex, nofollow" />

      <div className="border-y py-2 border-border">
        <div className="container flex items-center justify-between text-sm font-mono">
          <div className={label}>Admin</div>

          <Form method="post">
            <button className="hover:text-error" name="intent" value="_LOGOUT">
              Logout
            </button>
          </Form>
        </div>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
}
