import { json } from '@sveltejs/kit';

export async function GET({ url }) {
  const { pathname } = url;

  try {
    const fetchConfig = await fetch(`${url.toString()}/config`);
    const configData = await fetchConfig.json();
    const { meetConfig } = configData;

    /**
     * Load corresponding layout depending on results type
     */
    if (meetConfig.resultsType === 'hytek') {
      return new Response(undefined, {
        status: 307,
        headers: {
          Location: `${pathname}`
        }
      });
    } else {
      // unsupported results type
      return json({
        error: 'Results type not implemented'
      }, {
        status: 500
      });
    }
  } catch (e) {
    return json({
      error: e
    }, {
      status: 404
    });
  }


}
