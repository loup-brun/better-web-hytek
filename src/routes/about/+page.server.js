import { error } from '@sveltejs/kit';

export async function load() {
  const res = await fetch(`https://data.corsaire-chaparral.org/items/resultats_web`);
  const pageData = await res.json();
  const page = pageData.data;

  const { about_content } = page;

  if (page) {
    return { about_content };
  }

  throw error(404, 'Not found')
}
