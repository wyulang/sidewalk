const db =require('./server/db.js');
const table =require('./server/table.js');
const sql = require('node-transform-mysql');
const path = require('path');
const fs = require('fs-extra');
// db.query(db.drop('student'))
// db.query(db.sql.table('user').data({name:33333}).insert())
// db.query(db.sql.table('nets').select()).then(res=>{
//   console.log('tag', res);
// })
db.query(`select count(id) as count from user where name='fawefa';select count(id) as count from user where phone='fawefa'`).then(res=>{
  console.log('tag', res.data[1][0].count);
})
// console.log('isfile',fs.existsSync(path.join(__dirname, `./server/assets/`)))
// db.query(`update user set lgCount=lgCount+ ifnull(x,0) WHERE name='admin'`).then(res=>{
//   console.log('tag', res);
// })
// db.query(table['net']).then(result => {
//   // res.json(result)
//   console.log('table', result.data.warningCount)
// })

// console.log(db.sql.table('user').data({name:'fwea',email:'faefa'}).where({id:11}).update())

// db.query('SELECT SQL_CALC_FOUND_ROWS id from user;SELECT FOUND_ROWS() as total;').then(res=>{
//   console.log('table',   res.data[0],  res.data[1][0].total)
// })
// fs.remove("fawefafw")
// db.query('select * from user').then(res=>{
//   console.log('table', res)
// })
