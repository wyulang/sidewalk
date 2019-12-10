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
// db.query(`SELECT * FROM user WHERE name='admin'`).then(res=>{
//   console.log('tag', res);
// })
console.log('isfile',fs.existsSync(path.join(__dirname, `./server/assets/`)))
// db.query(`update user set lgCount=lgCount+ ifnull(x,0) WHERE name='admin'`).then(res=>{
//   console.log('tag', res);
// })
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
