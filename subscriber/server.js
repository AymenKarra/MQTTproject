const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

//reroutes requests to tempRouter.js file
const newsRouter = require('./routes/tempRouter')
app.use('/temp',newsRouter)

//the api listens on port 3000 for incoming requests
app.listen(3000,()=> console.log('Server started'))