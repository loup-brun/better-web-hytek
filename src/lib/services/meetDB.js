export const db = new Map();

// set values w/ meetId as key
// TODO make DB schema (e.g. Supabase, Directus, ...)
db.set('laval-primaire-2022', {
  // meet info
  dateStart: '2022-05-18',
  dateEnd: '2022-05-18',
  title: 'Championnat régional primaire RSEQ Laval',
  stadiumName: 'Stade d’athlétisme Claude-Ferragne',
  address: '4600 Cyrille-Delage',
  address2: '',
  city: 'Laval',
  province: 'QC',
  postalCode: '',

  // résultats
  resultsType: 'hytek',
  finishlynx: true,
  hytekFtpLocation: 'https://corsaire-chaparral.org/resultats/direct/20220518/',
  hytekHtmlEncoding: 'ISO-8859-15',
  sessionNames: [ 'Pelouse', 'Piste' ],

  // personnalisation
  logo: '',
  themeColor: '#013871',

});

db.set('rseq-ll-primaire-2022', {
  dateStart: '2022-05-25',
  dateEnd: '2022-05-25',
  title: 'Mini-athlétisme RSEQ-LL',
  stadiumName: 'Stade d’athlétisme Richard-Garneau',
  address: '401 boul. du Domaine',
  address2: '',
  city: 'Ste-Thérèse',
  province: 'QC',
  postalCode: 'J7E 4S4',

  // résultats
  resultsType: 'hytek',
  hytekFtpLocation: 'https://corsaire-chaparral.org/resultats/direct/20220525/',
  hytekHtmlEncoding: 'ISO-8859-15',
  sessionNames: [ 'Piste', 'Pelouse' ],


  // personnalisation
  logo: '',
  themeColor: '#ff6800',
});

db.set('rseq-ll-2022', {
  dateStart: '2022-05-26',
  dateEnd: '2022-05-26',
  title: 'CRS d’athlétisme RSEQ Laurentides-Lanaudière',
  stadiumName: 'Stade d’athlétisme Richard-Garneau',
  address: '401 boul. du Domaine',
  address2: '',
  city: 'Ste-Thérèse',
  province: 'QC',
  postalCode: 'J7E 4S4',

  // résultats
  resultsType: 'hytek',
  hytekFtpLocation: 'https://corsaire-chaparral.org/resultats/direct/20220526/',
  hytekHtmlEncoding: 'ISO-8859-15',
  sessionNames: [ 'Piste', 'Pelouse' ],

  // personnalisation
  logo: '',
  themeColor: '#ff6800',
});

db.set('coch-inv-2022', {
  dateStart: '2022-05-29',
  dateEnd: '2022-05-29',
  title: 'Corsaire-Chaparral Invitation 2022',
  stadiumName: 'Stade d’athlétisme Richard-Garneau',
  address: '401 boul. du Domaine',
  address2: '',
  city: 'Ste-Thérèse',
  province: 'QC',
  postalCode: 'J7E 4S4',

  // résultats
  resultsType: 'hytek',
  hytekFtpLocation: 'https://corsaire-chaparral.org/resultats/direct/20220529/',
  hytekHtmlEncoding: 'ISO-8859-15',
  sessionNames: [ 'Piste', 'Pelouse' ],

  // personnalisation
  logo: '',
  themeColor: '#ff6800',
});
