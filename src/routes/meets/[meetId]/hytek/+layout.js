export async function load({ fetch, params, parent }) {
  const data = await parent();
  const { meetId, eventId } = params;
  const { meetConfig } = data ;

  // get the event list
  try {
    const getEvtIndex = await fetch(`/meets/${meetId}/hytek/evtindex`);
    const { evtIndexHTML } = await getEvtIndex.json();

    return {
      evtIndexHTML,
      meetConfig,
      meetId,
      eventId,
    }
  } catch (e) {
    console.warn('Could not fetch event index', e);
    // todo: should warn user there is a config problem (event list will never load)
    return {
      meetConfig,
      meetId,
      eventId,
      evtIndexHTML: null
    }
  }
}
