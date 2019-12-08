const cors = require('cors');
const bodyParser = require('body-parser')
module.exports = (app) => {
  
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use('/api', cors(), require('./api/index.js'));
};