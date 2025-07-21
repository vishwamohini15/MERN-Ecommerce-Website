import React from 'react'
import Navbar from '../features/navbar/Navbar'
import Userprofile from '../features/user/components/UserProfile'

const UserProfilePage = () => {
  return (
    <div>
         <Navbar>
          <h1 className='flex items-center justify-center text-cyan-700 font-extrabold'>My Profile</h1>
          <Userprofile></Userprofile>
          </Navbar> 
    </div>
  )
}

export default UserProfilePage

