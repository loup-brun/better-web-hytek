import { db } from '$lib/services/meetDB';

export async function get({ params }) {
  const { meetId } = params;
  let meetData;

  try {
    // fetch the meet config setup
    meetData = db.get(meetId);


    return {
      body: meetData
    }
  } catch (e) {
    // not found
    return {
      status: 404
    }
  }
}
