import {
  DB_TYPE,
  BASEROW_URL,
  BASEROW_INSTANCE_TABLE_ID,
  BASEROW_MEETS_TABLE_ID,
  BASEROW_INSTANCE_ROW_ID,
  BASEROW_TOKEN,
} from '$env/static/private';

/**
 * Meets index
 * @returns {Promise<{ meets: Array<any> }}
 * @throws {Error}
 */
export async function getMeetsIndex() {
  // database is a local JSON file
  if (DB_TYPE === 'file') {
    try {
      const { meets } = (await import('$lib/db.json')).default;
      // const meetsMap = new Map();

      // meets.map(meet => {
      //   // set values w/ meet slug as key
      //   meetsMap.set(meet.id, meet);
      // });

      return new Promise((resolve, reject) => {
        resolve({
          meets
        });
      });
    } catch (e) {
      console.error(`Error loading local "db.json" file`, e);
      throw new Error('Error loading local db file');
    }
  }

  // Baserow backend (hosted or self-hosted)
  if (DB_TYPE === 'baserow') {
    try {
      const request = await fetch(`${BASEROW_URL}/api/database/rows/table/${BASEROW_INSTANCE_TABLE_ID}/${BASEROW_INSTANCE_ROW_ID}/?user_field_names=true`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Token ${BASEROW_TOKEN}`,
        },
      });
      /** @type {{ meets: Array<any>; meetsName: Array<{ value: string; }; meetsDateStart: Array<{ value: string; }; meetsDateEnd: Array<{ value: string; }; >}} */
      const instanceData = await request.json();

      const {
        // `meets` is a link field. Only the first field in the `meets` table
        // is returned as value.
        // `meetsNames`, `meetsDateStat`, etc. all map to the corresponding entity, in order
        // e.g.:
        //   meets: [{ value: 'meet-1' }, { value: 'meet-2'}]
        //   meetsName" [{ value: 'Meet #1' }, { value: 'Meet #2 }]
        //    ...
        meets,
        meetsNames,
        meetsDateStart,
        meetsDateEnd
      } = instanceData;

      /** @type {Map<string, object>} */
      const meetsMap = new Map();
    
      // iterating over `meets` is necessary to map the slugs to the names, dateStart, etc.
      meets.forEach((meet, index) => {
        meetsMap.set(meet.value, {
          id: meet.value,
          title: meetsNames[index].value,
          dateStart: meetsDateStart[index].value,
          dateEnd: meetsDateEnd[index].value, 
        });
      });

      return new Promise((resolve, reject) => {
        resolve({
          meets: [...meetsMap.entries()]
        });
      });
    } catch (e) {
      console.error('Error fetching Baserow instance configuration', e);
      throw new Error('Error fetching Baserow instance configuration');
    }
  }
}

/**
 * Get the data for a single meet
 * @param {string} meetSlug Slug/uid of the meet.
 * @returns {Promise<{ title: string; slug: string; }>} Successful call returns the meet object
 * @returns {Promise<{ status: number }>} A rejected promise returns a shallow object with HTTP status code
 */
export async function getSingleMeet(meetSlug) {
  // database is a local JSON file
  if (DB_TYPE === 'file') {
    try {
      const { meets } = (await import('$lib/db.json')).default;
      const meetsMap = new Map();

      meets.map(meet => {
        // set values w/ meet slug as key
        meetsMap.set(meet.id, meet);
      });

      return new Promise((resolve, reject) => {
        if (!meetsMap.has(meetSlug)) {
          reject({ status: 404 });
        } else {
          resolve(meetsMap.get(meetSlug));
        }
      });
    } catch (e) {
      console.error('Error fetching meet from local file', e);
    }
  }

  // Baserow backend (hosted or self-hosted)
  if (DB_TYPE === 'baserow') {
    try {
      const request = await fetch(`${BASEROW_URL}/api/database/rows/table/${BASEROW_MEETS_TABLE_ID}/?user_field_names=true&filter__slug__equal=${meetSlug}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Token ${BASEROW_TOKEN}`,
        },
      });

      // request returns a `results` object with (ideally) a single meet -- grab the first one
      /** @type {Object | undefined} */
      const meetData = (await request.json()).results[0];

      return new Promise((resolve, reject) => {
        // reject if meetData is undefined
        if (!meetData) {
          reject({ status: 404 });
        } else {
          resolve({
            ...meetData,
            sessionNames: meetData.sessionNamesCsv.split(','),
            hytekHtmlEncoding: meetData.hytekHtmlEncoding?.value,
            logo: meetData.logoFile.url,
          });
        }
      });
    } catch (e) {
      console.error(`Error fetching meet with slug "${meetSlug}" from Baserow`, e);
      return new Promise().reject('404')
    }
  }
}

/**
 * DEPRECATED - NO LONGER USED
 * Exported service is a JS map
 * @type {Map}
 * */
export const meetsMap = new Map();
