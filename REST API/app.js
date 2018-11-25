const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const db_connect = require('./db_connection');

const userRoutes = require('./routes/users');
const artisantRoutes = require('./routes/artisants');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/',artisantRoutes);
app.use('/',userRoutes);

module.exports = app;
