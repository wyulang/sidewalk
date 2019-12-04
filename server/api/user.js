var express = require('express');
var router = express.Router();
const db = require('../db.js');

const getIPAdress = () => {
  var interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}

router.post('/list', (req, res) => {
  let param = req.body;
  db.query(db.sql.table('user').where(param).select()).then(result => {
    res.json(result)
  })
})

router.post('./update', (req, res) => {
  let param = req.body;
  if (param.id) {
    let where = { id: param.id };
    delete param.id
    db.query(db.sql.table("user").data(param).where(where).update()).then(result=>{
      res.json({ message: "用户添加成功", code: "2000" })
    })
  } else {
    delete param.id;
    param.createTime = new Date().getTime().toString();
    param.ip=getIPAdress();
    db.query(db.sql.table('user').data(param).insert()).then(result => {
      res.json({ message: "用户添加成功", code: "2000" })
    })
  }
})
module.exports = router;