const connectToMongo = require('./db')

connectToMongo()
const express = require('express')
const app = express()
const port = 80

app.use(express.json())

// Avialable routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))  

app.use('/server/test', require('./routes/test'))

app.listen(port)

console.log(`server listening on port ${port}`)