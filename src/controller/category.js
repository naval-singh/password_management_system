const Category = require('../models/category');

exports.createCategotyView = (req, res) => {
    res.render('category/new', { messege: '', currentUser: req.user })
}

exports.createCategoty = (req, res) => {
    Category.findOne({ name: req.body.name }).exec((error, foundCategory) => {
        if (error) {
            console.log(error)
            return res.redirect('/category')
        } else if (foundCategory) {
            res.render('category/new', { messege: 'Category already exist..!!', currentUser: req.user })
        } else {
            const category = new Category({ name: req.body.name })
            category.save((error, addedCategory) => {
                if (error) {
                    console.log(error)
                    return res.redirect('/category/new')
                } else {
                    res.render('category/new', { messege: 'Category added successfully..!!', currentUser: req.user })
                }
            })
        }
    })
}

exports.showCategory = (req, res) => {
    Category.find({}).exec((error, categories) => {
        if (error) {
            return res.render('category/show', { categories: [], currentUser: req.user })
        } else {
            return res.render('category/show', { categories: categories, currentUser: req.user })
        }
    })
}

exports.editCategoryView = (req, res) => {
    Category.findOne({ _id: req.params.id }).exec((error, foundCategory) => {
        if (error) {
            console.log(error)
            return res.redirect('/category')
        } else {
            return res.render('category/edit', { category: foundCategory, currentUser: req.user })
        }
    })
}

exports.editCategory = (req, res) => {
    Category.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { name: req.body.name } }
    ).exec((error, updated) => {
        if (error) {
            console.log(error)
            return res.redirect('/category')
        } else {
            console.log(updated)
            return res.redirect('/category')
        }
    })
}

exports.deleteCategory = (req, res) => {
    Category.findOneAndDelete({ _id: req.params.id }).exec((error, deleted) => {
        if (error) {
            console.log(error)
            return res.redirect('/category')
        } else {
            console.log(deleted)
            return res.redirect('/category')
        }
    })
}