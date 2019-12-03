const db =require('./server/db.js');
const table =require('./server/table.js');
const sql = require('node-transform-mysql');
// db.query(db.drop('student'))
// db.query(db.sql.table('user').data({name:33333}).insert())
// db.query(db.sql.table('nets').select()).then(res=>{
//   console.log('tag', res);
// })
// db.query("SELECT * FROM information_schema.SCHEMATA where SCHEMA_NAME='demo1'").then(res=>{
//   console.log('tag', res);
// })
db.query(table['net']).then(result => {
  // res.json(result)
  console.log('table', result.data.warningCount)
})

// db.query('DROP TABLE user').then(res=>{
//   console.log('table', res)
// })
