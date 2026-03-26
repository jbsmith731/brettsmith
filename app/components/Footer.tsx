import { twMerge } from 'tailwind-merge';
import { linkText } from '~/styles/text.styles';

export function Footer() {
  return (
    <footer
      className={twMerge(
        'container py-4 md:py-8 flex max-sm:flex-col-reverse gap-4 justify-between items-center text-sm',
      )}
    >
      <p>&copy; {new Date().getFullYear()} Brett Smith</p>

      <ul className="flex gap-4">
        {SOCIAL_LINKS.map((link) => (
          <li key={link.name}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={linkText({ color: 'primary' })}
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}

const SOCIAL_LINKS = [
  {
    url: 'https://github.com/jbsmith731',
    name: 'GitHub',
  },
  // {
  //   url: "https://twitter.com/_brettsmith",
  //   name: "Twitter",
  // },
  {
    url: 'https://www.linkedin.com/in/brett--smith/',
    name: 'LinkedIn',
  },
  // {
  //   url: "https://instagram.com/jbsmith731",
  //   name: "Instagram",
  // },
];
