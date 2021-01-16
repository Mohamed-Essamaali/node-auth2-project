const express = require('express')
const userRoute = require('./api/route')
const server = express()
const port = process.env.PORT || 5000

server.use(userRoute)


server.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})