import { wordList } from './wordList';

// Test specific conversion
const eventId = '87e5c0f6bdd4';
const fullWords = 'sand voice fever plain craft earth';

console.log('Word mappings:');
const words = fullWords.split(' ');
words.forEach((word, i) => {
  const index = wordList.indexOf(word);
  console.log(`${word}: ${index} (hex: ${index.toString(16).padStart(2, '0')})`);
  console.log(`Expected byte: ${eventId.slice(i*2, i*2+2)}`);
  console.log('---');
});