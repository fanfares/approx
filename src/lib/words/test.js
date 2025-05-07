const fs = require('fs');

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

    // Sort words alphabetically
    uniqueWords.sort();

    // Write unique, sorted words back to file
    fs.writeFileSync('v1.js', 'const Words = [\n');
    fs.appendFileSync('v1.js', uniqueWords.map(word => `"${word}",`).join('\n'))
    fs.appendFileSync('v1.js', '\n]\nexport default Words');

    console.log(`Processed file successfully:`);
    console.log(`- Found and removed ${duplicatesRemoved} duplicate words`);
    console.log(`- Sorted words alphabetically`);
    console.log(`- File now contains ${uniqueWords.length} unique words`);

  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

// Run the script
processWordFile();
