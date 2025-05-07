// run this file via cli to convert a 1-word-per-line text file into a usable word list
// `node convert-list-to-array.js v1.txt`
const fs = require('fs');

// Main function
function processWordFile(file) {
  try {
    // Read file
    const fileContent = fs.readFileSync(file, 'utf8');
    const words = fileContent.trim().split('\n').filter(word => word.trim());
    console.log(`Read ${words.length} words from file ${file}`);

    // Find and remove duplicates
    const uniqueWords = [...new Set(words)];
    const duplicatesRemoved = words.length - uniqueWords.length;

    // Sort words alphabetically
    uniqueWords.sort();

    // Create output filename (same name but with .js extension)
    const outputFile = file.replace(/\.[^.]+$/, '.js');

    // Write unique, sorted words back to file
    fs.writeFileSync(outputFile, 'const Words = [\n');
    fs.appendFileSync(outputFile, uniqueWords.map(word => `"${word}",`).join('\n'));
    fs.appendFileSync(outputFile, '\n]\nexport default Words');

    console.log(`Processed file successfully:`);
    console.log(`- Found and removed ${duplicatesRemoved} duplicate words`);
    console.log(`- Sorted words alphabetically`);
    console.log(`- Created ${outputFile} with ${uniqueWords.length} unique words`);

  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

// Get the filename from command line arguments
const inputFile = process.argv[2];

if (!inputFile) {
  console.error('Error: Please provide a filename as an argument');
  console.log('Usage: node process-words.js filename.txt');
  process.exit(1);
}

// Run the script
processWordFile(inputFile);






































































