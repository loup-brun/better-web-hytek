import { redirect } from '@sveltejs/kit';

import {
  DB_TYPE,
  BASEROW_URL,
  BASEROW_DATABASE_ID,
  BASEROW_INSTANCE_ROW_ID,
  BASEROW_INSTANCE_TABLE_ID,
  BASEROW_MEETS_TABLE_ID,
  BASEROW_TOKEN
} from '$env/static/private';

export async function load() {
  let configuration = await getMeetsIndex();

  const { meets } = configuration;

  /**
   * Redirect to event if there’s only a single event
   */
  if (meets.length === 1) {
    let firstmeetslug = meets[0];
    throw redirect(307, `/meets/${firstmeetslug}`);
  } else {
    // pass meets to page data
    return {
      meets: [...configuration.meets],
    };
  }
}

/**
 * Get meets index (depending on storage adapter)
 * @returns {Promise<{ meets: Array<any> }>}
 */
async function getMeetsIndex() {
  if (DB_TYPE === 'file') {
    try {
      const { meets } = await import('$lib/db');
      const meetsMap = new Map();
      return {
        meets: [...meets]
      };
    } catch (e) {

    }
  }

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

      const { meets } = instanceData;

      const meetsMap = new Map();
    
      meets.forEach((meet, index) => {
        meetsMap.set(meet.value, {
          id: meet.value,
          slug: meet.value,
          title: instanceData.meetsNames[index].value,
          dateStart: instanceData.meetsDateStart[index].value,
          dateEnd: instanceData.meetsDateEnd[index].value, 
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
