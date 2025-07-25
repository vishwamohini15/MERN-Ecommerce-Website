import React, { useEffect } from 'react'
import { selectLoggedInuser, signOutAsync } from '../authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const Logout = () => {
     const dispatch=useDispatch()
     const user=useSelector(selectLoggedInuser)
     
     useEffect(()=>{
         dispatch(signOutAsync())
     })
  return (
    <div>
     {!user && <Navigate to='/login' replace={true}></Navigate>}
    </div>
  )
}
