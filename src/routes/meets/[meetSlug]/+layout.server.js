import { error } from '@sveltejs/kit';
import { getSingleMeet } from '$lib/services/meetsService';
import fetchDocument from '$lib/utils/fetchDocument.js';

export async function load({ fetch, params }) {
  const { meetSlug } = params;

  // early check if meet exists in DB
  // try {
  //   getSingleMeet(meetSlug);
  // } catch (e) {
  //   throw error(404, `Event with meetSlug '${meetSlug}' not found.`);
  // }

  try {
    const meetConfig = await getSingleMeet(meetSlug);

    // get the event list
    // beware of CORS configuration (prefetching evtindex through SSR is preferable here)
    const evtIndexHTML = await fetchDocument(fetch, 'evtindex.htm', {
      encoding: meetConfig.hytekHtmlEncoding, // usually ISO-8859-15 (Latin3)
      baseLocation: meetConfig.hytekFtpLocation, // with trailing slash
    });

    return {
      meetConfig,
      evtIndexHTML,
      meetSlug,
    };
  } catch (e) {
    console.warn('Could not fetch event index', e);
    // todo: should warn user there is a config problem (event list will never load)
    return {
      meetConfig: await getSingleMeet(meetSlug),
      meetSlug,
      evtIndexHTML: null
    };
  }
}
