const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

//Load Model 
require('./models/User');

//Passport Config
require('./config/passport')(passport);

//Load Routes
const auth = require('./routes/auth');

//load Keys
const keys = require('./config/keys');

//Mongoose connect
mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => console.log('Mongog DB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('it works');
});

app.use(cookieParser());
app.use(session({
  secret:'secret',
  resave:true,
  saveUninitialized:true
}))

//Pasport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use Routes
app.use('/auth', auth);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(` Server started on port  - ${port}`);
})