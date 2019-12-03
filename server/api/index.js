const express = require('express');
const router = express.Router();
router.use('/user',require('./user'));
router.use('/net',require('./net'));
router.use('/base',require('./base'));
module.exports = router;