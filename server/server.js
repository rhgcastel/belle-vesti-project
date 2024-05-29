const express = require('express');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/users-routes');
const itemsRoutes = require('./routes/items-routes');
require('dotenv').config();


const app = express();

app.use(helmet());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'))

// CSRF protection middleware
app.use(csurf({ cookie: true }));

// Middleware to set the CSRF token in a cookie
app.use((req, res, next) => {
    const csrfToken = req.csrfToken();
    res.cookie('XSRF-TOKEN', csrfToken, { httpOnly: false, secure: process.env.NODE_ENV === 'production' });
    next();
});

// Connection to the database
mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (err) {
        console.log(`Error: ${err}`);
    } else {
        console.log("Connection to database has been established");
    }
});

// Routes
app.use(usersRoutes);
app.use(itemsRoutes);


const listener = app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${listener.address().port}`);
});
