// routes/educatorRoutes.js
import { Router } from 'express'
import { updateRoleToEducator } from '../controllers/educatorController.js'

const educatorRouter = Router()

// Simple test route (useful to confirm the router is mounted)
educatorRouter.get('/ping', (req, res) => res.json({ ok: true }))

// Route to update role → educator
educatorRouter.post('/update-role', updateRoleToEducator)

export default educatorRouter
