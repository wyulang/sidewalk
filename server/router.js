const cors = require('cors');
module.exports = (app) => {
  app.use('/api', cors(), require('./api/index.js'));
};