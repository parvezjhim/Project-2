const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptoJs = require('crypto-js')
const axios = require('axios')

router.get('/animals/:animalId/comments', (req, res)=>{
    res.send("render all comments for an animal")
})

router.post('/animals/:animalId/comments/:commentId', (req, res)=>{
    res.send('create a new commment ')
})

router.delete('/animals/:animalId/comments/:commentId', (req, res)=>{
    res.send('delete a comment')
})


module.exports= router