import React from 'react'
import { assets } from '../../assets/assets'
import SearchBar from "./SearchBar"



const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full 
      md:pt-36 pt-20 px-5 sm:px-10 lg:px-0 
      space-y-6 sm:space-y-8 text-center 
      bg-gradient-to-b from-cyan-100/70">

      {/* Heading */}
      <h1 className="text-home-heading-small sm:text-[32px] sm:leading-[42px] 
        md:text-home-heading-large 
        relative font-bold text-gray-800 
        max-w-3xl mx-auto">
        empower your future with the courses designed to{" "}
        <span className="text-blue-600">fit your choice.</span>

        {/* Sketch image (only for larger screens) */}
        <img
          className="hidden md:block absolute -bottom-7 right-0 w-20 lg:w-28"
          src={assets.sketch}
          alt="sketch"
        />
      </h1>

      {/* Paragraph for desktop/tablet */}
      <p className="hidden md:block text-gray-500 max-w-2xl mx-auto text-base lg:text-lg">
        We bring together world-class instructors, interactive content,
        and a supportive community to help you achieve your professional goals.
      </p>

      {/* Paragraph for mobile */}
      <p className="md:hidden text-gray-500 max-w-sm mx-auto text-sm sm:text-base">
        We bring together world-class instructors to help you achieve your
        personal and professional goals
      </p>
      
      <SearchBar/>
      

    </div>
  )
}

export default Hero
