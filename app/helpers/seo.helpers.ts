import { TITLE } from '~/constants/seo.constants';

export function createMetaTitle(pageTitle: string) {
  return `${pageTitle} | ${TITLE}`;
}
