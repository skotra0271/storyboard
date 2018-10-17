const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

//Load Model 
require('./models/User');
require('./models/Story');

//Passport Config
require('./config/passport')(passport);

//Load Routes
const index = require('./routes/index');
const auth = require('./routes/auth');
const stories = require('./routes/stories');


//load Keys
const keys = require('./config/keys');

//Load helpers file
const { truncate, stripTags, formateDate, select} = require('./helpers/hbs');

//Mongoose connect
mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => console.log('Mongog DB connected'))
  .catch(err => console.log(err));

//bodyparser middle
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//Method override midlleware
app.use(methodOverride('_method'));

// Handlebar middleware
app.engine('handlebars', exphbs({
  helpers: {
    truncate: truncate,
    stripTags: stripTags,
    formateDate:formateDate,
    select:select
  },
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

//Pasport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set global vars
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Use Routes
app.use('/', index);
app.use('/auth', auth);
app.use('/stories', stories);


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(` Server started on port  - ${port}`);
})