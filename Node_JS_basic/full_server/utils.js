import fs from 'fs';

const readDatabase = (filePath) => new Promise((resolve, reject) => {
  if (!filePath) {
    reject(new Error('Cannot load the database'));
    return;
  }

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return;
    }

    const lines = data
      .split('\n')
      .filter((line) => line.trim().length > 0);

    if (lines.length <= 1) {
      resolve({});
      return;
    }

    const studentLines = lines.slice(1);
    const fields = {};

    for (const line of studentLines) {
      const studentData = line.split(',');

      if (studentData.length >= 4) {
        const firstName = studentData[0].trim();
        const field = studentData[3].trim();

        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(firstName);
      }
    }

    resolve(fields);
  });
});

export default readDatabase;
