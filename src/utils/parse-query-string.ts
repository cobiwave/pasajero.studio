import queryString from 'query-string';

import { isDevEnv } from './runtime-env';

export default function parseQueryString() {
  return isDevEnv() && typeof window !== 'undefined'
    ? queryString.parse(window.location.search)
    : {};
}
