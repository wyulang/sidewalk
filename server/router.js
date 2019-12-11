const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
module.exports = (app) => {
  app.use('/assets',express.static(path.resolve(__dirname + '/assets')));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use('/api', cors(), require('./api/index.js'));
};