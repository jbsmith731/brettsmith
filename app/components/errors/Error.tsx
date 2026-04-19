import { heading, text } from '~/styles/text.styles';
import { ButtonLink } from '../ds/Button';

export function ErrorPage({
  headingText = 'An error occurred',
  message = 'Something went wrong.',
}) {
  return (
    <main className="max-w-3xl mx-auto grid gap-2 place-content-center text-center">
      <h1 className={heading({ level: 'h1', weight: 'regular' })}>
        {headingText}
      </h1>
      <p className={text()}>{message}</p>
      <ButtonLink to="/" className="place-self-center">
        Go back Home
      </ButtonLink>
    </main>
  );
}
