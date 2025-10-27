// server.js
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'
import educatorRouter from './routes/educatorRoutes.js'
import { clerkMiddleware, requireAuth } from '@clerk/express'
import listEndpoints from 'express-list-endpoints'
import connectCloudinary from './configs/cloudinary.js'
import courseRouter from './routes/courseRoute.js'
import userRouter from './routes/userRoutes.js'

// Initialize Express
const app = express()

// --- Connect to DB (top-level await ok on Node 18+) ---
await connectDB()

// connect Cloudinary
await connectCloudinary()

// --- Core middleware ---
app.use(cors())

/**
 * IMPORTANT: Clerk webhooks require the RAW body for signature verification.
 * So register the webhook route with `express.raw()` BEFORE any global `express.json()`.
 */
app.post('/clerk', express.raw({ type: 'application/json' }), clerkWebhooks)

// Now it’s safe to parse JSON for the rest of the app
app.use(express.json())

// Clerk middleware (populates req.auth())
app.use(clerkMiddleware())

// --- Routes ---
app.get('/', (req, res) => {
  res.send({ 'API is Working': 'ewf' })
})

// Protect educator routes (require a signed-in user)
app.use('/api/educator', requireAuth(), educatorRouter)

app.use('/api/course', express.json(), courseRouter)
app.use('/api/user',express.json(),userRouter)

// --- Start server ---
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`server is working on Port : ${PORT}`)
  console.table(listEndpoints(app)) // See what’s registered
})
