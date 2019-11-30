<<<<<<< HEAD
const db=require('./server/db.js');
db.query(db.select('user')).then(res=>{
    console.log(rea)
})
=======
const db =require('./server/db.js');
const table =require('./server/table.js');
const sql = require('node-transform-mysql');
// db.query(db.drop('student'))
// db.query(db.sql.table('user').data({name:33333}).insert())
db.query(db.sql.table('nets').select()).then(res=>{
  console.log('tag', res);
})
// db.query(db.selectTable('demo')).then(res=>{
//   console.log('tag', res);
// });
// db.route('/api/user/add',(res,err)=>{
  
// })
>>>>>>> 81b0b737a64b854a2d696eab140d783d825cac44
