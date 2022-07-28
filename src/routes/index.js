import { meetsMap } from '$lib/services/meetsService';

export function GET() {
  if (meetsMap.size === 1) {
    let firstEventSlug = meetsMap.keys().next().value;
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
