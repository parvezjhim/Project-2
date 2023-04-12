const express = require('express')
const app = express()
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptoJs = require('crypto-js')
const axios = require('axios')


router.get('/', (req, res)=>{
    try{
        res.render('../views/animals/animals.ejs')
    } catch(err){
        console.log(err)
        res.send(err)
    }
})
// API_KEY='WQdoenR5rS0zAP40HzU4ZM8CLm0FI8F2ZoWQ3QzJ50fpPhC2Ad'

// mySecret='Yi49YezgXhDsmJC6inVvqe21EznQ53BXxcAZiqsi'
router.post('/', async (req, res)=>{
    try {
        const { zipCode, species, breed } = req.body
        const tokenResponse = await axios.post('https://api.petfinder.com/v2/oauth2/token',  {
          grant_type: 'client_credentials',
          client_id: 'WQdoenR5rS0zAP40HzU4ZM8CLm0FI8F2ZoWQ3QzJ50fpPhC2Ad',
          client_secret: 'Yi49YezgXhDsmJC6inVvqe21EznQ53BXxcAZiqsi'
        })
        console.log("Here is the token  ", tokenResponse)
        const options = {
          headers: {
            Authorization: `Bearer ${tokenResponse.data.access_token}`
          }
        }
        console.log("here is th options ", options)
        const petResponse = await axios.get(`https://api.petfinder.com/v2/animals?type=Dog&breed=Affenpinscher`, options)
        console.log("Pet Response  ", petResponse)
        res.render('../views/animals/specificanimal.ejs', { animal: petResponse.data.animals })
      } catch (error) {
        console.log(error)
        res.render('../views/animals/specificanimal.ejs', { animal: null, error: 'Error getting pets. Please try again.' })
      }
    })
    
router.get('/:id', (req, res)=>{
    res.render('/animals/specificanimal.ejs')
})

router.get('/users/:userId/animals', (req, res)=>{
    res.redirect('./profile')
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



module.exports = router;
