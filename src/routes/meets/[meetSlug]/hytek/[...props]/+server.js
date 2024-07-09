/**
 * Discontinued route segment
 */
import { redirect } from '@sveltejs/kit';

export function GET({ url }) {
  /* redirect */
  redirect(307, url.pathname.replace(/\/hytek/, ''));
}
