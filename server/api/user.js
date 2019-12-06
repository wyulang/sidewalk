var express = require('express');
var router = express.Router();
const db = require('../db.js');

router.post('/list', (req, res) => {
  let param = req.body;
  let sqlData = "SELECT SQL_CALC_FOUND_ROWS * FROM user WHERE 1=1";
  if (param.value) {
    sqlData += ` and concat (name,phone,email) like '%${param.value}%' `;
  }
  if (param.type) {
    sqlData += ` and type=${param.type}`;
  }
  sqlData += `; SELECT FOUND_ROWS() as total;`;
  db.query(sqlData).then(result => {
    res.json({ code: result.code, data: result.data[0], total: result.data[1][0].total })
  })
})

router.post('/update', (req, res) => {
  let param = req.body;
  if (param.id) {
    let where = { id: param.id };
    delete param.id
    db.query(db.sql.table("user").data(param).where(where).update()).then(result => {
      if (result.code == 2000) {
        res.json({ message: "用户更新成功", code: "2000" })
      } else {
        res.json(result)
      }
    })
  } else {
    delete param.id;
    param.createTime = new Date().getTime().toString();
    db.query(db.sql.table('user').data(param).insert()).then(result => {
      if (result.code == 2000) {
        res.json({ message: "用户添加成功", code: "2000" })
      } else {
        res.json(result)
      }
    })
  }
})

router.post('/delete', (req, res) => {
  let sqlData = ` id in (${req.body.id})`;
  db.query(db.sql.table('user').where(sqlData).delet()).then(result => {
    if (result.code == 2000) {
      res.json({ message: "删除成功", code: "2000" })
    } else {
      res.json(result)
    }
  })
})

router.post('/login',(req,res)=>{
  
})
module.exports = router;