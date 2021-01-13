const express = require('express');
const { createPasswordView, createPassword, showPassword } = require('../controller/password');
const { signinRequired } = require('../middleware');
const router = express.Router();

router.get('/password/new', signinRequired, createPasswordView);
router.post('/password/new', signinRequired, createPassword);
router.get('/password/:name', signinRequired, showPassword);

module.exports = router;