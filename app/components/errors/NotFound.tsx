import { heading, text } from "~/styles/text.styles";
import { ButtonLink } from "../ds/Button";

export function NotFound() {
  return (
    <main className="max-w-3xl mx-auto grid gap-2 place-content-center text-center">
      <h1 className={heading({ level: "h1", weight: "regular" })}>404</h1>
      <p className={text()}>The page you are looking for does not exist.</p>
      <ButtonLink to="/" className="place-self-center">
        Go back Home
      </ButtonLink>
    </main>
  );
}
