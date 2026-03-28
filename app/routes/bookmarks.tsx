import { data, useLoaderData } from 'react-router';
import { twMerge } from 'tailwind-merge';
import { Main } from '~/components/Main';
import { cloudflareContext } from '~/context';
import { createMetaTitle } from '~/helpers/seo.helpers';
import { getSupabaseServerClient } from '~/lib/supabase.server';
import { heading, linkText, text } from '~/styles/text.styles';
import type { Route } from './+types/bookmarks';

export function headers() {
  return {
    'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=86400',
  };
}

export async function loader({ request, context }: Route.LoaderArgs) {
  const responseHeaders = new Headers();
  const { SUPABASE_ANON_KEY, SUPABASE_URL } =
    context.get(cloudflareContext).env;

  const supabase = getSupabaseServerClient({
    request,
    headers: responseHeaders,
    supabaseUrl: SUPABASE_URL,
    supabaseAnonKey: SUPABASE_ANON_KEY,
  });

  const { data: bookmarks } = await supabase
    .from('Bookmarks')
    .select('title, url, description')
    .order('id', { ascending: false })
    .limit(100);

  return data({ bookmarks }, { headers: responseHeaders });
}

export default function Bookmarks() {
  const { bookmarks } = useLoaderData<typeof loader>();

  return (
    <>
      <title>{createMetaTitle('Bookmarks')}</title>
      <meta
        name="description"
        content="A curated collection of bookmarks featuring useful links, tools, and resources across design, development, and product work."
      />
      <Main className="container grid gap-12">
        <h1 className={heading({ level: 'h1', weight: 'regular' })}>
          Bookmarks
        </h1>

        <ul className="grid gap-4 md:gap-8">
          {bookmarks?.map((bookmark) => (
            <li key={bookmark.url} className="link-box grid gap-0.5">
              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className={twMerge(
                  linkText({ color: 'primary' }),
                  'text-xl font-medium link-overlay',
                )}
              >
                {bookmark.title} <span aria-hidden="true">↗</span>
              </a>
              <p
                className={text({
                  color: 'secondary',
                  className: 'max-sm:leading-snug',
                })}
              >
                {bookmark.description}
              </p>
            </li>
          ))}
        </ul>
      </Main>
    </>
  );
}
