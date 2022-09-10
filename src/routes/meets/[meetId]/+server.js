import { json as json$1 } from '@sveltejs/kit';

export async function GET({ params, url }) {
  const { pathname } = url;
  const res = await fetch(`${url.toString()}/config`);
  const data = await res.json();
  const { meetConfig } = data;

  if (res.ok) {
    if (meetConfig.resultsType === 'hytek') {
      // redirect to hytek results layout
      return new Response(undefined, {
        status: 307,
        headers: {
          Location: `${pathname}/hytek`
        }
      })
    } else {
      // unsupported results type
      return json$1({
  error: 'Results type not implemented'
}, {
        status: 500
      })
    }
  } else {
    return json$1({
  error: meetConfig.error
}, {
      status: 404
    })
  }
}
