/**
 * Wrapper function around Fetch API handling encoding and returning decoded HTML as promise
 * @param fileName
 * @param config Hytek options (hytekFtpLocation, hytekHtmlEncoding)
 * @returns {Promise<void>}
 */
export default async function fetchHytek(fileName, config) {
  const decoder = new TextDecoder(config.hytekHtmlEncoding);
  const parser = new DOMParser();
  const url = config.hytekFtpLocation + fileName; // join paths (trailing slash on ftp location)

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
        let parsedDoc = parser.parseFromString(decodedHtml, 'text/html');
        resolve(parsedDoc);
      } else {
        reject(res);
        // probably 404 not found
      }
    } catch (e) {
      // fetch-level error, possibly a network failure
      console.error('Fetch error', e);
      reject(e);
    }

  });
  return promise;
}
