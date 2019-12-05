var express = require('express');
var router = express.Router();
const db = require('../db.js');

router.post('/list', (req, res) => {
  let param = req.body;
  db.query(db.sql.table('user').where(param).select()).then(result => {
    res.json(result)
  })
})

router.post('/update', (req, res) => {
  let param = req.body;
  if (param.id) {
    let where = { id: param.id };
    delete param.id
    db.query(db.sql.table("user").data(param).where(where).update()).then(result=>{
      if(result.code==2000){
        res.json({ message: "用户更新成功", code: "2000" })
      }else{
        res.json(result)
      }
    })
  } else {
    delete param.id;
    param.createTime = new Date().getTime().toString();
    db.query(db.sql.table('user').data(param).insert()).then(result => {
      if(result.code==2000){
        res.json({ message: "用户添加成功", code: "2000" })
      }else{
        res.json(result)
      }
    })
  }
})

router.post('/delete',(req,res)=>{
  db.query(db.sql.table('user').where(req.body).delet()).then(result=>{
    if(result.code==2000){
      res.json({ message: "用户删除成功", code: "2000" })
    }else{
      res.json(result)
    }
  })
})
module.exports = router;