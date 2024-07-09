import { meetsMap } from '$lib/services/meetsService';
import { json } from '@sveltejs/kit';

export function GET() {
  return json([...meetsMap.entries()]);
}
