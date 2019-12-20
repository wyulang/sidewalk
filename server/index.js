var express = require('express');
var app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, '../dist')))
require('./router.js')(app);

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
let ip=getIPAdress();
var server = app.listen(6001,ip,res=>{
  console.log(`http://${ip}:6001/`)
});

