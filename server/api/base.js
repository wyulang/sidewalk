var express = require('express');
var router = express.Router();
const path = require('path');
const table = require('../table.js');
const fs = require('fs-extra');
const db = require('../db.js');

router.post('/table', (req, res) => {
  if (table[req.body.table]) {
    db.query(table[req.body.table]).then(result => {
      if (result.code == 2000) {
        res.json({ code: "2000", message: "创建表成功" });
      } else {
        res.json(result);
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
  db.query(`DROP TABLE IF EXISTS ${req.body.table}`).then(val => {
    if (val.code == 2000) {
      res.json({ code: 2000, message: '表删除成功' })
    } else {
      res.json(val)
    }
  })
});

router.post('/delete-file',(req,res)=>{
  let fileList=req.body.fileList.split(',');
  fileList.forEach(item => {
    if(fs.pathExistsSync(path.join(__dirname, `../assets/${item}`))){
      fs.remove(path.join(__dirname, `../assets/${item}`),err=>{
        if(err){
          res.json({code:1002,message:err})
        }else{
          res.json({code:2000,message:"文件删除成功"})
        }
      });
    }
  });
})

router.post('/upload', (req, res) => {
  if (!fs.existsSync(path.join(__dirname, `../assets/temporary`))) {
    fs.mkdir(path.join(__dirname, `../assets/temporary`));
  }
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
      let title = new Date().getTime() + files.file.path.substring(files.file.path.lastIndexOf('.'));
      let toPath = path.join(__dirname, `../assets/temporary/`) + title;
      fs.rename(files.file.path, toPath, err => {
        res.json({ code: "2000", data: { url: 'temporary/' + title, } });
      })
    })
  }, 200);

})

module.exports = router;