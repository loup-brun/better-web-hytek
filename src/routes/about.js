export async function GET() {
  const res = await fetch(`https://data.corsaire-chaparral.org/items/resultats_web`);
  const pageData = await res.json();
  const page = pageData.data;

  const { about_content } = page;

  if (page) {
    return {
      body: { about_content }
    };
  }

  return {
    status: 404,
    error: new Error('Not found')
  }
}
