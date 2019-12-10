var express = require('express');
var router = express.Router();
const path = require('path');
const table = require('../table.js');
const fs = require('fs-extra');
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

router.post('/upload', (req, res) => {
  if (!fs.existsSync(path.join(__dirname, `../assets/temporary`))) {
    fs.mkdir(path.join(__dirname, `../assets/temporary`));
  }
  if (!fs.existsSync(path.join(__dirname, `../assets/other`))) {
    fs.mkdir(path.join(__dirname, `../assets/other`));
  }
  if (req.body.uploadDir && !fs.existsSync(path.join(__dirname, `../assets/${req.body.uploadDir}/`))) {
    fs.mkdir(path.join(__dirname, `../assets/${req.body.uploadDir}/`));
  }
  // console.log(req);
  setTimeout(() => {
    let formidable = require('formidable');
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8' // 编码
    form.keepExtensions = true // 保留扩展名
    form.multiples = true;
    form.uploadDir = path.join(__dirname, `../assets/temporary/`);
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log(err);
      }
      console.log(form);
      let title = "H-" + new Date().getTime() + files.file.path.substring(files.file.path.lastIndexOf('.'));
      req.body.uploadDir = req.body.uploadDir || "other";
      let toPath = path.join(__dirname, `../assets/${req.body.uploadDir}/`) + title;
      fs.rename(files.file.path, toPath, err => {
        res.json({ code: "2000", data: { url: +req.body.uploadDir + '/' + title, } })
      })
    })
  }, 200);

})

module.exports = router;