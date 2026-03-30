import { data } from 'react-router';
import { cloudflareContext } from '~/context';
import { getSupabaseServerClient } from '~/lib/supabase.server';
import type { Route } from './+types/bookmark-detail';

export async function action({ request, context, params }: Route.ActionArgs) {
  const responseHeaders = new Headers();
  const { SUPABASE_ANON_KEY, SUPABASE_URL } =
    context.get(cloudflareContext).env;

  const supabase = getSupabaseServerClient({
    request,
    headers: responseHeaders,
    supabaseUrl: SUPABASE_URL,
    supabaseAnonKey: SUPABASE_ANON_KEY,
  });

  const id = parseInt(params.id, 10);

  switch (request.method) {
    case 'DELETE': {
      const result = await supabase.from('Bookmarks').delete().eq('id', id);
      return data({ result }, { headers: responseHeaders });
    }
    default:
      throw new Response('Method Not Allowed', {
        status: 405,
        headers: responseHeaders,
      });
  }
}
