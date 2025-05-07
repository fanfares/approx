import { SimplePool, Filter, Event, Sub } from 'nostr-tools';

const RELAYS = [
  'wss://relay.damus.io',
  'wss://relay.nostr.band',
  'wss://nos.lol',
  'wss://relay.snort.social',
  'wss://nostr.mom',
  'wss://relay.primal.net',
];

export async function lookupEvents(bytes: Uint8Array): Promise<Event[]> {
  const pool = new SimplePool();
  const hexString = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');

  // Create a filter for events containing our byte pattern
  const filter: Filter = {
    ids: [hexString],
  };

  let events: Event[] = [];
  try {
    // Subscribe to events from all relays
    const sub: Sub = pool.sub(RELAYS, [filter]);

    // Collect events for 2 seconds
    await new Promise((resolve) => {
      sub.on('event', (event: Event) => {
        events.push(event);
      });
      setTimeout(resolve, 2000);
    });

    // For kind 1233 events, fetch the linked events
    const linkedEvents = await Promise.all(
      events
        .filter(event => event.kind === 1233)
        .map(async (event) => {
          const linkedId = event.tags.find(tag => tag[0] === 'e')?.[1];
          if (!linkedId) return null;

          const linkedFilter: Filter = {
            ids: [linkedId],
          };

          const linkedEvent = await pool.get(RELAYS, linkedFilter);
          return linkedEvent;
        })
    );

    // Add valid linked events to the results
    events = [...events, ...linkedEvents.filter((e): e is Event => e !== null)];

    return events;
  } finally {
    pool.close(RELAYS);
  }
}
