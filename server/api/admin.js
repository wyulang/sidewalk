var express = require('express');
var router = express.Router();
const db = require('../db.js');
const { GetDateDiff } = require('../lib/dateFormat.js');
const path = require('path');
const fs = require('fs-extra');

router.post('/list', (req, res) => {
  let param = req.body;
  let sqlData = "SELECT SQL_CALC_FOUND_ROWS id,name,phone,email,createTime,type,lgCount,lgTime,city FROM admin WHERE 1=1";
  if (param.value) {
    sqlData += ` and concat (name,phone,email) like '%${param.value}%' `;
  }
  if (param.type) {
    sqlData += ` and type=${param.type}`;
  }
  sqlData += ` LIMIT ${(param.page <= 0 ? 1 : param.page - 1) * param.size},${param.size}`;
  sqlData += `; SELECT FOUND_ROWS() as total;`;
  db.query(sqlData).then(result => {
    res.json({ code: result.code, data: result.data[0], total: result.data[1][0].total })
  })
})

router.post('/update', (req, res) => {
  let param = req.body;
  db.query(`select count(id) as count from admin where name='${param.name}';select count(id) as count from admin where phone='${param.phone}';select count(id) as count from admin where email='${param.email}';`).then(val => {
    let type = 0;
    if (val.data[0][0].count) { type = 1 }
    else if (val.data[1][0].count) { type = 2 }
    else if (val.data[2][0].count) { type = 3 }
    if (type > 0 && !param.id) {
      res.json({ code: 1003, message: (["", "用户名", "手机号", "邮箱"][type] + "已存在") });
      return;
    }
    if (param.id) {
      let where = { id: param.id };
      delete param.id;
      db.query(db.sql.table("admin").data(param).where(where).update()).then(result => {
        if (result.code == 2000) {
          res.json({ message: "用户更新成功", code: "2000" });
        } else {
          res.json(result)
        }
      })
    } else {
      delete param.id
      param.createTime = new Date().getTime().toString();
      db.query(db.sql.table('admin').data(param).insert()).then(result => {
        if (result.code == 2000) {
          res.json({ message: "用户添加成功", code: "2000" });
        } else {
          res.json(result)
        }
      })
    }
  })

})

router.post('/delete', (req, res) => {
  let sqlData = ` id in (${req.body.id})`;
  db.query(db.sql.table('admin').where(sqlData).delet()).then(result => {
    if (result.code == 2000) {
      res.json({ message: "删除成功", code: "2000" })
    } else {
      res.json(result)
    }
  })
})

router.post('/login', (req, res) => {
  let token = req.headers.token;
  let openssr = "===LOGIN#TIME@#1&";
  let timeCount = token && token.split('@#1&')[1];
  let currTime, counts;
  let timeOuts = "";
  if (token) {
    currTime = timeCount.substr(1, timeCount.length - 1);
    counts = timeCount[0];
    let times = GetDateDiff(parseInt(currTime), "", "minute");
    if (times <= 30 && parseInt(counts) > 6) {
      openssr += `7${currTime}`;
      res.json({ code: '1001', message: '连续密码错误超过5次，请半个小时后在重新登录', });
      return;
    } else if (times > 30 && parseInt(counts) > 6) {
      timeOuts = `0${new Date().getTime()}`;
    } else {
      timeOuts = "";
    }
  } else {
    res.json({ code: '1002', message: '非法登录，请勿在重试登录' });
    return;
  }
  if (!req.body.username || !req.body.password) {
    res.json({ code: '1003', message: '用户名或密码不为空' });
    return;
  }
  let sqlData = "SELECT id,name,phone,email,createTime,type,lgCount,lgTime,city FROM admin WHERE 1=1";
  sqlData += ` and (`;
  sqlData += ` name='${req.body.username}'`;
  sqlData += ` or phone='${req.body.username}'`;
  sqlData += ` or email='${req.body.username}' )`;
  sqlData += ` and password = '${req.body.password}'`;
  db.query(sqlData).then(result => {
    if (result.code == 2000) {
      if (result.data.length > 0) {
        openssr += `0${currTime}`;
        let rtData = result.data[0];
        rtData.lgCount = rtData.lgCount && (rtData.lgCount + 1) || 1;
        rtData.lgTime = new Date().getTime();
        db.query(`update admin set lgCount='${rtData.lgCount}',lgTime='${rtData.lgTime}' where id=${rtData.id}`).then(value => {
          res.json({ message: "登录成功", code: "2000", data: rtData, token: openssr });
        })
      } else {
        openssr += timeOuts || `${parseInt(counts) + 1}${currTime}`;
        res.json({ message: "用户名或密码错误", code: "1004", token: openssr })
      }
    } else {
      res.json(result)
    }
  })
})
module.exports = router;