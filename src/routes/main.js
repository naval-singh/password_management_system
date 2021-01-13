const express = require('express');
const { signinRequired } = require('../middleware');
const Category = require('../models/category');
const router = express.Router();

// ROOT ROUTER
router.get('/', (req, res) => {
    res.redirect('/category')
});

// FETCH ROUTER - to fetch all categories from the databases
router.get('/fetch/category', signinRequired, (req, res) => {
    Category.find({}).exec((error, categories) => {
        if (error) {
            return res.status(400).json([])
        } else {
            return res.status(200).json(categories)
        }
    })
});

module.exports = router;