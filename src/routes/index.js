import { db } from '$lib/services/meetDB';

export function get() {
  if (db.size === 1) {
    let firstEventSlug = db.keys().next().value;
    console.log('Redirecting')
    return {
      status: 307,
      headers: {
        Location: `/meets/${firstEventSlug}`
      }
    }
  }
}
