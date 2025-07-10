import React from 'react'
import UserOrders from '../features/user/components/UserOrders'
import Navbar from '../features/navbar/Navbar'

const UserOrderpage = () => {
  return (
    <div>
         <Navbar>
          <h1 className='flex items-center justify-center text-cyan-700 font-extrabold'>My Orders</h1>
          <UserOrders></UserOrders>          
          </Navbar> 
    </div>
  )
}

export default UserOrderpage
