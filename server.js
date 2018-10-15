 const express = require('express');
 const mongoose = require('mongoose');
 const passport = require('passport');
 const app = express();


 //Passport Config
 require('./config/passport')(passport);
 //Load Routes
 const auth = require('./routes/auth');

app.get('/', (req,res)=>{
res.send('it works');
});

//Use Routes
app.use('/auth', auth);

 const port = process.env.PORT || 5000;

 app.listen(port, ()=>{
   console.log(` Server started on port  - ${port}`);
 })