import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { twMerge } from "tailwind-merge";
import { getSupabaseServerClient } from "~/lib/supabase.server";
import { heading, linkText, text } from "~/styles/text.styles";
import type { Route } from "./+types/bookmarks";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bookmarks -Brett Smith" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ request }: LoaderFunctionArgs) {
  const headers = new Headers();
  const supabase = getSupabaseServerClient({ request, headers });

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
          <li key={bookmark.url} className="link-box grid md:gap-0.5">
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className={twMerge(
                linkText({ color: "primary" }),
                "text-xl font-semibold link-overlay",
              )}
            >
              {bookmark.title} <span aria-hidden="true">↗</span>
            </a>
            <p className={text({ color: "secondary" })}>
              {bookmark.description}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
