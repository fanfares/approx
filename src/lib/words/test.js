const fs = require('fs');
const crypto = require('crypto');

// Function to hash a string using SHA-256
function hashString(str) {
  return crypto.createHash('sha256').update(str).digest('hex');
}

// Main function
function processWordFile() {
  const filePath = 'v1.txt';

  try {
    // Read file
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const words = fileContent.trim().split('\n').filter(word => word.trim());
    console.log(`Read ${words.length} words from file`);

    // Find and remove duplicates
    const uniqueWords = [...new Set(words)];
    const duplicatesRemoved = words.length - uniqueWords.length;

    if (duplicatesRemoved > 0) {
      console.log(`Found and removed ${duplicatesRemoved} duplicate words`);

      // Write unique words back to file
      fs.writeFileSync(filePath, uniqueWords.join('\n'));
      console.log(`File now contains ${uniqueWords.length} unique words`);
    } else {
      console.log('No duplicate words found in the file');
    }

    // Generate hashes for each word
    console.log('\nGenerating SHA-256 hashes for each word:');
    const wordHashes = new Map();

    uniqueWords.forEach(word => {
      const hash = hashString(word);
      wordHashes.set(word, hash);
      // console.log(`${word}: ${hash}`);
    });

  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

// Run the script
processWordFile();
