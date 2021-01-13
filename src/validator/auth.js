const { check, validationResult } = require('express-validator');

exports.validateSignupRequest = [
    check('firstName').isEmpty().withMessage('First name is required'),
    check('lastName').isEmpty().withMessage('Last name is required'),
    check('email').isEmail().withMessage('Valid email is required'),
    check('password').isLength({ min: 6 }).withMessage('Password must be 6 char long')
];

exports.validateSigninRequest = [
    check('email').isEmail().withMessage('Valid email is required'),
    check('password').isLength({ min: 6 }).withMessage('Password must be 6 char long')
];

exports.isRequestValidate = (req, res, next) => {
    var renderPage;
    req.body.firstName ? renderPage = 'auth/signup' : renderPage = 'auth/signin'
    const errors = validationResult(req)
    if (errors.array().length > 0) {
        return res.render(renderPage, { messege: errors.array()[0].msg })
    }
    next();
}