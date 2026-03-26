import { NotFound as NotFoundPrimitive } from '~/components/errors/NotFound';
import { createMetaTitle } from '~/helpers/seo.helpers';
import type { Route } from './+types/not-found';

export function meta({}: Route.MetaArgs) {
  return [
    { title: createMetaTitle('Not Found') },
    {
      name: 'robots',
      content: 'noindex, nofollow',
    },
  ];
}

export default function NotFound() {
  return <NotFoundPrimitive />;
}
