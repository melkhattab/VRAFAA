const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const db_connect = require('./db_connection');
var cors = require('cors');

const userRoutes = require('./routes/users');
const artisantRoutes = require('./routes/artisans');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/',artisantRoutes);
app.use('/',userRoutes);

module.exports = app;
