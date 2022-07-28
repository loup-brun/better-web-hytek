import { meetsMap } from '$lib/services/meetsService';

export async function GET({ params }) {
  const { meetId } = params;

  // use a try block for when we’ll really fetch from a DB
  // and getting will throw
  try {
    // early check if meet exists in DB
    if (!meetsMap.has(meetId)) {
      throw `Event with meetId '${meetId}' not found.`;
    }

    return {
      body: {
        // fetch the meet config setup
        meetConfig: meetsMap.get(meetId)
      }
    }
  } catch (error) {
    // not found (if DB.get() method throws)
    return {
      status: 404,
      body: {
        error
      }
    }
  }
}
