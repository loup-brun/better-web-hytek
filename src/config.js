export const APP_CONFIG = {
  // The FTP location should ideally be on the same domain
  // to avoid CORS issues -- unless the server is configured
  // with proper HTTP headers (esp. allow-origin)
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
  //
  // Also, MUST keep the trailing slash (e.g. '/ftp/meet20220222/')
  //hytekFtpLocation: '/ftp/210731/',
  hytekFtpLocation: '/ftp/170610/',

  // Encoding may vary, but tested with HyTek 5 works with 'ISO-8859-15'
  hytekHtmlEncoding: 'ISO-8859-15',

  // title slots
  company: 'COCH',
  name: 'Résultats 2022',
  version: 'v0.1.0',

  // basic theming
  themeColor: '#ff6900',
};
