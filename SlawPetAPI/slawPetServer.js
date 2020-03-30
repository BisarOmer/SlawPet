const express = require('express'),
  app = express(),
  cors = require('cors')
  bodyParser = require('body-parser');
  port = process.env.PORT || 3000;


const mysql = require('./Config/config');

app.use(cors());
app.listen(port);

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./router'); //importing route
routes(app); //register the route



