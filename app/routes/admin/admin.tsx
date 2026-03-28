import { Outlet } from 'react-router';
import { cloudflareContext } from '~/context';
import { getSupabaseServerClient } from '~/lib/supabase.server';
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

export default function Admin() {
  return (
    <>
      <meta name="robots" content="noindex, nofollow" />

      <div className="container">
        <h1>Admin</h1>

        <Outlet />
      </div>
    </>
  );
}
