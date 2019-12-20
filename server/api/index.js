const express = require('express');
const router = express.Router();
router.use('/user',require('./user'));
router.use('/net',require('./net'));
router.use('/base',require('./base'));
router.use('/admin',require('./admin'));
module.exports = router;