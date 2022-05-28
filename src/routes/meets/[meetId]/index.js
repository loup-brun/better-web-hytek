export async function get({ params, url }) {
  const { pathname } = url;
  const res = await fetch(`${url.toString()}/config`);
  const data = await res.json();
  const { meetConfig } = data;

  if (res.ok) {
    if (meetConfig.resultsType === 'hytek') {
      // redirect to hytek results layout
      return {
        status: 307,
        headers: {
          Location: `${pathname}/hytek`
        }
      }
    } else {
      // unsupported results type
      return {
        status: 500,
        error: 'Results type not implemented',
        body: {
          error: 'Results type not implemented'
        }
      }
    }
  } else {
    return {
      status: 404,
      error: meetConfig.error,
      body: {
        error: meetConfig.error
      }
    }
  }
}
