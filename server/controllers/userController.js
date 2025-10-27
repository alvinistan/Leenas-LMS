import User from "../models/user.js"

//Get User Datails

export const getUserData = async (req,res)=> {
    try {
        const {userId} = req.auth()
        const user = await User.findById(userId)

        if(!user){
            res.json({success: false, message: 'user Not Found'})
        }
        req.json({success: true, user})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

// Get User Enrolled Courses with Lecture Links
export const userEnrolledCourses = async (req,res)=> {
try {
    const {userId} = req.auth()
    const userData = await User.findById(userId).populate('enrolledCourses')

    res.json({success: true, enrolledCourses: userData.enrolledCourses})
} catch (error) {
    res.json({success: false, message: error.message})
}
}
