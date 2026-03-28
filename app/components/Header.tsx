import { Link, NavLink } from 'react-router';
import { linkText } from '~/styles/text.styles';

import { twMerge } from 'tailwind-merge';

export default function Header() {
  return (
    <header className="sticky top-0 backdrop-blur-lg z-50">
      <div className="flex justify-between items-center container h-16">
        <Link
          to="/"
          className={twMerge(
            'text-ink-950 hover:text-ink-500/92 transition-colors',
            'after:-inset-2 after:absolute relative',
          )}
        >
          <Logo />
          <span className="sr-only">Home</span>
        </Link>

        <nav>
          <ul className="flex gap-6">
            <li>
              <NavLink
                to="/bookmarks"
                className={twMerge(
                  linkText({
                    color: 'primary',
                  }),
                  'aria-[current]:line-through decoration-accent decoration-[1.5px]',
                )}
                prefetch="intent"
              >
                Bookmarks
              </NavLink>
            </li>
            <li>
              <a
                href="mailto:hi@brettsmith.me"
                className={linkText({ color: 'primary' })}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="18"
      fill="none"
      viewBox="0 0 20 18"
    >
      <path
        fill="currentColor"
        d="M0 17.16V0h8.328c3.576 0 5.448 1.392 5.448 4.32 0 2.112-1.248 3.168-2.664 3.648v.048c1.8.312 3.336 1.512 3.336 4.08 0 3.648-2.328 5.064-5.88 5.064zM4.32 6.936H7.2c1.2 0 2.16-.288 2.16-1.704S8.4 3.528 7.2 3.528H4.32zm0 6.696h3c1.8 0 2.712-.432 2.712-2.04S9.12 9.576 7.32 9.576h-3z"
      />
      <circle cx="18" cy="15" r="2" fill="var(--color-accent)" />
    </svg>
  );
}
