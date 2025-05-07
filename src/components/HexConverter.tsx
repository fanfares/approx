import { useState } from 'react';
import { hexToWords, getWordSubset } from '@/lib/wordUtils';

export default function HexConverter() {
  const [input, setInput] = useState('');
  const [convertedWords, setConvertedWords] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleConvert = () => {
    try {
      setError(null);
      if (!input) {
        setConvertedWords('');
        return;
      }
      const words = hexToWords(input);
      setConvertedWords(words);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setConvertedWords('');
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="mb-12 p-6 border rounded-lg bg-white shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Event ID to Words</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="hexInput" className="block text-sm font-medium text-gray-700 mb-1">
            Event ID (64 character hex)
          </label>
          <div className="flex gap-2">
            <input
              id="hexInput"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onBlur={handleConvert}
              placeholder="Enter event ID..."
              className="flex-1 p-2 border rounded"
            />
            <button
              onClick={handleConvert}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Convert
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {convertedWords && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Full Word Sequence</span>
                <button
                  onClick={() => copyToClipboard(convertedWords)}
                  className="text-sm text-blue-500 hover:text-blue-600"
                >
                  Copy All
                </button>
              </div>
              <p className="text-gray-800 break-words">{convertedWords}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">First 6 Words</span>
                <button
                  onClick={() => copyToClipboard(getWordSubset(convertedWords, 6))}
                  className="text-sm text-blue-500 hover:text-blue-600"
                >
                  Copy 6 Words
                </button>
              </div>
              <p className="text-gray-800">{getWordSubset(convertedWords, 6)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}