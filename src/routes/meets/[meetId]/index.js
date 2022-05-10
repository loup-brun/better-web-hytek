export function get({ params }) {
  const { meetId } = params;

  // simple redirect to hytek
  return {
    status: 307,
    headers: {
      Location: `/meets/${meetId}/hytek`
    }
  }
}
