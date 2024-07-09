import { redirect } from '@sveltejs/kit';

export function GET({ url }) {
  throw redirect(307, url.pathname.replace(/\/hytek$/, ''));
}
