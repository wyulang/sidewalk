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

module.exports = router;