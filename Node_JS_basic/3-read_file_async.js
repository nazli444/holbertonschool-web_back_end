const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data
        .split('\n')
        .filter((line) => line.trim().length > 0);

      if (lines.length <= 1) {
        console.log('Number of students: 0');
        resolve();
        return;
      }

      const studentLines = lines.slice(1);
      const fields = {};
      let totalStudents = 0;

      for (const line of studentLines) {
        const studentData = line.split(',');

        if (studentData.length >= 4) {
          const firstName = studentData[0].trim();
          const field = studentData[3].trim();

          if (!fields[field]) {
            fields[field] = [];
          }
          fields[field].push(firstName);
          totalStudents += 1;
        }
      }

      console.log(`Number of students: ${totalStudents}`);

      for (const [field, students] of Object.entries(fields)) {
        console.log(
          `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`,
        );
      }

      resolve();
    });
  });
}

module.exports = countStudents;
