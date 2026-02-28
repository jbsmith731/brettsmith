import { NotFound as NotFoundPrimitive } from "~/components/errors/NotFound";
import type { Route } from "./+types/not-found";
import { createMetaTitle } from "~/helpers/seo.helpers";

export function meta({}: Route.MetaArgs) {
  return [
    { title: createMetaTitle("Not Found") },
    {
      name: "robots",
      content: "noindex, nofollow",
    },
  ];
}

export default function NotFound() {
  return <NotFoundPrimitive />;
}
