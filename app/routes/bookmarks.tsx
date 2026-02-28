import { useLoaderData } from "react-router";
import { twMerge } from "tailwind-merge";
import { getSupabaseServerClient } from "~/lib/supabase.server";
import { heading, linkText, text } from "~/styles/text.styles";
import type { Route } from "./+types/bookmarks";
import { createMetaTitle } from "~/helpers/seo.helpers";

export function meta({}: Route.MetaArgs) {
  return [
    { title: createMetaTitle("Bookmarks") },
    {
      name: "description",
      content:
        "A curated collection of bookmarks featuring useful links, tools, and resources across design, development, and product work.",
    },
  ];
}

export async function loader({ request, context }: Route.LoaderArgs) {
  const headers = new Headers();
  const supabase = getSupabaseServerClient({
    request,
    headers,
    supabaseUrl: context.cloudflare.env.SUPABASE_URL,
    supabaseAnonKey: context.cloudflare.env.SUPABASE_ANON_KEY,
  });

  const { data: bookmarks } = await supabase
    .from("Bookmarks")
    .select("title, url, description")
    .order("id", { ascending: false });

  return { bookmarks };
}

export default function Bookmarks() {
  const { bookmarks } = useLoaderData<typeof loader>();

  return (
    <main className="container grid gap-12 my-8">
      <h1 className={heading({ level: "h1", weight: "regular" })}>Bookmarks</h1>

      <ul className="grid gap-4 md:gap-8">
        {bookmarks?.map((bookmark) => (
          <li key={bookmark.url} className="link-box grid gap-0.5">
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className={twMerge(
                linkText({ color: "primary" }),
                "text-xl font-medium link-overlay",
              )}
            >
              {bookmark.title} <span aria-hidden="true">↗</span>
            </a>
            <p
              className={text({
                color: "secondary",
                className: "max-sm:leading-snug",
              })}
            >
              {bookmark.description}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
