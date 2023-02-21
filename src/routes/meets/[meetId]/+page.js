export async function load({ parent }) {
  const data = await parent();
  const { meetConfig } = data;

  return { meetConfig }
}
