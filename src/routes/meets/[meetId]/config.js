import { db } from '$lib/services/meetDB';

export async function GET({ params }) {
  const { meetId } = params;

  // use a try block for when we’ll really fetch from a DB
  // and getting will throw
  try {
    // early check if meet exists in DB
    if (!db.has(meetId)) {
      throw `Event with meetId '${meetId}' not found.`;
    }

    return {
      body: {
        // fetch the meet config setup
        meetConfig: db.get(meetId)
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
