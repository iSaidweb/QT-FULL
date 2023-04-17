module.exports = require('express')()
.use('/auth', require('./routers/authRouter'))
.use('/post', require('./routers/postRouter'))