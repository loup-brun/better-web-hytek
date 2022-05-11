export const db = new Map();

// set values w/ meetId as key
// TODO make DB schema (e.g. Supabase, Directus, ...)
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

  logo: '',

  resultsType: 'hytek',
  hytekFtpLocation: 'https://sherbrooke.rsstiming.com/ftp/220319/',
  hytekHtmlEncoding: 'ISO-8859-15',
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

  logo: '',

  resultsType: 'hytek',
  hytekFtpLocation: 'https://sherbrooke.rsstiming.com/ftp/220319/',
  hytekHtmlEncoding: 'ISO-8859-15',
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

  logo: '',

  resultsType: 'hytek',
  hytekFtpLocation: 'https://sherbrooke.rsstiming.com/ftp/220319/',
  hytekHtmlEncoding: 'ISO-8859-15',
});
