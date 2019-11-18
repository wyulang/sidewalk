var express = require('express');
var router = express.Router();
const db = require('../db.js');
router.post('/list', (req, res) => {
  console.log('result', req.body)
  db.query(db.sql.table('user').data(req.body).select()).then(result => {
    console.log('result', result)
    if (result.code == 2000) {
      res.json(result)
    }
  })
})

module.exports = router;