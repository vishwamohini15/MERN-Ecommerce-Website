import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectLoggedInuser } from '../authSlice'

const ProtectedAdimn = ({children}) => {
    const user=useSelector(selectLoggedInuser)

    if (!user) {
     return <Navigate to='/login' replace={true}></Navigate>
    }
     if (user && user.role !=='admin') {
     return <Navigate to='/' replace={true}></Navigate>
    }
  return children;
}

export default ProtectedAdimn
