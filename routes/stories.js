const express = require('express');
const mongoose = require('mongoose');
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');
const router = express.Router();

const Story = mongoose.model('stories');
const User  = mongoose.model('users');

//Stories Index
router.get('/', (req, res) => {
  Story.find({status:'public'})
      .populate('user')
      .then(stories=>{
          res.render('stories/index',{
            stories:stories
        });
  })
  
});

//Add Story Form
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('stories/add');
})

//Process sotry from
router.post('/', (req, res) => {

  let allowComments;

  if (req.body.allowComments) {
    allowComments = true
  } else {
    allowComments = false;
  }

  let newSotry ={
    title:req.body.title,
    body: req.body.body,
    status:req.body.status,
    allowComments:allowComments,
    user:req.user.id
  }

  new Story(newSotry).save()
      .then(story=>{
          res.redirect(`/stories/show/${story.id}`)
      });
})

router.get('/edit/:id', (req, res) => {
  res.render('stories/Edit');
})


module.exports = router