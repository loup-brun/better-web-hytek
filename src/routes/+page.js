import { meetsMap } from '$lib/services/meetsService';

export function load() {
  let events = meetsMap.entries();

  return {
  events
}
}
