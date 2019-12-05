const db =require('./server/db.js');
const table =require('./server/table.js');
const sql = require('node-transform-mysql');
// db.query(db.drop('student'))
// db.query(db.sql.table('user').data({name:33333}).insert())
// db.query(db.sql.table('nets').select()).then(res=>{
//   console.log('tag', res);
// })
db.query("INSERT INTO user (name,phone,email,sex,type,remark,city,password,createTime) VALUES ('admin','15070909242','wyulang@163.com','1','1','011,011002,011002005','ekidtf','1575533833299')").then(res=>{
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
