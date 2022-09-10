// throw new Error("@migration task: Migrate the load function input (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
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
    // throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
    return {
      meetConfig,
      meetId,
      eventId,
      evtIndexHTML: null
    }
  }
}
