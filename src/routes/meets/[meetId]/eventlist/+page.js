export async function load({ fetch, params }) {
  const { meetId } = params;
  let error;

  try {
    // get the event list
    const getEvtIndex = await fetch(`/meets/${meetId}/hytek/evtindex`);
    const { evtIndexHTML } = await getEvtIndex.json();

    return {
  meetId,
  evtIndexHTML,
}
  } catch (e) {
    console.error('Error fetching event index', e);
    error = e;

    return {
  error
}
  }
}
