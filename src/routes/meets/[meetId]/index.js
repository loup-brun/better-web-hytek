export async function get({ params, url }) {
  const { pathname } = url;
  const res = await fetch(`${url.toString()}/config`);
  const meetConfig = await res.json();

  console.log('res.ok', res.ok)

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
        body: {
          error: 'Results type not implemented'
        }
      }
    }
  } else {
    return {
      status: 404,
      body: {
        error: 'Not found'
      }
    }
  }
}
