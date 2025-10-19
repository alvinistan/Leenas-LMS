import React, { useRef, useState } from 'react'
import unidid from 'uniqid'
import Quill from 'quill'


const AddCourse = () => {

  const quillRef = useRef(null)
  const editorRef = useRef(null)

  const [courseTitle, setCourseTitle] = useState('')
  const [coursePrice, setCoursePrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [image, setImage] = useState(null)
  const [chapters, setChapters] = useState([])
  const [showPopup, setShowPopup] = useState(fasle)
  const [currentChapterId, setCurrentChapterId] = useState(null)

  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPreviewFree: ''
  })

  useEffect(()=> {
    //initiate Quill only once
    if(!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow'
      })
    }

  },[])




  return (
    <div>AddCourse</div>
  )
}

export default AddCourse