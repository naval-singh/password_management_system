const jwt = require('jsonwebtoken');

exports.signinRequired = (req, res, next) => {
    try {
        const token = localStorage.getItem('token')
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode
    } catch (e) {
        return res.redirect('/signin')
    }
    next()
}
