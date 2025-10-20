import React, { useEffect, useRef, useState } from "react";
import unidid from "uniqid";
import Quill from "quill";
import { assets } from "../../assets/assets";

const AddCourse = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);

  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: "",
  });

  useEffect(() => {
    //initiate Quill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <div className="h-screen overflow-scroll flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pb-0">
      <form className="flex flex-col gap-4 max-w-md w-full text-gray-500 ">
        <div className="flex flex-col gap-1">
          <p>Course Title</p>
          <input className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500" required onChange={e => setCourseTitle(e.target.value)} type="text" placeholder="Type here" value={courseTitle}/>
        </div>

        {/* Quill Sectors and import Snow.css in app.js */}
        <div className="flex flex-col gap-1">
          <p>Course Description</p>
          <div ref={editorRef}>

          </div>
        </div>
        {/* Course Price */}
        <div className="flex items-center justify-between flex-wrap ">
          <div className="flex flex-col gap-1">
            <p>Course Price</p>
            <input type="number" placeholder="0"  onChange={(e)=> setCoursePrice(e.target.value)} value={coursePrice} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500 gap-1" required />
          </div>
        

        {/* Course Thumbnail */}
        <div className="flex md:flex-row flex-col items-center gap-3">
          <p>Course Thumbnail</p>
          <label for="thumbnailImage" className="flex items-center gap-3">
            <img src={assets.file_upload_icon} alt="" className='p-3 bg-blue-500 rounded'/>
            <input type="file" name="" id="thumbnailImage" onChange={(e)=> setImage(e.target.files[0])} accept="image/*" hidden />
            <img className="max-h-10" src={image ? URL.createObjectURL(image) : ''} alt=""/>
          </label>
        </div>
      </div>

      

      </form>
    </div>
  );
};

export default AddCourse;
