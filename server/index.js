var express = require('express');
var app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, '../dist')))
require('./router.js')(app);
var server = app.listen(6001);

