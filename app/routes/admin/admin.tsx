import { data, Outlet } from 'react-router';
import { getSupabaseServerClient } from '~/lib/supabase.server';
import type { Route } from './+types/admin';

export async function loader({ request, context }: Route.LoaderArgs) {
  const responseHeaders = new Headers();
  const { SUPABASE_ANON_KEY, SUPABASE_URL } = context.cloudflare.env;

  const supabase = await getSupabaseServerClient({
    request,
    headers: responseHeaders,
    supabaseAnonKey: SUPABASE_ANON_KEY,
    supabaseUrl: SUPABASE_URL,
  });

  const user = await supabase.auth.getUser();

  if (!user.data.user) {
    throw new Response('Unauthorized', { status: 401 });
  }

  return data({ user: user.data.user }, { headers: responseHeaders });
}

export default function Admin() {
  return (
    <div className="container">
      <h1>Admin</h1>

      <Outlet />
    </div>
  );
}
