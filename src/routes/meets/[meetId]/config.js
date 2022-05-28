import { db } from '$lib/services/meetDB';

export async function get({ params }) {
  const { meetId } = params;
  let meetData;

  // use a try block for when we’ll really fetch from a DB
  // and getting will throw
  try {
    // fetch the meet config setup
    meetData = db.get(meetId);

    // since current implementation is just a Map(),
    // querying a non-existant key will not throw.
    if (!meetData) {
      return {
        status: 404,
        body: {
          error: 'Not found'
        }
      }
    }

    return {
      body: meetData
    }
  } catch (e) {
    // not found (if DB.get() method throws)
    return {
      status: 404
    }
  }
}
