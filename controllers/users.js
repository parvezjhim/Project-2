// required packages
const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptoJs = require('crypto-js')

//mount routes on router

// GET users/new -- show route for a form that creates a new user(sign up for the app)
router.get('/new', (req, res) =>{
    res.render('users/new.ejs')
})

//POST /users -- create a new user from the form at GET/users/new
router.post('/', async (req, res)=>{
    try{
        //do a findOrCreate with the user's given email
        const [newUser, created] = await db.user.findOrCreate({
            where:{
                email: req.body.email
            }
        })
        if(!created){
            // if the user's returns as found -- don't let them sign up 
            console.log('user account exists')
            //instead re direct to the login page
            res.redirect('/users/login?message=Please login to your account to continue')
        } else{
            // hash the user's password before we add it ot the db 
            const hashedPassed = bcrypt.hashSync(req.body.password, 12)
            // save the user in the db
            newUser.password = hashedPassed
            await newUser.save()
            //encrypt the log in user's id 
            const encryptedPk = cryptoJs.AES.encrypt(newUser.id.toString(), process.env.ENC_KEY)
            //set encrypted id as a cookie 
            res.cookie('userId', encryptedPk.toString())
            // redirect the user 
            res.redirect('/users/profile')
        }


    }catch(err){
        console.log(err)
        res.redirect('/')
    }

})

//GET user/login -- show route for a form that lets a user login
router.get('/login', (req, res)=>{
    res.render('users/login.ejs', {
        message: req.query.message ? req.query.message : null
    })
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