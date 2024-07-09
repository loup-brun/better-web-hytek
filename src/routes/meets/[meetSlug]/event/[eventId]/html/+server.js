import fetchDocument from "$lib/utils/fetchDocument.js";
import { meetsMap } from '$lib/services/meetsService';
import { error } from '@sveltejs/kit';

/**
 * Endpoint for use with [eventId].svelte
 *
 * @param params
 * @returns {Promise<{body: {eventHTML: *, error: null}}|{error: {message: string}, status: number}>}
 */
export async function GET({ params, parent }) {
  const { eventId } = params;

  const parentData = await parent();

  try {
    const eventHTML = await fetchDocument(fetch, `${eventId}.htm`, {
      encoding: parentData.hytekHtmlEncoding,
      baseLocation: parentData.hytekFtpLocation,
    });

    return new Response(eventHTML, {
      headers: {
        'Content-Type': 'text/html; charset=UTF-8',
      },
    });
  } catch (e) {
    return new Response(undefined, { status: 404 });
  }
}
