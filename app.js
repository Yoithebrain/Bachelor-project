const express = require('express');
const exphns = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const config = require('./config/database');
var passport = require('passport');

//Init app
const app = express();

// Passport Config
require('./config/passport')(passport);
// Passport Config
require('./config/passportBestyrelse')(passport);//hvorfor har vi 2?
//Bring in models
let News = require('./models/news')

const db = require('./config/database').database;

//Connect to Mongo
mongoose.connect(db, {useNewUrlParser: true})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

//Load view engine
app.engine('handlebars', exphns({
    defaultLayout:'main',
    layoutsDir: path.join(__dirname, 'views/mainLayout') 
}));
app.set('view engine','handlebars');

// Body parse Middleware
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session Middleware
app.use(session({
    secret: 'secret',
    resave: false, // don't reset the session
    saveUninitialized: false, // Don't create session for every user, only when logged in
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Global Express Messages Middleware/Variables
app.use(require('connect-flash')());
app.use(function(req, res, next) {
    res.locals.messages= require('express-messages')(req, res);
    next();
});

// Express validator Middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;

        while(namespace.length){
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg : msg,
            value : value
        };
    }
}));

//Makes user accessible to all calls
app.get('*', (req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

app.get('*', (req, res, next) => {
    res.locals.bestyrelse = req.bestyrelse || null;
    next();
});

//Home Route
app.get('/', (req, res) => {
    News.find({}, (err, news) =>{
        if(err){
            console.log(err);
        } else {
            res.render('index', {
                title:'Home',
                news: news
            }); 
        }
    });
});

// Route Files
let news = require('./routes/news');
let users = require('./routes/users');
let bestyrelse = require('./routes/bestyrelse');
let nodemailer = require('./routes/nodemailer');
let reservation = require('./routes/reservation');
app.use('/reservation', reservation);
app.use('/news', news);
app.use('/users', users);
app.use('/bestyrelse', bestyrelse);
app.use('/nodemailer', nodemailer);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  // Error handler
  app.use((err, req, res, next) => {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // Render the error page
    res.status(err.status || 500);
    res.render('pageNotFound');
  });
  
//Start Server
app.listen(3000, () => {
    console.log('Server started on port 3000...')
});
