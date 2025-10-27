import Course from "../models/Course.js";

// Get all Courses
// Get all Courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .select('-courseContent -enrolledStudents')           // exclude heavy/sensitive fields
      .populate({ path: 'educator', select: 'name imageUrl' }); // pick only what you need

    return res.status(200).json({ success: true, courses });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


// Get Course by Id
export const getCourseId = async (req,res)=>{
    const {id} = req.params

    try {
        const courseData = await Course.findById(id).populate({path: 'educator'})

        // remove lectureUrl if isPreviewFree is false
        courseData.courseContent.forEach(chapter =>{
            chapter.chapterContent.forEach(lecture => {
                if(!lecture.isPreviewFree){
                    lecture.lectureUrl = "";
                }
            }) 
        })

        res.json({ success: true, courseData })
    } catch (error) {
        res.json({success: false, message: error.message})
    }

}