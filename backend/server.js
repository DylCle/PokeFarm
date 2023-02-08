require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
const pokemonRoutes = require('./routes/pokemon')
const cors = require('cors');


//express app
const app = express()
app.use(cors());

//middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use(express.static("../public"));
app.use('/api/pokemon', pokemonRoutes)

//connect to db
mongoose.connect(process.env.MONG_URI)
.then(() => {
    //listen request 
    app.listen(process.env.PORT, () => {
    console.log('listening port', process.env.PORT)
})

})
.catch((error) => {
    console.log(error)
})


