const db =require('./server/db.js');
const table =require('./server/table.js');
const sql = require('node-transform-mysql');
// db.query(db.drop('student'))
// db.query(db.sql.table('user').data({name:33333}).insert())
// db.query(db.sql.table('nets').select()).then(res=>{
//   console.log('tag', res);
// })
db.query(`SELECT SQL_CALC_FOUND_ROWS * FROM user WHERE 1=1 and (name= 'wyulang' or )`).then(res=>{
  console.log('tag', res);
})
// db.query(table['net']).then(result => {
//   // res.json(result)
//   console.log('table', result.data.warningCount)
// })

// console.log(db.sql.table('user').data({name:'fwea',email:'faefa'}).where({id:11}).update())

// db.query('DROP TABLE user').then(res=>{
//   console.log('table', res)
// })
// db.query('select * from user').then(res=>{
//   console.log('table', res)
// })
