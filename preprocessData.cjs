
const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'dataCopy.js');

// Read the file as text
fs.readFile(filepath, 'utf-8', (err, data) => {
    if (err) {
        console.error('Failed to read file:', err);
        return;
    }

    // Use a regular expression to replace date/time values
    // This pattern might need to be adjusted depending on the exact format of your date/time values
    const correctedData = data.replace(/:\s*([0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}Z)/g, ': "$1"');

    // Overwrite the original file, or write to a new file if you prefer
    fs.writeFile(filepath, correctedData, 'utf-8', err => {
        if (err) {
            console.error('Failed to write file:', err);
            return;
        }

        console.log('File corrected successfully.');
    });
});
