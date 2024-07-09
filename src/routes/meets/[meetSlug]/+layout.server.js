import { error } from '@sveltejs/kit';
import { getSingleMeet } from '$lib/services/meetsService';
import fetchDocument from '$lib/utils/fetchDocument.js';

export async function load({ fetch, params }) {
  const { meetSlug } = params;

  try {
    /**
     * @type {Promise<{ title: string; slug: string; hytekFtpLocation: string; sessionNames: string[]; hytekHtmlEncoding: string; }>}
     */
    const meetConfig = await getSingleMeet(meetSlug);
    /** @type {string | null } */
    let evtIndexHTML = null;

    // get the event list
    // beware of CORS configuration (prefetching evtindex through SSR is preferable here,
    // hence the `.server.js` route)
    try {
      evtIndexHTML = await fetchDocument(fetch, 'evtindex.htm', {
        encoding: meetConfig.hytekHtmlEncoding, // usually ISO-8859-15 (Latin3)
        baseLocation: meetConfig.hytekFtpLocation, // with trailing slash
      });
    } catch (e) {
      // remote hytek location is probably unreachable
      console.warn('Could not fetch evtIndexHTML', e);
      evtIndexHTML = null;
    }


    return {
      evtIndexHTML,
      meetSlug,
      // flatten the meetConfig object (title, slug, hytekFtpLocation, ...)
      ...meetConfig,
    };
  } catch (e) {
    console.warn(`Error fetching event "${meetSlug}"`, e);
    error(404, 'La page demandée est introuvable.')
  }
}

/**
 * This layout could be prerendered, if the meet config will remain unchanged and published
 * @type {Boolean}
 */
export const prerender = false;
