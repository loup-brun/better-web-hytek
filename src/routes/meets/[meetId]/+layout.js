import { error } from '@sveltejs/kit';

export async function load({ fetch, params, parent }) {
  const { meetId } = params;
  const data = await parent();
  const { meetConfig } = data;

  try {
    const res = await fetch(`/meets/${meetId}/config`);
    const { meetConfig } = await res.json();

    if (res.ok) {
      // throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
      return {
        // pass down the meet config to child layouts
        meetConfig
      };
    } else {
      throw error(404);
    }
  } catch (e) {
    console.error('Error fetching meet config', e);
  }
}
