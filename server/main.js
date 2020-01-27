const express = require('express');
const cors = require('cors');
const recipeRoute = require('./routes/recipe');

const db = require('./db/sql/createDb');

db.createDb();
const app = express();

app.use(cors());
app.use(express.json());

app.use(recipeRoute);

app.listen(3000, function () {
    console.log('App listening on port 3000.');
});