import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className='flex md:flex-row flex-col-reverse items-center justify-between text-left w-full px-8 border-t py-4'>
      
      {/* Left Side - Logo */}
      <div className='flex items-center gap-4'>
        <img className='hidden md:block w-20' src={assets.logo} alt="Logo" />
      </div>

      {/* Divider */}
      <div className='hidden md:block w-px h-7 bg-gray-500/60'></div>

      {/* Center - Text */}
      <p className='text-center text-xs md:text-sm text-gray-500'>
        © 2025 Leenas. All Rights Reserved.
      </p>

      {/* Right Side - Social Icons */}
      <div className='flex items-center gap-3 max-md:mt-4'>
        <a href="#">
          <img src={assets.facebook_icon} alt="Facebook" className='w-5 h-5' />
        </a>
        <a href="#">
          <img src={assets.twitter_icon} alt="Twitter" className='w-5 h-5' />
        </a>
        <a href="#">
          <img src={assets.instagram_icon} alt="Instagram" className='w-5 h-5' />
        </a>
      </div>

    </footer>
  )
}

export default Footer
