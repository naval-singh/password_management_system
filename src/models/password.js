const mongoose = require('mongoose');

const passwordSchema = mongoose.Schema({
    categoryName: {
        type: String,
    },
    workSpace: {
        type: String,
        required: true,
        trim: true,
    },
    passwordDetails: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Password = mongoose.model('Password', passwordSchema);
module.exports = Password;