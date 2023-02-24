import { error, json as json$1 } from '@sveltejs/kit';
import fetchDocument from "$lib/utils/fetchDocument.js";
import { meetsMap } from '$lib/services/meetsService';

/**
 * Get the hytek event index and returns the utf-8 encoded HTML page
 *
 * @param params
 * @returns {Promise<{body: *}|{status: number}>}
 */
export async function GET({ params }) {
  // per meet config w/ meetId...
  const { meetId } = params;

  // early check if meet exists in DB
  if (!meetsMap.has(meetId)) {
    throw error(404, `Event with meetId '${meetId}' not found.`);
  }

  const meetConfig = meetsMap.get(meetId);

  try {
    // get the event list
    // beware of CORS configuration (prefetching evtindex through SSR is preferable here)
    const evtIndexHTML = await fetchDocument(fetch, 'evtindex.htm', {
      encoding: meetConfig.hytekHtmlEncoding, // usually ISO-8859-15 (Latin3)
      baseLocation: meetConfig.hytekFtpLocation, // with trailing slash
    });

    return json$1({ evtIndexHTML })
  } catch (e) {
    console.error('Error fetching evtindex', e);
    return new Response(undefined, { status: 404 })
  }
}
