const express = require('express');
const { signinView, signin, signupView, signup, signout } = require('../controller/auth');
const router = express.Router();


router.post('/signin', signin);
router.post('/signup', signup);
router.get('/signout', signout);
router.get('/signin', signinView);
router.get('/signup', signupView);


module.exports = router;