'use client';

import { useState } from 'react';
import { Event } from 'nostr-tools';
import { wordsToBytes } from '@/lib/wordUtils';
import { lookupEvents } from '@/lib/nostrUtils';
import HexConverter from '@/components/HexConverter';

export default function Home() {
  const [input, setInput] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const bytes = wordsToBytes(input);
      const foundEvents = await lookupEvents(bytes);
      setEvents(foundEvents);
      if (foundEvents.length === 0) {
        setError('No events found');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Nostr Event Lookup</h1>

      {/* Word to Event Search */}
      <div className="mb-12 p-6 border rounded-lg bg-white shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Search Events by Words</h2>
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter words separated by spaces..."
              className="flex-1 p-2 border rounded"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {error && (
          <div className="p-4 mb-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {events.length > 0 && (
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="p-4 border rounded">
                <div className="text-sm text-gray-500 mb-2">
                  Kind: {event.kind} | Created: {new Date(event.created_at * 1000).toLocaleString()}
                </div>
                <div className="whitespace-pre-wrap">{event.content}</div>
                {event.tags.length > 0 && (
                  <div className="mt-2 text-sm text-gray-500">
                    Tags: {event.tags.map(tag => tag.join(':')).join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Event ID to Words Converter */}
      <HexConverter />

    </main>
  );
}
