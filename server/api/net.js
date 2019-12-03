var express = require('express');
var router = express.Router();
const db = require('../db.js');
const superagent= require('superagent');
//phantom  SPA抓包
const cheerio = require('cheerio');

router.post('/net', (req, res) => {
  superagent.get(req.body.url).end((err,result)=>{
    if(err){
      res.json({code:'4004'})
    }else{
      let $ = cheerio.load(result.text);
      let data={
        title:$('title').text(),
        description: $('meta[name="description"]').attr('content'),
        url:req.body.url
      }
      res.json({code:"2000",data:data})
    }
  })
})

module.exports = router;