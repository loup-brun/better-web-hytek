import { error } from '@sveltejs/kit';

/**
 * Load meet data and make it available to child routes
 *
 * @param fetch
 * @param params
 * @param parent
 * @returns {Promise<{meetConfig: *}>}
 */
export async function load({ fetch, params }) {
  const { meetId } = params;

  try {
    const res = await fetch(`/meets/${meetId}/config`);
    const { meetConfig } = await res.json();

    if (res.ok) {
      return {
        // pass down the meet config to child layouts
        meetConfig
      };
    } else {
      throw error(404);
    }
  } catch (e) {
    console.error('Error fetching meet config', e);
  }
}
