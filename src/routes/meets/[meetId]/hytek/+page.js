throw new Error("@migration task: Migrate the load function input (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
export async function load({ parent }) {
  const data = await parent();
  const { meetConfig } = data;

  return { meetConfig }
}
