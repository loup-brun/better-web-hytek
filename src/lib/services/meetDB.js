export const db = new Map();

// set values w/ meetId as key
// TODO make DB schema (e.g. Supabase, Directus, ...)
db.set('prov-civil-jun-sen-para-2022', {
  // meet info
  dateStart: '2022-07-30',
  dateEnd: '2022-07-31',
  title: 'Championnat provincial civil jun-sen-para ',
  stadiumName: 'PEPS de l’Université Laval',
  address: '',
  address2: '',
  city: 'Québec',
  province: 'QC',
  postalCode: '',

  // résultats
  resultsType: 'hytek',
  finishlynx: true,
  hytekFtpLocation: 'https://rsstiming.com/quebec/220730/',
  hytekHtmlEncoding: 'ISO-8859-15',
  sessionNames: [
    'Samedi piste',
    'Samedi concours',
    'Dimanche piste',
    'Dimanche concours',
  ],

  // personnalisation
  logo: '',
  themeColor: '#EB1C20',

});
