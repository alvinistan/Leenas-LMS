import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const SearchBar = ({data}) => {

    const navigate = useNavigate();
    const [input , setInput] = useState(data ? data : '')

    const onSearchHandler = (e) => {
        e.preventDefault();
        navigate('/course-list/'+ input)
        
    }

return (
  <form onSubmit={onSearchHandler} className="max-w-xl w-full flex items-center bg-white border border-gray-300 rounded-lg shadow-sm md:h-14 h-12">
    {/* Search Icon */}
    <img 
      src={assets.search_icon} 
      className="w-5 h-5 md:w-6 md:h-6 mx-3 text-gray-500" 
      alt="Search Icon"
    />

    {/* Input */}
    <input 
      type="text"  onChange={(e) => setInput(e.target.value)} value={input}
      className="w-full h-full outline-none text-gray-600 placeholder-gray-400 px-2 text-sm md:text-base" 
      placeholder="Search for Courses" 
    />

    {/* Button */}
    <button 
      type="submit" 
      className="bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium md:px-8 px-5 md:py-2.5 py-2 mx-2 transition-all duration-200"
    >
      Search
    </button>
  </form>
);

}

export default SearchBar