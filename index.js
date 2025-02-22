const express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
var bodyParser = require('body-parser')


// slug
var slug = require('mongoose-slug-updater');
var mongoose = require('mongoose');
mongoose.plugin(slug);
//end slug

require('dotenv').config()
const port = process.env.PORT || 3000;
var methodOverride = require('method-override')
const database = require('./config/database');
database.connect();

const clientRoute = require('./routes/client/index.route');
const adminRoute = require('./routes/admin/index.route');

//Flash message
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

// local
// app.use(express.static('public'));

// deploy online
app.use(express.static(`${__dirname}/public`));


app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))




clientRoute(app);
adminRoute(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});