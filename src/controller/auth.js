const jwt = require('jsonwebtoken');
const User = require('../models/user');

const generateToken = (user) => {
    const token = jwt.sign({ _id: user._id, user: user.fullName }, process.env.JWT_SECRET, { expiresIn: '1h' })
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }
    localStorage.setItem('token', token)
}

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email }).exec((error, foundUser) => {
        //console.log(req.body)
        if (error) {
            return res.render('auth/signin', { messege: 'Something went wrong', currentUser: req.user })
        } else if (foundUser) {
            if (foundUser.authenticate(req.body.password)) {
                generateToken(foundUser)
                //req.user = foundUser
                return res.redirect('/')
            } else {
                return res.render('auth/signin', { messege: 'Invalid password', currentUser: req.user })
            }
        } else {
            return res.render('auth/signin', { messege: 'User not registered', currentUser: req.user })
        }
    })
}

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email }).exec((error, foundUser) => {
        if (error) {
            return res.render('auth/signup', { messege: 'Something went wrong', currentUser: req.user })
        } else if (foundUser) {
            return res.render('auth/signup', { messege: 'Email already registered', currentUser: req.user })
        } else {
            const { firstName, lastName, email, password } = req.body;
            const user = new User({
                firstName,
                lastName,
                email,
                password
            })
            user.save((error, user) => {
                if (error) {
                    return res.render('auth/signup', { messege: 'Something went wrong', currentUser: req.user })
                } else {
                    return res.render('home', { currentUser: req.user })
                }
            })
        }
    })
}

exports.signout = (req, res) => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    res.redirect('/signin')
}

exports.signinView = (req, res) => {
    res.render('auth/signin', { messege: '', currentUser: req.user })
}

exports.signupView = (req, res) => {
    res.render('auth/signup', { messege: '', currentUser: req.user })
}