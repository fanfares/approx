import { hexToWords, getWordSubset, wordsToHex } from './wordUtils';

// Test case with your specific event ID
const eventId = '87e5c0f6bdd4b882be03a44f6620f8bc3382246ea6a8870b1dc44df7d5c274e0';

console.log('Original event ID:', eventId);
console.log('First 12 chars:', eventId.slice(0, 12));

// Convert full event ID to words
const allWords = hexToWords(eventId);
console.log('\nFull word sequence:', allWords);

// Get first 6 words
const firstSixWords = getWordSubset(allWords, 6);
console.log('\nFirst 6 words:', firstSixWords);

// Convert 6 words back to hex
const hexFromWords = wordsToHex(firstSixWords);
console.log('\nHex from 6 words:', hexFromWords);

// Compare
const matches = eventId.startsWith(hexFromWords);
console.log('\nDoes it match the start of original event ID?', matches);
if (!matches) {
    console.log('Expected:', eventId.slice(0, hexFromWords.length));
    console.log('Got:     ', hexFromWords);
}