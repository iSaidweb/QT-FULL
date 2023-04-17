const authController = require('../controllers/authController');
const authWare = require('../middlewares/authWare');

module.exports = require('express')()
.post('/signin',authController.signin)
.get('/check', authWare, authController.check)