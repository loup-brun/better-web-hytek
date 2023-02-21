import { redirect } from '@sveltejs/kit';

export function GET({ url }) {
  console.log({ url })
  throw redirect(307, url.pathname.replace(/\/hytek$/, ''));
}
