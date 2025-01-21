const express = require('express');
const app = express();
const port = 3000;
const clientRoute = require('./routes/client/index.route');


app.set('views', './views');
app.set('view engine', 'pug');


clientRoute(app);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});