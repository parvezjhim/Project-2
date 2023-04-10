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
router.post('/login', async (req, res)=>{
    try{
        // search for the user's email in the db 
        const foundUser = await db.user.findOne({
            where:{
                email: req.body.email
            }
        })
        const failedLoginMessage = 'Incorrect email or password'

        if(!foundUser){
            // if the user's email is not found -- do not let them login
            res.redirect('/users/login?message=' + failedLoginMessage)
        } else if(!bcrypt.compareSync(req.body.password, foundUser.password)){
            console.log('incorrect password')
            // if the user exists but they have the wrong password -- do not let them login
            res.redirect('/users/login?message=' + failedLoginMessage)

        } else {
            // if the user exists, they know the right pass word -- log them in
            const encryptedPk = cryptoJs.AES.encrypt(foundUser.id.toString(), process.env.ENC_KEY)
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

// GET /users/logout -- log out the current user 
router.get('/logout', (req, res)=>{
    console.log('logging user out ')
    res.clearCookie('userId')
    res.redirect('/')
})


//GET /users/profile -- show authorized users their profile page
router.get('/profile', (req, res)=>{
    // if the user comes here and is not logged in -- they lack authoriazation 
    if(!res.locals.user){
        // redirect them to the login
        res.redirect('/users/login?message="You are not authroized to view that page. Please authenticate to continue')
    } else{
        // if they are allowed to be here, show them their profile 
        res.render('users/profile.ejs')

    }

})


const axios = require('axios')

// api key 4bCbeJXvkhqCa2ZSgxTc5665AP7g2TqU5FdJf5PgCgP1nx9KGC
const CLIENT_ID = process.env.API_KEY
console.log(API_KEY)
// secret HNc7vJ8SFtB4jtB0OqH47vV4gTp5VbP3FtlKRg6z
const SECRET = process.env.mySecret

async function fetchPets() {
    try {
        const body = {
            'grant_type': 'client_credentials',
            'client_id': CLIENT_ID,
            'client_secret': SECRET
        }

        // https://api.petfinder.com/v2/oauth2/token
        const tokenUrl = 'https://api.petfinder.com/v2/oauth2/token'
        const tokenResponse = await axios.post(tokenUrl, body)
        console.log('bearer token reponse:', tokenResponse.data)

        const options = {
            headers: {
                Authorization: `Bearer ${tokenResponse.data.access_token}`
            }
        }

        const dataResponse = await axios.get('https://api.petfinder.com/v2/animals?type=dog&page=2', options)

        console.log('data response:', dataResponse.data)
    } catch (err) {
        console.log(err)
    }
}

fetchPets()

//export the router instance
module.exports = router 