const express = require('express');
const router = express.Router();

//Stories Index
router.get('/', (req, res) => {
  res.render('stories/index');
});

router.get('/add', (req,res)=>{
  res.render('stories/add');
})

router.get('/edit/:id', (req,res)=>{
  res.render('stories/Edit');
})


module.exports = router