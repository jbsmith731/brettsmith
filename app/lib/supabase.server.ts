import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr";

type GetSupabaseServerClientOptions = {
  request: Request;
  headers: Headers;
  supabaseUrl: string;
  supabaseAnonKey: string;
};

export function getSupabaseServerClient({
  request,
  headers,
  supabaseUrl,
  supabaseAnonKey,
}: GetSupabaseServerClientOptions) {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL and Anon Key must be provided");
  }

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
