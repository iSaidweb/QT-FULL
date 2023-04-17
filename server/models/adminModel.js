module.exports = require('mongoose').model('Admin',{
    login: String,
    password: String,
    secret_key: String
})