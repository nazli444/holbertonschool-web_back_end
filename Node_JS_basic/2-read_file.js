const fs = require('fs');

function countStudents(path) {
  try {
    // Faylı sinxron şəkildə utf-8 kodlaşdırması ilə oxuyuruq
    const fileContent = fs.readFileSync(path, 'utf-8');

    // Sətirlərə bölürük və boş sətirləri təmizləyirik
    const lines = fileContent
      .split('\n')
      .filter((line) => line.trim().length > 0);

    if (lines.length <= 1) {
      console.log('Number of students: 0');
      return;
    }

    // Header sətrini çıxarırıq (firstname,lastname,age,field)
    const studentLines = lines.slice(1);

    const fields = {};
    let totalStudents = 0;

    for (const line of studentLines) {
      const studentData = line.split(',');
      
      // Tələbə məlumatının tam olduğunu yoxlayırıq
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

    // Ümumi tələbə sayını çap edirik
    console.log(`Number of students: ${totalStudents}`);

    // Hər ixtisas üçün məlumatları çap edirik
    for (const [field, students] of Object.entries(fields)) {
      console.log(
        `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`
      );
    }
  } catch (error) {
    // Fayl tapılmadıqda və ya oxunmadıqda xəta atırıq
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
