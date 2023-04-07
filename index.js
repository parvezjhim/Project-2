// required packages
require('dotenv').config()
const express = require('express')

//app config 
const app = express()
const PORT = process.env.PORT || 8000
app.set('view engine', 'ejs')

//parse html form request bodies 
//middleware
app.use(express.urlencoded({extended: false}))

// routes and controllers
app.get('/', (req, res)=>{
    res.render('index.ejs')
})

app.use('/users', require('./controllers/users.js'))

//listen on a port
app.listen(PORT, () =>{
    console.log(`authenticating users on port ${PORT}`)
})