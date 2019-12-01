var express = require('express');
var router = express.Router();
const table=require('../table.js');
const db = require('../db.js');

router.post('/table', (req, res) => {
  let param=req.body;
  db.query(table[param]).then(result => {
    res.json(result)
  })
})

router.post('/database', (req, res) => {
  let param=req.body;
  db.query(`SELECT * FROM information_schema.SCHEMATA where SCHEMA_NAME=${req.body.database}`).then(v=>{
    if(v.data.length){
      db.query(`CREATE DATABASE ${req.body.database}`).then(val=>{
        res.json({code:2000,message:'数据库创建成功'})
      })
    }else{
      res.json({code:2000,message:'数据库已存在'})
    }
  });
})


module.exports = router;