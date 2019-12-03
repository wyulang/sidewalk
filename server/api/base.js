var express = require('express');
var router = express.Router();
const table = require('../table.js');
const db = require('../db.js');

router.post('/table', (req, res) => {
  if (table[req.body.table]) {
    db.query(table[req.body.table]).then(result => {
      if (result.data.warningCount) {
        res.json({ code: "2002", message: "表已存在" })
      } else {
        res.json({ code: "2000", message: "创建表成功" })
      }
    })
  } else {
    res.json({ code: "2003", message: "表SQL语句不存在" });
  }
})

router.post('/database', (req, res) => {
  db.query(`SELECT * FROM information_schema.SCHEMATA where SCHEMA_NAME='${req.body.database}'`).then(v => {
    if (v.data.length) {
      db.query(`CREATE DATABASE '${req.body.database}'`).then(val => {
        res.json({ code: 2000, message: '数据库创建成功' })
      })
    } else {
      res.json({ code: 2000, message: '数据库已存在' })
    }
  });
})

router.post('/delete-table', (req, res) => {
  db.query(`SELECT table_name FROM information_schema.TABLES WHERE table_name ='${req.body.table}'`).then(v => {
    if (v.data.length) {
      db.query(`DROP TABLE IF EXISTS ${req.body.table}`).then(val => {
        res.json({ code: 2000, message: '表删除成功' })
      })
    } else {
      res.json({ code: 2001, message: '表不存在' })
    }
  });
})

module.exports = router;