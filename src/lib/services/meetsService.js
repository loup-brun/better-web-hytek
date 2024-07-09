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
 */
export async function getMeetsIndex() {
  // database is a local JSON file
  if (DB_TYPE === 'file') {
    try {
      const { meets } = await import('$lib/db');
      const meetsMap = new Map();

      meets.map(meet => {
        // set values w/ meetId as key
        meetsMap.set(meet.id, meet);
      });

      return {
        meets: [...meets.entries()]
      };
    } catch (e) {
      console.error('Error loading local db.js file', e);
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

      const meetsMap = new Map();
    
      meets.forEach((meet, index) => {
        meetsMap.set(meet.value, {
          id: meet.value,
          title: meetsNames[index].value,
          dateStart: meetsDateStart[index].value,
          dateEnd: meetsDateEnd[index].value, 
        });
      });

      return {
        meets: meetsMap.entries(),
      };
    } catch (e) {
      console.error('Error fetching Baserow instance configuration', e);
    }
  }
}

/**
 * 
 * @param {string} meetId Slug/uid of the meet.
 */
export async function getSingleMeet(meetSlug) {
  // database is a local JSON file
  if (DB_TYPE === 'file') {
    try {
      const { meets } = await import('$lib/db');
      const meetsMap = new Map();

      meets.map(meet => {
        // set values w/ meetId as key
        meetsMap.set(meet.id, meet);
      });

      if (!meetsMap.has(meetSlug)) {
        throw new Error('404');
      } else {
        return new Promise.resolve(meetsMap.get(meetSlug));
      }
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
      const meetData = (await request.json()).results[0];
      return {
        ...meetData,
        sessionNames: meetData.sessionNamesCsv.split(','),
        hytekHtmlEncoding: meetData.hytekHtmlEncoding?.value,
        logo: meetData.logoFile.url,
      };
    } catch (e) {
      console.error(`Error fetching meet with slug "${meetSlug}" from Baserow`, e);
    }
  }
}

/**
 * DEPRECATED - NO LONGER USED
 * Exported service is a JS map
 * @type {Map}
 * */
export const meetsMap = new Map();
