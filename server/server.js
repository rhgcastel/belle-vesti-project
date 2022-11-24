const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/users-routes');
const itemsRoutes = require('./routes/items-routes');
require('dotenv').config()
const app = express();

//Connection to the database
mongoose.connect(process.env.MONGO_URI, (err) => {
    err
        ? console.log(`Error: ${err}`)
        : console.log("Connection to database has been established");
});


app.use(cors())
app.use(express.static('public'))
app.use(cookieParser());
app.use(express.json());
app.use(usersRoutes);
app.use(itemsRoutes);

const listener = app.listen(process.env.PORT || 5000, () => {
    console.log(`Your app is listening on port ${listener.address().port}`)
});
