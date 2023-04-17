const postController = require('../controllers/postController');
const authWare = require('../middlewares/authWare');

module.exports = require('express')()
.post('/add', authWare, postController.post)
.get('/getall', postController.getAll)
.delete('/remove/:postid',authWare, postController.delete)
.put('/edit/:postid',authWare, postController.edit)