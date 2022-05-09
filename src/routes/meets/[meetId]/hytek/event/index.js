export function get({ params }) {
  const { meetId } = params;

  // simple redirect if no events specified
  return {
    status: 307,
    headers: {
      Location: `/meets/${meetId}/hytek`
    }
  }
}
