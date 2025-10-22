import express from 'express'
import cors from 'cors'
import 'dotenv/config';
import connectDB from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js';

//initialize Express
const app = express()

// Connect to database
await connectDB()

//MiddleWare
app.use(cors())

//Routes
app.get('/',(req,res) => {
    res.send({"API is Working": 'ewf'})
})
app.post('/clerk', express.json(),clerkWebhooks)

//Port
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> {
    console.log(`server is working on Port : ${PORT}`)
})