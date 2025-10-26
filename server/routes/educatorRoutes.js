// routes/educatorRoutes.js
import { Router } from 'express'
import { addCourse, getEducatorCourses, updateRoleToEducator } from '../controllers/educatorController.js'
import upload from '../configs/multer.js'
import { protectEducator } from '../middlewares/authMiddleware.js'

const educatorRouter = Router()

// Simple test route (useful to confirm the router is mounted)
educatorRouter.get('/ping', (req, res) => res.json({ ok: true }))

// Route to update role → educator
educatorRouter.post('/update-role', updateRoleToEducator)
educatorRouter.post('/add-course',upload.single('image'), protectEducator,addCourse)
//08:29
educatorRouter.get('/courses',protectEducator,getEducatorCourses)
export default educatorRouter
