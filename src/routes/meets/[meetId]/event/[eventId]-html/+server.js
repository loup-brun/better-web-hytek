import fetchDocument from "$lib/utils/fetchDocument.js";
import { meetsMap } from '$lib/services/meetsService';
import { error } from '@sveltejs/kit';

/**
 * Endpoint for use with [eventId].svelte
 *
 * @param params
 * @returns {Promise<{body: {eventHTML: *, error: null}}|{error: {message: string}, status: number}>}
 */
export async function GET({ params }) {
  const { eventId, meetId } = params;

  // early check if meet exists in DB
  if (!meetsMap.has(meetId)) {
    throw error(404, `Event with meetId '${meetId}' not found.`);
  }

  const meetConfig = meetsMap.get(meetId);

  try {
    const eventHTML = await fetchDocument(fetch, `${eventId}.htm`, {
      encoding: meetConfig.hytekHtmlEncoding,
      baseLocation: meetConfig.hytekFtpLocation,
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
