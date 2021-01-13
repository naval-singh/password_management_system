const express = require('express');
const { createCategotyView, createCategoty, showCategory, editCategoryView, deleteCategory, editCategory } = require('../controller/category');
const { signinRequired } = require('../middleware');
const router = express.Router();


router.get('/category/new', signinRequired, createCategotyView);
router.post('/category/new', signinRequired, createCategoty);
router.get('/category', signinRequired, showCategory);
router.get('/category/edit/:id', signinRequired, editCategoryView);
router.post('/category/edit/:id', signinRequired, editCategory);
router.post('/category/:id', signinRequired, deleteCategory);


module.exports = router;