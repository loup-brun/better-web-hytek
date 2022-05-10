export async function get({ params }) {
  const { meetId } = params;

  // fetch the meet config setup
  return {
    body: {
      hytekFtpLocation: 'https://sherbrooke.rsstiming.com/ftp/220319/',
      hytekHtmlEncoding: 'ISO-8859-15',
    }
  }
}
