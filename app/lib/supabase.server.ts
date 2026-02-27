import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr";
import { env } from "cloudflare:workers";

type GetSupabaseServerClientOptions = {
  request: Request;
  headers: Headers;
};

export function getSupabaseServerClient({
  request,
  headers,
}: GetSupabaseServerClientOptions) {
  const supabaseUrl = env.SUPABASE_URL;
  const supabaseAnonKey = env.SUPABASE_ANON_KEY;

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return (
          parseCookieHeader(request.headers.get("Cookie") ?? "") ?? []
        ).filter(
          (cookie): cookie is { name: string; value: string } =>
            typeof cookie.value === "string",
        );
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          headers.append(
            "Set-Cookie",
            serializeCookieHeader(name, value, { path: "/" }),
          ),
        );
      },
    },
  });
}
