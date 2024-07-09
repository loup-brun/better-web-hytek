import { redirect } from '@sveltejs/kit';

export function GET({ url }) {
  redirect(307, url.pathname.replace(/\/hytek$/, ''));
}
