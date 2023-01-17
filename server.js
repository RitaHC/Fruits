/////////////////////////////////////
//// Import Dependencies         ////
/////////////////////////////////////
const express = require('express') // import the express framework
const mongoose = require('mongoose') // import the mongoose library
const morgan = require('morgan') // import the morgan request logger
require('dotenv').config() // Load my ENV file's variables
const path = require('path')

/////////////////////////////////////
//// Import Models               ////
/////////////////////////////////////
const Fruit = require('./models/fruits')

/////////////////////////////////////
//// Database Connection         ////
/////////////////////////////////////
// this is where we will set up our inputs for our database connect function
const DATABASE_URL = process.env.DATABASE_URL
// here is our DB config object
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// establish our database connection
mongoose.connect(DATABASE_URL, CONFIG)

// Tell mongoose what to do with certain events
// what happens when we open, diconnect, or get an error
mongoose.connection
    .on('open', () => console.log('Connected to Mongoose'))
    .on('close', () => console.log('Disconnected from Mongoose'))
    .on('error', (err) => console.log('An error occurred: \n', err))


/////////////////////////////////////
//// Create our Express App Object //
/////////////////////////////////////
const app = express()

/////////////////////////////////////
//// Middle Ware                 ////
/////////////////////////////////////
app.use(morgan('tiny'))
app.use(express.urlencoded({extended: true}))
app.use(express.static('pubmic'))
app.use(express.json())


/////////////////////////////////////
//// Routes                      ////
/////////////////////////////////////
app.get('/', (req, res) => {
    res.send('Server is live, ready for requests')
})

app.get('/fruits/seed', (req,res)=> {
    const startFruits = [
        {name: 'Orange', color: 'orange', readyToEat: true},
        {name: 'Grape', color:'purple' , readyToEat: true},
        {name: 'Banana', color: 'green', readyToEat: false},
        {name: 'Strawberry', color: 'red', readyToEat: false},
        {name: 'Coconut', color: 'brown', readyToEat: true }
    ]

   Fruit.deleteMany({})
    .then(()=> {
        Fruit.create(startFruits)
            .then(data=> {
                res.json(data)
            })
            .catch(err=> console.log(`The following error occured \n`, err ))
    })
})

/////////////////////////////////////
//// Server Listener             ////
/////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))

// END