const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohort_name = process.argv[2];
const limit = process.argv[3];

pool.query(`
SELECT students.id, students.name AS student_name, cohorts.name AS cohort_name
FROM students
JOIN cohorts ON students.cohort_id = cohorts.id
WHERE cohorts.name LIKE '%${cohort_name}%'
LIMIT ${limit} || 5;
`)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.student_name} has an id of ${user.id} and was in the ${user.cohort_name} cohort`);
  })
})
.catch(err => console.error('query error', err.stack));
