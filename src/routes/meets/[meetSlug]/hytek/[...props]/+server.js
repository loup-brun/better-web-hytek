/**
 * Legacy route segment -- redirect to non-hytek route
 */
import { redirect } from '@sveltejs/kit';

export function GET({ url }) {
  /* redirect */
  redirect(307, url.pathname.replace(/\/hytek/, ''));
}
