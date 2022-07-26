import { db } from '$lib/services/meetDB';

export function GET() {
  if (db.size === 1) {
    let firstEventSlug = db.keys().next().value;
    console.log('Redirecting')
    return {
      status: 307,
      headers: {
        Location: `/meets/${firstEventSlug}`
      }
    }
  } else {
    // continue (fallthrough)
    return {
      status: 200
    }
  }
}
