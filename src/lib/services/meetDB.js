export const db = new Map();

// set values w/ meetId as key
// TODO make DB schema (e.g. Supabase, Directus, ...)

db.set('jdq-laval-2022', {
  dateStart: '2022-07-23',
  dateEnd: '2022-07-26',
  title: 'Jeux du Québec Laval 2022',
  stadiumName: 'Stade d’athlétisme Claude-Ferragne',
  address: '4600 rue Cyrille-Delage',
  address2: '',
  city: 'Laval',
  province: 'QC',
  postalCode: 'H7K 2S4',

  // résultats
  resultsType: 'hytek',
  hytekFtpLocation: 'https://corsaire-chaparral.org/resultats/direct/20220529/',
  hytekHtmlEncoding: 'ISO-8859-15',
  sessionNames: [
    'Jour 1 AM - Piste',
    'Jour 1 AM - Concours',
    'Jour 1 PM - Concours',
    'Jour 1 PM - Piste',
    'Jour 2 AM - Concours',
    'Jour 2 AM - Piste',
    'Jour 2 PM - Concours',
    'Jour 2 PM - Piste',
    'Jour 3 AM - Piste',
    'Jour 3 AM - Concours',
    'Jour 3 PM - Piste',
    'Jour 3 PM - Concours',
    'Jour 4 AM - Piste',
    'Jour 4 AM - Concours',
  ],

  // personnalisation
  logo: '/logos/jdq-2022.png',
  themeColor: '#013871',
});
