// required packages
require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cryptoJs = require('crypto-js')
const db = require('./models')
const axios = require('axios')

//app config 
const app = express()
const PORT = process.env.PORT || 8000
app.set('view engine', 'ejs')

//parse html form request bodies 
//middleware
app.use(express.urlencoded({extended: false}))
// tells express to parse incoming cookies sent from the browser
app.use(cookieParser())
app.use((req, res, next) =>{
    //incoming request console logger
    console.log(`[${new Date().toLocaleString()}]: ${req.method} ${req.url}`)
    console.log(`request body:`, req.body)
    //send data downstream to the other routes
    next() // tells express that this middleware has finished

})
// custom auth middleware
app.use(async (req, res, next)=>{
    try{
        // check if there is a cookie 
        if(req.cookies.userId){
            // if so we will decrypt the cookie and look up the user using their PK
            const decryptedPK = cryptoJs.AES.decrypt(req.cookies.userId, process.env.ENC_KEY)
            const decryptedPKString = decryptedPK.toString(cryptoJs.enc.Utf8)
            const user = await db.user.findByPk(decryptedPKString) // eager loading can be done here
            //mount the found user on the res.locals
            //in all other routes you can assume that the res.locals.user is the currently logged in user
            res.locals.user = user
        } else {
            // if there is no cookie, set res.locals.user to be null 
            res.locals.user = null
        }
    }catch(err){
        console.log(err)
        //if something goes wrong
        // set the user in the res.locals to be null 
        res.locals.user = null
    } finally {
        // runs regardless of whether there was an error or not 
        next() // go to the next thing no matter what 

    }
})

// routes and controllers
app.get('/', (req, res)=>{
    console.log(res.locals)
    res.render('index.ejs', {
        user: res.locals.user
    })
})



app.use('/users', require('./controllers/users.js'))
app.use('/animals', require('./controllers/animals'))
app.use('/comments', require('./controllers/comments'))


//listen on a port
app.listen(PORT, () =>{
    console.log(`authenticating users on port ${PORT}`)
})