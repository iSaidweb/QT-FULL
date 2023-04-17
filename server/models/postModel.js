const moment = require('moment/moment');
module.exports = require('mongoose').model('Post', {
    title: String,
    about: String,
    images: Array,
    video: String,
    date: {
        type: Number,
        default: moment.now() / 1000
    }
})