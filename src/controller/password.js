const Password = require('../models/password');

exports.createPasswordView = (req, res) => {
    res.render('password/new', { messege: '', currentUser: req.user })
}

exports.createPassword = (req, res) => {
    const { categoryName, workSpace, passwordDetails } = req.body;
    const password = new Password({
        categoryName,
        workSpace,
        passwordDetails
    });
    password.save((error, savedPassword) => {
        if (error) {
            console.log(error)
            return res.redirect('/password/new');
        } else {
            console.log(savedPassword)
            return res.render('password/new', { messege: 'Password added successfully..!!', currentUser: req.user })
        }
    })
}

exports.showPassword = (req, res) => {
    Password.find({ categoryName: req.params.name }).exec((error, passwords) => {
        if (error) {
            //console.log(error)
            return res.render('password/show', { passwords: [], currentUser: req.user })
        } else {
            //console.log(passwords)
            return res.render('password/show', { passwords: passwords, currentUser: req.user })
        }
    })
}