// required packages
const express = require('express')
const router = express.Router()

//mount routes on router

// GET users/new -- show route for a form that creates a new user(sign up for the app)
router.get('/new', (req, res) =>{
    res.render('users/new.ejs')
})

//POST /users -- create a new user from the form at GET/users/new
router.post('/', (req, res)=>{
   //do a findOrCreate with the user's given email
    // if the user's returns as found -- don't let them sign up 
    //instead re direct to the login page
    // hash the user's password before we add it ot the db 
    // save the user in the db
    //encrypt the log in user's id 
    //set encrypted id as a cookie 
    // redirect the user 


   
    res.send('create a new user if they do not exist already in the db, log a user in')
})

//GET user/login -- show route for a form that lets a user login
router.get('/login', (req, res)=>{
    res.send("show a form to let a user login")
})

//POST /user/login -- authenticate a user's credentials 
router.post('/login', (req, res)=>{
    res.send('verify credentials that are given by the user to log in')
})

// GET /users/logout -- log out the current user 
router.get('/logout', (req, res)=>{
    res.send('log a user out')
})


//GET /users/profile -- show authorized users their profile page
router.get('/profile', (req, res)=>{
    res.send('show the currently logged in user their personal profile page ')
})



//export the router instance
module.exports = router 