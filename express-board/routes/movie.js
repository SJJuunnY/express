const express = require('express');
const router = express.Router();

let Movie = require('../model/Movie')

router.get('/',(req,res,next)=>{
    Movie.find().then(movie=>{
        res.json(movie);
    }).catch(err=>{
        next(err);
    })
});

module.exports = router