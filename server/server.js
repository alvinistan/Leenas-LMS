import express from 'express'
import cors from 'cors'
import 'dotenv/config'

//initialize Express
const app = express()

//MiddleWare
app.use(cors())

//Routes
app.get('/',(req,res) => {
    res.send({"API is Working": 'ewf'})
})

//Port
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> {
    console.log(`server is working on Port : ${PORT}`)
})