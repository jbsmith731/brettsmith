import { createServerValidate } from '@tanstack/react-form-remix';
import { data, useLoaderData } from 'react-router';
import z from 'zod';
import {
  DialogBackdrop,
  DialogPopup,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '~/components/Dialog';
import { Button } from '~/components/ds/Button';
import { Main } from '~/components/Main';
import { cloudflareContext } from '~/context';
import { getSupabaseServerClient } from '~/lib/supabase.server';
import { heading, text } from '~/styles/text.styles';
import type { Route } from './+types/admin-bookmarks';
import {
  BookmarkForm,
  bookmarkOptions,
  BookmarkSchema,
} from './components/BookmarkForm';

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
    .select('title, url, description, id')
    .order('id', { ascending: false })
    .limit(100);

  return data({ bookmarks }, { headers: responseHeaders });
}

export default function Bookmarks() {
  const { bookmarks } = useLoaderData<typeof loader>();

  return (
    <Main className="container grid gap-12">
      <div className="flex items-center justify-between">
        <h1 className={heading({ level: 'h1' })}>Bookmarks</h1>

        <DialogRoot>
          <DialogTrigger
            render={<Button variant="outline">Add Bookmark</Button>}
          />
          <DialogPortal>
            <DialogBackdrop />
            <DialogPopup className="grid gap-5">
              <DialogTitle>Add Bookmark</DialogTitle>
              <BookmarkForm method="post" />
            </DialogPopup>
          </DialogPortal>
        </DialogRoot>
      </div>

      <ul className="grid gap-4 md:gap-8">
        {bookmarks?.map((bookmark) => (
          <li key={bookmark.id} className="flex gap-2 justify-between">
            <div className="grid gap-0.5">
              <h2 className={heading({ level: 'h5' })}>{bookmark.title}</h2>
              <p
                className={text({
                  color: 'secondary',
                  className: 'max-sm:leading-snug',
                })}
              >
                {bookmark.description}
              </p>
            </div>

            {/* <Button variant="ghost" size="button" className="shrink-0">
              <Icon name="more-2-line" />
            </Button> */}
          </li>
        ))}
      </ul>
    </Main>
  );
}

const bookmarkServerValidate = createServerValidate({
  ...bookmarkOptions,
  onServerValidate: async ({ value }) => {
    try {
      BookmarkSchema.parse(value);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error;
      }
    }
  },
});
