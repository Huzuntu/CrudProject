const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const app = express();
const ejs = require('ejs');
const connectDB = require('../crud_app/server/database/connection')
dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 8080;

app.use(morgan('tiny'));

connectDB();

app.use(bodyparser.urlencoded({ extended : true}));

app.set('view engine', 'ejs');

app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));

app.use('/', require('./server/routes/router'))

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
