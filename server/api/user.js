var express = require('express');
var router = express.Router();
const db = require('../db.js');

router.post('/list', (req, res) => {
  let param=req.body;
  db.query(db.sql.table('user').where(param).select()).then(result => {
    res.json(result)
  })
})

module.exports = router;