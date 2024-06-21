const connectToMongo = require('./db');
var express = require('express')
var cors = require('cors')
const userRoute = require('./Routes/userRoute')
const todoRoute = require('./Routes/todoRoute')

const app = express()


connectToMongo()

app.use(cors())
app.use(express.json())

app.use('/api/auth/', userRoute)
app.use('/api/todos/', todoRoute)


const port = 5000
app.listen(port,() => {
    console.log(`To-do backend listening on port http://localhost:${port}`)
})