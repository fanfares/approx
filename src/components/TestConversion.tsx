import { useState } from 'react';
import { hexToWords, getWordSubset, wordsToHex } from '@/lib/wordUtils';
import { wordList } from '@/lib/wordList';

export default function TestConversion() {
  const [results, setResults] = useState<string[]>([]);
  const eventId = '87e5c0f6bdd4b882be03a44f6620f8bc3382246ea6a8870b1dc44df7d5c274e0';

  const runTest = () => {
    const output: string[] = [];
    
    output.push(`Original event ID: ${eventId}`);
    output.push(`First 12 chars: ${eventId.slice(0, 12)}`);

    // Convert full event ID to words
    const allWords = hexToWords(eventId);
    output.push(`\nFull word sequence: ${allWords}`);

    // Get first 6 words
    const firstSixWords = getWordSubset(allWords, 6);
    output.push(`\nFirst 6 words: ${firstSixWords}`);

    // Show individual word mappings
    output.push('\nWord to byte mappings:');
    const words = firstSixWords.split(' ');
    words.forEach((word, i) => {
      const index = wordList.indexOf(word);
      const expectedByte = eventId.slice(i*2, i*2+2);
      output.push(`${word}: index=${index} (hex: ${index.toString(16).padStart(2, '0')}) | Expected: ${expectedByte}`);
    });

    // Convert 6 words back to hex
    const hexFromWords = wordsToHex(firstSixWords);
    output.push(`\nHex from 6 words: ${hexFromWords}`);

    // Compare
    const matches = eventId.startsWith(hexFromWords);
    output.push(`\nDoes it match the start of original event ID? ${matches}`);
    
    if (!matches) {
      output.push(`Expected: ${eventId.slice(0, hexFromWords.length)}`);
      output.push(`Got:      ${hexFromWords}`);
    }

    setResults(output);
  };

  return (
    <div className="p-6 border rounded-lg bg-white shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Conversion Test</h2>
      <button
        onClick={runTest}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
      >
        Run Test
      </button>
      {results.length > 0 && (
        <pre className="p-4 bg-gray-50 rounded whitespace-pre-wrap font-mono text-sm">
          {results.join('\n')}
        </pre>
      )}
    </div>
  );
}