import { clerkClient } from '@clerk/express'
import Course from '../models/Course'
import {v2 as cloudinary} from 'cloudinary'

// Update role to educator
export const updateRoleToEducator = async (req, res) => {
  try {
    // ✅ New Clerk syntax
    const { userId } = req.auth()

    // ✅ Check if userId exists
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: No user ID found',
      })
    }

    // ✅ Update the public metadata for the user
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: 'educator',
      },
    })

    // ✅ Success response
    res.json({
      success: true,
      message: 'You can publish a course now',
    })
  } catch (error) {
    console.error('Error updating role:', error)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Add New Course
export const addCourse = async (req,res)=> {
  try {
  const { courseData } = req.body
  const imageFile = req.imageFile
  // const educatorId = req.auth.userId
  const { educatorId } = req.auth()

  if(!imageFile){
    return res.json({ success: false, message: 'Thumbnail Not Attached'})
  }

  const parsedCourseData = await JSON.parse(courseData)
  parsedCourseData.educator = educatorId
  const newCourse = await Course.create(parsedCourseData)
  const imageUpload = await cloudinary.uploader.upload(imageFile.path)
  newCourse.courseThumbnail = imageUpload.secure_url
  await newCourse.save()

  res.json({ success: true, message: 'Course Added'})

  } catch (error) {
    res.json({success: false, message: error.message })
  }
  
}
