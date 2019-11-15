const express = require('express');
const route = express.Router();
const db = require('./db.js');
class router {
  get(path,sql) {
    // let result = db(path, data);
    route.get(path,(req,res)=>{
      console.log('tag', req.body);
      let parme = req.body;
    })
  }
}

module.exports = router;