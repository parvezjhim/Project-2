// required packages
const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptoJs = require('crypto-js')
const axios = require('axios')


// const axios = require('axios')

// // api key 4bCbeJXvkhqCa2ZSgxTc5665AP7g2TqU5FdJf5PgCgP1nx9KGC
// const CLIENT_ID = 'WQdoenR5rS0zAP40HzU4ZM8CLm0FI8F2ZoWQ3QzJ50fpPhC2Ad'
// // secret HNc7vJ8SFtB4jtB0OqH47vV4gTp5VbP3FtlKRg6z
// const SECRET = 'Yi49YezgXhDsmJC6inVvqe21EznQ53BXxcAZiqsi'

// async function fetchPets() {
//     try {
//         const body = {
//             'grant_type': 'client_credentials',
//             'client_id': CLIENT_ID,
//             'client_secret': SECRET
//         }

//         // https://api.petfinder.com/v2/oauth2/token
//         const tokenUrl = 'https://api.petfinder.com/v2/oauth2/token'
//         const tokenResponse = await axios.post(tokenUrl, body)
//         console.log('bearer token reponse:', tokenResponse.data)

//         const options = {
//             headers: {
//                 Authorization: `Bearer ${tokenResponse.data.access_token}`
//             }
//         }

//         const dataResponse = await axios.get('https://api.petfinder.com/v2/animals?type=dog&page=2', options)

//         console.log('data response:', dataResponse.data)
//     } catch (err) {
//         console.log(err)
//     }
// }

// fetchPets()

//routes
router.get('/animals', (req, res)=>{
    res.send('view animals')
})

router.get('/animals/:species', (req, res)=>{
    res.send('view one specific species')
})

router.get('/users/:userId/animals', (req, res)=>{
    res.send('look at your favorite animals')
})

router.get('/users/:userId/animals/:animalId', (req, res)=>{
    res.send('look at a specific favorite animal')
})

router.post('/users/:userId/animals/animalId', (req, res)=>{
    res.send('add an animal to your list')
})

router.delete('/users/:userId/animals/:animalId', (req, res) =>{
    res.send('delete an animal form your favorite list')
})


module.exports= router