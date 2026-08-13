const http = require('http');
const fs = require('fs');

const PORT = 1245;
const DB_FILE = process.argv[2];

function countStudents(path) {
  return new Promise((resolve, reject) => {
    if (!path) {
      reject(new Error('Cannot load the database'));
      return;
    }

    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data
        .split('\n')
        .filter((line) => line.trim().length > 0);

      if (lines.length <= 1) {
        resolve('Number of students: 0');
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

      const responseParts = [`Number of students: ${totalStudents}`];

      for (const [field, students] of Object.entries(fields)) {
        responseParts.push(
          `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`,
        );
      }

      resolve(responseParts.join('\n'));
    });
  });
}

const app = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.statusCode = 200;
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.statusCode = 200;
    const body = ['This is the list of our students'];

    countStudents(DB_FILE)
      .then((data) => {
        body.push(data);
        res.end(body.join('\n'));
      })
      .catch((err) => {
        body.push(err.message);
        res.end(body.join('\n'));
      });
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

app.listen(PORT);

module.exports = app;
