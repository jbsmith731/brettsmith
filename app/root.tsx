import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';
import { twJoin } from 'tailwind-merge';
import type { Route } from './+types/root';
import './app.css';
import { Footer } from './components/Footer';
import Header from './components/Header';
import { ErrorPage } from './components/errors/Error';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <link
          rel="preload"
          href="/fonts/PPNeueMontreal-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <Meta />
        <Links />
      </head>
      <body
        className={twJoin(
          'root',
          'bg-surface h-full min-h-dvh grid grid-rows-[auto_1fr_auto]',
        )}
      >
        <Header />
        {children}
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const details =
    error && error instanceof Error
      ? error.message
      : 'An unexpected error occurred.';

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        return (
          <ErrorPage
            headingText="404"
            message="The requested page could not be found."
          />
        );
      default:
        return (
          <ErrorPage headingText="Error" message={error.data || details} />
        );
    }
  }

  return <ErrorPage headingText="Oops!" message={details} />;
}
