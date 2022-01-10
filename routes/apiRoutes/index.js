const app = require('express').Router();
const noteRoutes = require('../apiRoutes/noteRoutes');

app.use(noteRoutes);

module.exports = app;