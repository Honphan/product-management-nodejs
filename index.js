const express = require('express');
const app = express();

require('dotenv').config()
const port = process.env.PORT || 3000;

const database = require('./config/database');
database.connect();

const clientRoute = require('./routes/client/index.route');
const adminRoute = require('./routes/admin/index.route');

app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'pug');


clientRoute(app);
adminRoute(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});