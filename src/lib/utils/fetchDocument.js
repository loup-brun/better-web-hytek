/**
 * Wrapper function around Fetch API handling encoding and returning decoded HTML through promise
 * @param fileName
 * @param config {Object}
 * @returns {Promise<void>} Returns parsed document object if promise is ok, else the error
 */
export default async function fetchDocument(fetch, fileName, config) {
  config = config || {
    encoding: 'utf-8',
    baseLocation: '/',
  };

  const decoder = new TextDecoder(config.encoding);
  // const parser = new DOMParser(); // browser-only api
  const url = config.baseLocation + fileName; // join paths (trailing slash on ftp location)

  const promise = new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(url, {
        headers: {
          'Accept': 'text/html',
          'Content-Type': 'text/html',
        }
      });
      // check status
      if (res.ok) {
        const eventBuffer = await res.arrayBuffer();
        // parse HTML
        let decodedHtml = decoder.decode(eventBuffer);
        // create a DOM
        // let parsedDoc = parser.parseFromString(decodedHtml, 'text/html');
        resolve(decodedHtml);
      } else {
        reject(res);
        // probably 404 not found
      }
    } catch (e) {
      // fetch-level error, possibly a network failure, CORS issue, etc.
      reject(e);
    }

  });
  return promise;
}
