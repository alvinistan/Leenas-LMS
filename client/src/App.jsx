import React from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import Home from './pages/student/Home'
import CoursesList from './pages/student/CoursesList'
import CourseDetails from './pages/student/CourseDetails'
import MyEnrollments from './pages/student/MyEnrollments'
import Educator from './pages/educator/Educator'
import AddCourse from './pages/educator/AddCourse'
import Dashboard from './pages/educator/Dashboard'
import StudentEnrolled from './pages/educator/StudentEnrolled'
import Loading from './components/student/Loading'
import Navbar from './components/student/Navbar'
import CoursePreviewPage from "./pages/student/CoursePreviewPage";
import Player from './pages/student/Player'
import MyCourse from './pages/educator/MyCourse'


const App = () => {
  
  const isEducatorRoute = useMatch('/educator/*');

  return (
    <div className='text-default min-h-screen bg-white'>
     {!isEducatorRoute && <Navbar/>}
      
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/player/:id' element={<Player/>} />
        <Route path='/course-list' element={<CoursesList/>} />
        <Route path='/course-list/:input' element={<CoursesList/>} />
        <Route path='/course/:id' element={<CourseDetails/>} />
        <Route path='/my-enrollments' element={<MyEnrollments/>} />
        <Route path='/loading:path' element={<Loading/>} />
         <Route path="/courses/:id" element={<CourseDetails />} />
  <Route path="/courses/:id/preview/:videoId" element={<CoursePreviewPage />} />
        <Route path='/educator' element={<Educator/>} >
           <Route index element={<Dashboard />} /> {/* default child */}
          {/* <Route path='educator' element={<Dashboard/>} /> */}
          <Route path='add-course' element={<AddCourse/> } />
          <Route path='my-courses' element={<MyCourse/> } />
          <Route path='student-entrolled' element={<StudentEnrolled/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App