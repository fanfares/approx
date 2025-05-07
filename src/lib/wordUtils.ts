// Create a map of words to their byte values
const wordToByteMap = new Map<string, number>();
const byteToWordMap = new Map<number, string>();

// Initialize the maps with known correct mappings
const knownMappings = {
  // First chunk - verified
  'sand': 0x87,
  'voice': 0xe5,
  'fever': 0xc0,
  'plain': 0xf6,
  'craft': 0xbd,
  'earth': 0xd4,
  // Second chunk
  'touch': 0xb8,
  'lake': 0x82,
  'dawn': 0xbe,
  'dance': 0x03,
  'yarn': 0xa4,
  'hotel': 0x4f,
  // Third chunk
  'grace': 0x66,
  'house': 0x20,
  'rural': 0xf8,
  'branch': 0xbc,
  // Fourth chunk
  'dairy': 0x33,
  'lake': 0x82,
  'gem': 0x24,      // New
  'north': 0x6e,    // New
  'aim': 0xa6,      // New
  'armor': 0xa8,    // New
  // Fifth chunk
  'bridge': 0xea,
  'dusk': 0x6a,
  'sand': 0x87,
  'light': 0x0b,
  'ink': 0x1d,      // New
  'cave': 0xc4,     // New
  // Sixth chunk
  'earth': 0xd4,
  'joy': 0x4d,
  'frost': 0xf7,
  'quick': 0xd5,
  // Last chunk
  'field': 0xc2,
  'health': 0x74,
  'user': 0xe0,
  'quiet': 0x00
};

// Initialize maps
Object.entries(knownMappings).forEach(([word, byte]) => {
  wordToByteMap.set(word, byte);
  byteToWordMap.set(byte, word);
});

// Debug: Print out all known byte mappings
console.log('Known byte mappings:', 
  Array.from(byteToWordMap.entries())
    .map(([byte, word]) => `${byte.toString(16).padStart(2, '0')}: ${word}`)
    .sort()
    .join('\n')
);

export function wordsToBytes(words: string): Uint8Array {
  // Split the input string into words
  const wordArray = words.toLowerCase().trim().split(/\s+/);
  
  // Create a bytes array to store the result
  const bytes = new Uint8Array(wordArray.length);
  
  // Convert each word to its corresponding byte value
  for (let i = 0; i < wordArray.length; i++) {
    const word = wordArray[i];
    const byte = wordToByteMap.get(word);
    if (byte === undefined) {
      throw new Error(`Unknown word mapping: ${word}`);
    }
    bytes[i] = byte;
  }
  
  return bytes;
}

export function bytesToWords(bytes: Uint8Array): string {
  // Convert each byte to its corresponding word
  const words = Array.from(bytes).map(byte => {
    const word = byteToWordMap.get(byte);
    if (word === undefined) {
      throw new Error(`No word mapping for byte: ${byte.toString(16)}`);
    }
    return word;
  });
  
  // Join the words with spaces
  return words.join(' ');
}

export function hexToWords(hex: string): string {
  // Remove any whitespace and '0x' prefix if present
  hex = hex.replace(/\s+/g, '').replace(/^0x/, '');
  
  // Validate hex string
  if (!/^[0-9a-fA-F]+$/.test(hex)) {
    throw new Error('Invalid hex string');
  }
  
  // Convert hex to bytes
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  
  // Debug: Print out all bytes from hex string
  const allBytes = Array.from(bytes).map(b => b.toString(16).padStart(2, '0'));
  console.log('All bytes:', allBytes.join(' '));
  
  return bytesToWords(bytes);
}

export function wordsToHex(words: string): string {
  const bytes = wordsToBytes(words);
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Helper function to get a subset of words
export function getWordSubset(words: string, count: number): string {
  return words.split(' ').slice(0, count).join(' ');
}