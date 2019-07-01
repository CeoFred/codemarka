const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const auth = require('./app/routes/auth')
const classroom = require('./app/routes/classroom')
const user = require('./app/routes/user')
const compression = require('compression')
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const checkAuth = require('./app/middleware/check_Auth');


app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(compression())
app.use(cookieParser());
app.use(methodOverride());

const whitelist = ['http://localhost:3000', 'http://localhost:3001','*']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use('/auth',cors(),auth);
app.use('/user',cors(),checkAuth,user);
app.use('/classroom',cors(),classroom);
// middleware for errors
app.use((req,res,next) => {

        const error = new Error('Not found');
        error.status = 400;
        next(error);

});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;