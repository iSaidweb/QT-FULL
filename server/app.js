process.env.NODE_ENV !== 'production' ? require('dotenv').config({ path: '.env' }) : null;
const app = require('express')();
require('mongoose').set('strictQuery', false).connect(process.env.DB_CONNECTION_STRING);
app.use(require('express').json());
app.use('/public', require('express').static('public'));
app.use(require('express-fileupload')());
app.use(require('cors')({
    origin: ['https://db.kurgantepa.uz', 'https://kurgantepa.uz', 'http://localhost:3000', 'http://kurgantepa.uz', 'http://db.kurgantepa.uz'],
    "methods": "GET,HEAD,PUT,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}));
app.use('/api', require('./router'));
require('./middlewares/funcWare').setDefaultSettings();
app.listen(process.env.APP_PORT);