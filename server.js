////////////////////////////////
//Import Dependencies         //  
////////////////////////////////
const express = require('express') // import the express framework
const mongoose = require('mongoose') // import the express mongoose
const morgan = require('morgan') // import the express morgan request logger
require('dotenv').config() // load my ENV file's variable

////////////////////////////////
//Database Connection         //  
////////////////////////////////
//This is where we will set our inputes for a database connect function
const DATABASE_URL = process.env.DATABASE_URL
// here is our DB config object
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// establish our database connection
mongoose.connect(DATABASE_URL, CONFIG)

// Tell mongoose what to do with certain events
// what happens when we open, disonnect, or get an error

mongoose.connection
    .on('open', ()=> console.log('Connected to Mongoose'))
    .on('close', ()=> console.log('Disconnected to Mongoose'))
    .on('error', ()=> console.log('An error occured: \n', err))


/////////////////////////////////////////
//Create and Express App Object        //  
/////////////////////////////////////////

const app = express()


/////////////////////////////////////////
//Server listener                      //  
/////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, ()=> console.log(`Now listening to the sweet sounds of port: ${PORT}`))

//End