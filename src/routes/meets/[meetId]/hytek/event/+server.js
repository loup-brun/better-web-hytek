export function GET({ url }) {
  const { pathname } = url;
  const redirectPath = pathname.replace(/\/event\/?$/g, '');

  // simple redirect if no events specified
  return new Response(undefined, {
    status: 307,
    headers: {
      Location: `${redirectPath}`
    }
  })
}
